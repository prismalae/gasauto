#!/usr/bin/env node
/**
 * Verifies the two motion safety properties that matter:
 *
 *  1. REDUCED MOTION — with prefers-reduced-motion: reduce, all content is
 *     fully visible and no reveal transform is applied.
 *  2. NO-JS — with JavaScript disabled, scroll-revealed content is still
 *     visible (the <noscript> fallback in app/layout.tsx).
 *
 * Needs Puppeteer: npm i --no-save puppeteer
 * Usage: node scripts/check-motion.mjs http://localhost:3000
 */
let puppeteer;
try {
  puppeteer = (await import("puppeteer")).default;
} catch {
  console.error("\nNeeds Puppeteer: npm i --no-save puppeteer\n");
  process.exit(1);
}

const BASE = process.argv[2] ?? "http://localhost:3000";
const ROUTES = ["/", "/range-rover-repair-sharjah", "/services/air-suspension-repair", "/pickup-and-delivery"];

const browser = await puppeteer.launch({ headless: "new" });
let errors = 0;

// ---- 1. Reduced motion ------------------------------------------------------
for (const route of ROUTES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(BASE + route, { waitUntil: "load", timeout: 45000 });
  await new Promise((r) => setTimeout(r, 500));

  const bad = await page.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll("[data-reveal]")) {
      const cs = getComputedStyle(el);
      const opacity = parseFloat(cs.opacity);
      const transformed = cs.transform !== "none" && cs.transform !== "matrix(1, 0, 0, 1, 0, 0)";
      if (opacity < 0.99 || transformed) {
        out.push({ cls: (el.className + "").slice(0, 40), opacity, transform: cs.transform });
      }
    }
    // Every decorative animation must be stopped, not merely slowed.
    const decorative =
      ".animate-marquee, .animate-dash, .aurora, .grad-card, .grad-band, .btn-gradient, .chrome-stroke";
    const running = [...document.querySelectorAll(decorative)]
      .filter((el) => getComputedStyle(el).animationName !== "none").length;
    return { out, running, total: document.querySelectorAll("[data-reveal]").length };
  });

  if (bad.out.length) {
    console.error(`✗ [reduced-motion] ${route}: ${bad.out.length}/${bad.total} reveals still hidden or transformed`);
    console.error(`    e.g. ${JSON.stringify(bad.out[0])}`);
    errors++;
  }
  if (bad.running) {
    console.error(`✗ [reduced-motion] ${route}: ${bad.running} decorative animation(s) still running`);
    errors++;
  }
  await page.close();
}
console.log(`  reduced-motion: ${ROUTES.length} routes checked`);

// ---- 2. JavaScript disabled -------------------------------------------------
for (const route of ROUTES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setJavaScriptEnabled(false);
  await page.goto(BASE + route, { waitUntil: "domcontentloaded" });

  const hidden = await page.$$eval("[data-reveal]", (els) =>
    els.filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.99).length,
  );
  const total = await page.$$eval("[data-reveal]", (els) => els.length);

  if (hidden) {
    console.error(`✗ [no-js] ${route}: ${hidden}/${total} revealed sections are invisible without JavaScript`);
    errors++;
  }
  await page.close();
}
console.log(`  no-js: ${ROUTES.length} routes checked`);

await browser.close();

if (errors) {
  console.error(`\n✗ ${errors} motion accessibility issue(s).\n`);
  process.exit(1);
}
console.log("\n✓ Reduced-motion and no-JS fallbacks both correct.\n");
