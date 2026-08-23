#!/usr/bin/env node
/**
 * Validates the JSON-LD in every prerendered page.
 *
 * Checks that each block parses, that every `@id` reference resolves to an
 * entity the site actually defines, that required LocalBusiness fields are
 * present, and that no marque is attributed to the wrong manufacturer.
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

const LD = /<script type="application\/ld\+json">(.*?)<\/script>/gs;
const files = walk(DIR);

let errors = 0;
let blocks = 0;
const defined = new Set();
const referenced = [];
const byType = new Map();

// Expected manufacturer per marque — a mismatch here means structured data
// disagrees with the site's British / German positioning.
const MANUFACTURER = {
  "Range Rover": "Land Rover",
  "Land Rover": "Land Rover",
  "Mercedes-Benz": "Mercedes-Benz",
  BMW: "BMW",
  Audi: "Audi",
  Porsche: "Porsche",
  Volkswagen: "Volkswagen",
  "MINI Cooper": "BMW",
};

for (const file of files) {
  const html = readFileSync(file, "utf8");
  const rel = relative(DIR, file);

  for (const match of html.matchAll(LD)) {
    blocks++;
    let data;
    try {
      data = JSON.parse(match[1].replace(/\\u003c/g, "<"));
    } catch (err) {
      console.error(`✗ ${rel}: JSON-LD failed to parse — ${err.message}`);
      errors++;
      continue;
    }

    const type = data["@type"];
    byType.set(type, (byType.get(type) ?? 0) + 1);

    if (data["@id"]) defined.add(data["@id"]);

    // Collect nested @id references (provider, publisher, author).
    for (const key of ["provider", "publisher", "author"]) {
      if (data[key]?.["@id"]) referenced.push({ rel, key, id: data[key]["@id"] });
    }

    if (type === "AutoRepair") {
      for (const field of ["name", "address", "telephone", "url", "areaServed"]) {
        if (!data[field]) {
          console.error(`✗ ${rel}: AutoRepair is missing required field "${field}"`);
          errors++;
        }
      }
      if (!data.openingHoursSpecification?.length) {
        console.error(`✗ ${rel}: AutoRepair has no openingHoursSpecification`);
        errors++;
      }
    }

    if (type === "BreadcrumbList") {
      const positions = data.itemListElement.map((i) => i.position);
      const expected = positions.map((_, i) => i + 1);
      if (JSON.stringify(positions) !== JSON.stringify(expected)) {
        console.error(`✗ ${rel}: BreadcrumbList positions are not sequential`);
        errors++;
      }
    }

    if (type === "FAQPage") {
      for (const q of data.mainEntity) {
        if (!q.acceptedAnswer?.text) {
          console.error(`✗ ${rel}: FAQ question "${q.name}" has no answer text`);
          errors++;
        }
      }
    }

    // Marque attribution
    if (type === "Service" && data.brand?.name) {
      const marque = Object.keys(MANUFACTURER).find((m) => data.name?.startsWith(m));
      if (marque && data.brand.name !== MANUFACTURER[marque]) {
        console.error(
          `✗ ${rel}: ${marque} is attributed to "${data.brand.name}" but should be "${MANUFACTURER[marque]}"`,
        );
        errors++;
      }
    }
  }
}

// Every referenced @id must be defined somewhere on the site.
for (const ref of referenced) {
  if (!defined.has(ref.id)) {
    console.error(`✗ ${ref.rel}: ${ref.key} references unresolved @id "${ref.id}"`);
    errors++;
  }
}

console.log(
  `\nScanned ${files.length} pages, ${blocks} JSON-LD blocks:` +
    [...byType.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([t, n]) => `\n  ${t}: ${n}`)
      .join(""),
);
console.log(`  resolved @id references: ${referenced.length} → ${defined.size} entities`);

if (errors) {
  console.error(`\n✗ ${errors} structured-data error(s).\n`);
  process.exit(1);
}
console.log("\n✓ Structured data valid.\n");
