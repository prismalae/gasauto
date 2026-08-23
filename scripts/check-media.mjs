#!/usr/bin/env node
/**
 * Every image and clip referenced from content/media.ts must exist on disk, and
 * the recorded width/height must match the actual file — next/image uses those
 * numbers to reserve space, so a stale value causes layout shift.
 *
 * Also guards the page weight: media under public/ is shipped on every deploy.
 */
import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Reads intrinsic JPEG dimensions by walking the marker segments to the
 * frame header. Avoids pulling in an image dependency just for this.
 */
function jpegSize(file) {
  const b = readFileSync(file);
  if (b[0] !== 0xff || b[1] !== 0xd8) return null;
  let i = 2;
  while (i < b.length - 9) {
    if (b[i] !== 0xff) { i++; continue; }
    const marker = b[i + 1];
    // SOF0-SOF3, SOF5-SOF7, SOF9-SOF11, SOF13-SOF15 carry the frame header.
    const isSOF =
      marker >= 0xc0 && marker <= 0xcf &&
      marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isSOF) return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}

const ROOT = process.cwd();
const src = readFileSync(join(ROOT, "content/media.ts"), "utf8");

let errors = 0;
let checked = 0;

// Images: src + width + height recorded together.
const imgRe = /src:\s*"(\/media\/[^"]+\.jpg)",\s*\n\s*alt:\s*"[^"]*",\s*\n\s*width:\s*(\d+),\s*\n\s*height:\s*(\d+)/g;
for (const [, rel, w, h] of src.matchAll(imgRe)) {
  checked++;
  const file = join(ROOT, "public", rel);
  if (!existsSync(file)) {
    console.error(`✗ missing image: ${rel}`);
    errors++;
    continue;
  }
  // Recorded dimensions must match the file — next/image reserves space from
  // them, so a stale value shows up as layout shift.
  const real = jpegSize(file);
  if (!real) {
    console.error(`✗ could not read dimensions: ${rel}`);
    errors++;
  } else if (real.width !== Number(w) || real.height !== Number(h)) {
    console.error(
      `✗ ${rel}: content/media.ts says ${w}x${h} but the file is ${real.width}x${real.height}`,
    );
    errors++;
  }
}

// Clips: video plus its poster frame.
const clipRe = /src:\s*"(\/media\/[^"]+\.mp4)",\s*\n\s*poster:\s*"(\/media\/[^"]+\.jpg)"/g;
for (const [, video, poster] of src.matchAll(clipRe)) {
  checked += 2;
  for (const rel of [video, poster]) {
    if (!existsSync(join(ROOT, "public", rel))) {
      console.error(`✗ missing clip asset: ${rel}`);
      errors++;
    }
  }
}

// Weight budget.
const dir = join(ROOT, "public", "media");
let bytes = 0;
const heavy = [];
for (const f of readdirSync(dir)) {
  const size = statSync(join(dir, f)).size;
  bytes += size;
  if (size > 2 * 1024 * 1024) heavy.push(`${f} (${(size / 1024 / 1024).toFixed(1)}MB)`);
}
const mb = bytes / 1024 / 1024;

// Nothing raw should sit under public/ — originals belong in media-source/.
if (existsSync(join(ROOT, "public", "assets"))) {
  console.error("✗ public/assets exists — raw originals ship on deploy; move them to media-source/");
  errors++;
}

console.log(`\nChecked ${checked} referenced files — public/media is ${mb.toFixed(1)}MB.`);
if (heavy.length) console.log(`  large files: ${heavy.join(", ")}`);

if (mb > 12) {
  console.error(`✗ public/media is ${mb.toFixed(1)}MB — over the 12MB budget.`);
  errors++;
}

if (errors) {
  console.error(`\n✗ ${errors} media issue(s).\n`);
  process.exit(1);
}
console.log("✓ All referenced media present and within budget.\n");
