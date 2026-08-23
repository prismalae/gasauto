#!/usr/bin/env node
/**
 * Fails if any TODO_CLIENT placeholder is still in place.
 *
 * Run before deploying. Fabricated contact details inside LocalBusiness
 * structured data mislead real customers and get a Google Business listing
 * flagged, so this is a hard gate rather than a warning.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const DIRS = ["config", "content", "app", "components", "lib"];
const EXT = /\.(ts|tsx)$/;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXT.test(entry)) out.push(full);
  }
  return out;
}

const hits = [];
for (const dir of DIRS) {
  let files = [];
  try {
    files = walk(join(ROOT, dir));
  } catch {
    continue;
  }
  for (const file of files) {
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      const trimmed = line.trim();
      // Skip prose inside block comments that merely explain the convention.
      const isDocLine = trimmed.startsWith("*") || trimmed.startsWith("/*");
      if (!isDocLine && line.includes("TODO_CLIENT")) {
        hits.push({ file: relative(ROOT, file), line: i + 1, text: line.trim() });
      }
    });
  }
}

if (hits.length === 0) {
  console.log("✓ No TODO_CLIENT placeholders remain — site is ready to deploy.");
  process.exit(0);
}

console.error(`\n✗ ${hits.length} placeholder value(s) still need real client data:\n`);
for (const h of hits) {
  console.error(`  ${h.file}:${h.line}`);
  console.error(`    ${h.text.slice(0, 120)}`);
}
console.error(
  "\nReplace these in config/site.ts (and anywhere else listed) before deploying.",
);
console.error("Publishing fake contact details in LocalBusiness schema misleads customers.\n");
process.exit(1);
