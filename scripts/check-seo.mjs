#!/usr/bin/env node
/**
 * Guards the SEO map:
 *  1. No two routes may share a primary keyword (cannibalisation).
 *  2. Every generated route must appear in the map.
 *  3. Every mapped route must actually exist.
 */
import { existsSync, readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");

const seo = read("../content/seo-map.ts");
const brands = read("../content/brands.ts");
const services = read("../content/services.ts");

const routes = [...seo.matchAll(/route:\s*"([^"]+)"/g)].map((m) => m[1]);
const primaries = [...seo.matchAll(/primary:\s*"([^"]+)"/g)].map((m) => m[1]);

let failed = false;

// 1. Duplicate primary keywords
const seen = new Map();
primaries.forEach((k, i) => {
  if (seen.has(k)) {
    console.error(
      `✗ Keyword cannibalisation: "${k}" is the primary for both ${routes[seen.get(k)]} and ${routes[i]}`,
    );
    failed = true;
  } else seen.set(k, i);
});

// 2 & 3. Route coverage
const brandSlugs = [...brands.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
const serviceSlugs = [...services.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((m) => m[1]);

const expected = [
  "/",
  "/range-rover-specialist-sharjah",
  "/german-car-repair-sharjah",
  "/services",
  "/pickup-and-delivery",
  "/book",
  "/about",
  "/contact",
  "/blog",
  ...brandSlugs.map((s) => `/${s}`),
  ...serviceSlugs.map((s) => `/services/${s}`),
];

for (const r of expected) {
  if (!routes.includes(r)) {
    console.error(`✗ Route ${r} has no entry in content/seo-map.ts`);
    failed = true;
  }
}
for (const r of routes) {
  if (!expected.includes(r)) {
    console.error(`✗ seo-map.ts lists ${r}, which is not a real route`);
    failed = true;
  }
}

// ---------------------------------------------------------------------------
// 4. Keyword presence in the BUILT pages.
//
// A keyword map is only worth having if the pages actually use the phrases.
// For every route, the primary keyword's meaningful tokens must appear in
// order — with small gaps allowed — somewhere in the page's title + visible
// text, so "car repair sharjah" is satisfied by natural copy like
// "car repair garage in Sharjah". Titles are also audited for length.
// ---------------------------------------------------------------------------
const DIST = process.env.NEXT_DIST_DIR || ".next-prod";
const appDir = new URL(`../${DIST}/server/app/`, import.meta.url);

const STOPWORDS = new Set(["a", "an", "and", "the", "in", "for", "of", "to", "on", "with", "&"]);

function routeToFile(route) {
  return route === "/" ? "index.html" : `${route.slice(1)}.html`;
}

function pageText(html) {
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1] ?? "";
  const bodyAt = html.indexOf("<body");
  const body = (bodyAt === -1 ? "" : html.slice(bodyAt))
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
  return { title, text: `${title} ${body}`.replace(/&amp;/g, "&").replace(/\s+/g, " ") };
}

const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

if (!existsSync(appDir)) {
  console.log(`\n(keyword-presence check skipped — no build output in ${DIST}/; run \`npm run build\` first)`);
} else {
  let phraseFails = 0;
  const longTitles = [];

  for (const entry of seoMapEntries()) {
    const file = new URL(routeToFile(entry.route), appDir);
    if (!existsSync(file)) {
      console.error(`✗ ${entry.route}: built page not found (${routeToFile(entry.route)})`);
      failed = true;
      continue;
    }
    const { title, text } = pageText(readFileSync(file, "utf8"));

    const tokens = entry.primary.split(/\s+/).filter((t) => !STOPWORDS.has(t));
    const pattern = new RegExp(tokens.map(esc).join("[\\s\\S]{0,60}?"), "i");
    if (!pattern.test(text)) {
      console.error(`✗ ${entry.route}: primary keyword "${entry.primary}" not found in page copy`);
      phraseFails++;
      failed = true;
    }

    if (title.length > 70) longTitles.push(`${entry.route} (${title.length} chars)`);
  }

  if (longTitles.length) {
    console.error(`✗ titles over 70 chars: ${longTitles.join(", ")}`);
    failed = true;
  }
  if (!phraseFails && !longTitles.length) {
    console.log(`✓ Every primary keyword appears naturally in its page; all titles ≤70 chars.`);
  }
}

function seoMapEntries() {
  return routes.map((route, i) => ({ route, primary: primaries[i] }));
}

if (failed) {
  console.error("\nSEO check failed.\n");
  process.exit(1);
}

console.log(
  `✓ SEO map OK — ${routes.length} routes, ${new Set(primaries).size} unique primary keywords, no cannibalisation.`,
);
