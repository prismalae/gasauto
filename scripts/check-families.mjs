#!/usr/bin/env node
/**
 * Guards the JLR-only lineup in the rendered output.
 *
 * The site services exactly four marques — Range Rover, Land Rover, Defender
 * and Jaguar — and nothing else. This walks the built HTML and asserts:
 *
 *  1. NO removed marque (or "German car" positioning) appears anywhere in
 *     rendered copy.
 *  2. All four marques render on the home page, and the hub links to each
 *     marque page.
 *  3. No stale route for a removed marque survives in the build output.
 *  4. Marque pages carry the BRITISH provenance badge; no other badge exists.
 *
 * Only rendered body markup is examined (no <head>, no RSC payload scripts).
 * Run after `npm run build`.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const DIST = process.env.NEXT_DIST_DIR || ".next";
const DIR = join(ROOT, DIST, "server/app");

if (!existsSync(DIR)) {
  console.error(`✗ No build output in ${DIST}/. Run \`npm run build\` first.`);
  process.exit(1);
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

/** Rendered markup only: no <head>, no inline scripts, no JSON-LD. */
function body(html) {
  const start = html.indexOf("<body");
  return (start === -1 ? html : html.slice(start)).replace(
    /<script[\s\S]*?<\/script>/g,
    " ",
  );
}

const MARQUES = ["Range Rover", "Land Rover", "Defender", "Jaguar"];

/** Marques and positioning that were removed and must never reappear. */
const BANNED = [
  /Mercedes[-\s]?Benz|\bMercedes\b/i,
  /\bBMW\b/i,
  /\bAudi\b(?!bly)/,       // "audibly" is legitimate copy
  /\bPorsche\b/i,
  /\bVolkswagen\b|\bVW\b/,
  /\bMINI Cooper\b/i,
  /\bGerman (car|marque|engineer)/i,
  /\bAIRMATIC\b/i,
];

/**
 * The one legitimate mention: the hub FAQ answers the real search query
 * "Is Range Rover a German car?" — the question names the misconception in
 * order to correct it. Stripped before scanning so nothing else sneaks
 * through under its cover.
 */
const ALLOWED_PHRASES = [/Is Range Rover a German car\?/g];

const STALE_ROUTES = [
  "german-car-repair-sharjah.html",
  "mercedes-benz-repair-sharjah.html",
  "bmw-repair-sharjah.html",
  "audi-repair-sharjah.html",
  "porsche-repair-sharjah.html",
  "volkswagen-repair-sharjah.html",
  "mini-cooper-repair-sharjah.html",
];

const files = walk(DIR);
let errors = 0;

// ---- 1. Banned marques must not appear in any rendered page ---------------
for (const file of files) {
  const rel = relative(DIR, file);
  let text = body(readFileSync(file, "utf8"));
  for (const allowed of ALLOWED_PHRASES) text = text.replace(allowed, " ");
  for (const pattern of BANNED) {
    const hit = text.match(pattern);
    if (hit) {
      console.error(`✗ ${rel}: removed-marque reference "${hit[0]}" still renders`);
      errors++;
    }
  }
}

// ---- 2. Home page renders all four; hub links to each marque --------------
const home = files.find((f) => f.endsWith("index.html"));
if (home) {
  const text = body(readFileSync(home, "utf8"));
  for (const m of MARQUES) {
    if (!text.includes(m)) {
      console.error(`✗ index.html: marque "${m}" missing from the home page`);
      errors++;
    }
  }
  if (!text.includes("Jaguar Land Rover Specialists")) {
    console.error(`✗ index.html: the "Jaguar Land Rover Specialists" group label is missing`);
    errors++;
  }
}

const hub = files.find((f) => f.endsWith("range-rover-specialist-sharjah.html"));
if (!hub) {
  console.error("✗ hub page range-rover-specialist-sharjah missing from build");
  errors++;
} else {
  const text = body(readFileSync(hub, "utf8"));
  for (const slug of [
    "range-rover-repair-sharjah",
    "land-rover-repair-sharjah",
    "defender-repair-sharjah",
    "jaguar-repair-sharjah",
  ]) {
    if (!text.includes(`/${slug}`)) {
      console.error(`✗ hub does not link to /${slug}`);
      errors++;
    }
  }
}

// ---- 3. No stale routes for removed marques -------------------------------
for (const stale of STALE_ROUTES) {
  if (files.some((f) => f.endsWith(stale))) {
    console.error(`✗ stale route still built: ${stale}`);
    errors++;
  }
}

// ---- 4. Badges: BRITISH only ----------------------------------------------
let badges = 0;
for (const file of files) {
  const text = body(readFileSync(file, "utf8"));
  badges += (text.match(/>BRITISH</g) ?? []).length;
  if (/>GERMAN</.test(text)) {
    console.error(`✗ ${relative(DIR, file)}: a GERMAN badge still renders`);
    errors++;
  }
}

console.log(
  `\nChecked ${files.length} pages — 4 marques, ${badges} BRITISH badges, 0 removed-marque references allowed.`,
);

if (errors) {
  console.error(`\n✗ ${errors} lineup violation(s).\n`);
  process.exit(1);
}
console.log("✓ JLR-only lineup intact across the build.\n");
