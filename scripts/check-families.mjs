#!/usr/bin/env node
/**
 * Guards the British / German split in the rendered output.
 *
 * The positioning is only real if no page ever files Range Rover, Land Rover or
 * MINI under a German heading. Two assertions, both structural:
 *
 *  1. BADGE CORRECTNESS — every rendered marque sits beside the right origin
 *     badge. This is position-independent and covers every brand list on the
 *     site, because OriginBadge is rendered from Brand.family.
 *  2. GROUP ORDER — where a page renders both group headings as <h3> (the home
 *     brand grid, the hubs, the service pages), the British 4x4 group leads.
 *
 * Only rendered body markup is examined. <head> and the RSC payload scripts are
 * stripped first, because the page title legitimately reads "Range Rover
 * Specialists & German Car Experts" and would trip any proximity check.
 *
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
    "",
  );
}

/** Which badge each marque must carry. */
const EXPECTED_BADGE = {
  "Range Rover": "BRITISH",
  "Land Rover": "BRITISH",
  "Mercedes-Benz": "GERMAN",
  BMW: "GERMAN",
  Audi: "GERMAN",
  Porsche: "GERMAN",
  Volkswagen: "GERMAN",
  "MINI Cooper": "GERMAN",
};

const MARQUES = Object.keys(EXPECTED_BADGE);

/** Phrases that would genuinely misattribute a British marque. */
const MISATTRIBUTIONS = [
  /(Range Rover|Land Rover|MINI)[^.<]{0,25}\bis a German\b/i,
  /German (car|marque|brand)s?[^.<]{0,60}(such as|including|like)[^.<]{0,40}(Range Rover|Land Rover)/i,
];

const files = walk(DIR);
let errors = 0;
let badgesChecked = 0;
let pagesWithGroupHeadings = 0;

for (const file of files) {
  const rel = relative(DIR, file);
  const html = body(readFileSync(file, "utf8"));

  // ---- 1. Badge correctness -------------------------------------------------
  // Every OriginBadge follows the marque label it belongs to. Walk each badge
  // back to the nearest preceding marque name and check the pairing.
  for (const m of html.matchAll(/>(BRITISH|GERMAN)</g)) {
    const badge = m[1];
    const window = html.slice(Math.max(0, m.index - 700), m.index);

    let nearest = null;
    let nearestAt = -1;
    for (const marque of MARQUES) {
      const at = window.lastIndexOf(`>${marque}<`);
      if (at > nearestAt) {
        nearestAt = at;
        nearest = marque;
      }
    }
    if (!nearest) continue;

    badgesChecked++;
    if (EXPECTED_BADGE[nearest] !== badge) {
      console.error(
        `✗ ${rel}: "${nearest}" is rendered with a ${badge} badge — expected ${EXPECTED_BADGE[nearest]}`,
      );
      errors++;
    }
  }

  // ---- 2. Group order -------------------------------------------------------
  const h3 = (label) =>
    [...html.matchAll(new RegExp(`<h[2-4][^>]*>${label}</h[2-4]>`, "g"))].map(
      (x) => x.index,
    );
  const britishAt = h3("British 4x4 Specialists");
  const germanAt = h3("German Car Experts");

  if (britishAt.length && germanAt.length) {
    pagesWithGroupHeadings++;
    if (Math.min(...britishAt) > Math.min(...germanAt)) {
      console.error(`✗ ${rel}: the German group heading renders before the British 4x4 group`);
      errors++;
    }
  }

  // ---- 3. Misattribution in prose -------------------------------------------
  for (const pattern of MISATTRIBUTIONS) {
    const hit = html.match(pattern);
    if (hit) {
      console.error(`✗ ${rel}: misattribution — "${hit[0].trim().slice(0, 90)}"`);
      errors++;
    }
  }
}

// MINI must carry its origin note on its own page.
const miniFile = files.find((f) => f.endsWith("mini-cooper-repair-sharjah.html"));
if (!miniFile) {
  console.error("✗ MINI Cooper page not found in build output");
  errors++;
} else if (!body(readFileSync(miniFile, "utf8")).includes("BMW Group engineering")) {
  console.error("✗ MINI page is missing its BMW Group origin note");
  errors++;
}

// The Range Rover page must nest under its family hub.
const rrFile = files.find((f) => f.endsWith("range-rover-repair-sharjah.html"));
if (rrFile && !body(readFileSync(rrFile, "utf8")).includes("/range-rover-specialist-sharjah")) {
  console.error("✗ Range Rover page does not link back to its British 4x4 hub");
  errors++;
}

console.log(
  `\nChecked ${files.length} pages — ${badgesChecked} marque/badge pairings, ` +
    `${pagesWithGroupHeadings} pages with both group headings.`,
);

if (errors) {
  console.error(`\n✗ ${errors} family-split violation(s).\n`);
  process.exit(1);
}
console.log("✓ British / German split intact across the build.\n");
