#!/usr/bin/env node
/**
 * Loads every route at mobile and desktop widths in headless Chrome and fails
 * on horizontal overflow, missing/duplicate <h1>, or console errors.
 *
 * Usage: node scripts/check-layout.mjs http://localhost:3000
 */
/**
 * Puppeteer is intentionally NOT a devDependency: its Chrome downloader pulls
 * in extract-zip, which carries an unpatched high-severity advisory. Install it
 * on demand when you want to run this check:
 *
 *   npm i --no-save puppeteer && node scripts/check-layout.mjs http://localhost:3000
 */
let puppeteer;
try {
  puppeteer = (await import("puppeteer")).default;
} catch {
  console.error(
    "\nThis check needs Puppeteer, which is not installed by default.\n" +
      "Run:  npm i --no-save puppeteer\n" +
      "then: node scripts/check-layout.mjs <url>\n",
  );
  process.exit(1);
}

const BASE = process.argv[2] ?? "http://localhost:3000";
// Refuse to run against a server that is not actually up — otherwise every
// route "fails" with connection noise and the report is 100% phantom.
try {
  const res = await fetch(BASE, { redirect: "manual" });
  if (res.status >= 500) throw new Error(`HTTP ${res.status}`);
} catch (err) {
  console.error(`✗ ${BASE} is not reachable (${err.message ?? err}) — start the server first.`);
  process.exit(1);
}


const ROUTES = [
  "/",
  "/range-rover-specialist-sharjah",
  "/range-rover-repair-sharjah",
  "/land-rover-repair-sharjah",
  "/defender-repair-sharjah",
  "/jaguar-repair-sharjah",
  "/services",
  "/services/air-suspension-repair",
  "/services/car-ac-repair",
  "/services/engine-repair",
  "/services/transmission-gearbox-repair",
  "/services/computer-diagnostics",
  "/services/electrical-and-electronics",
  "/services/brakes-and-suspension",
  "/services/oil-change-and-servicing",
  "/services/pre-purchase-inspection",
  "/pickup-and-delivery",
  "/book",
  "/about",
  "/contact",
  "/blog",
  "/blog/range-rover-air-suspension-uae-heat",
  "/blog/car-ac-cold-at-speed-warm-in-traffic",
  "/blog/independent-specialist-vs-dealer-uae",
  "/privacy-policy",
  "/terms",
];

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "desktop", width: 1280, height: 900 },
];

const browser = await puppeteer.launch({ headless: "new" });
let errors = 0;

for (const vp of VIEWPORTS) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height });

  for (const route of ROUTES) {
    const consoleErrors = [];
    const onConsole = (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    };
    page.on("console", onConsole);
    page.on("pageerror", (e) => consoleErrors.push(String(e)));

    // Not networkidle0: the autoplaying workshop clips stream continuously,
    // so the network never goes idle and every navigation would time out.
    const res = await page.goto(BASE + route, {
      waitUntil: "load",
      timeout: 45000,
    });
    await new Promise((r) => setTimeout(r, 400));

    // 304 Not Modified is a valid cached response, not a failure.
    const status = res?.status() ?? 0;
    if (!(res?.ok() || status === 304)) {
      console.error(`✗ [${vp.name}] ${route} → HTTP ${status}`);
      errors++;
    }

    const report = await page.evaluate(() => {
      const de = document.documentElement;
      const offenders = [...document.querySelectorAll("body *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.right > de.clientWidth + 1;
        })
        .slice(0, 4)
        .map((el) => `${el.tagName}.${(el.className + "").trim().split(/\s+/)[0] || "?"}`);

      const h1s = [...document.querySelectorAll("h1")].map((h) => h.innerText.trim());

      // The sticky mobile bar must not sit over the footer's last link.
      const bar = document.querySelector(".fixed.inset-x-0.bottom-0");
      const footerLink = [...document.querySelectorAll("footer a")].pop();
      let covered = false;
      if (bar && footerLink && getComputedStyle(bar).display !== "none") {
        window.scrollTo(0, document.body.scrollHeight);
        const b = bar.getBoundingClientRect();
        const f = footerLink.getBoundingClientRect();
        covered = f.bottom > b.top && f.top < b.bottom;
      }

      return {
        overflow: de.scrollWidth > de.clientWidth,
        scrollWidth: de.scrollWidth,
        clientWidth: de.clientWidth,
        offenders,
        h1s,
        covered,
      };
    });

    if (report.overflow) {
      console.error(
        `✗ [${vp.name}] ${route} scrolls horizontally (${report.scrollWidth} > ${report.clientWidth}) — ${report.offenders.join(", ")}`,
      );
      errors++;
    }
    if (report.h1s.length !== 1) {
      console.error(`✗ [${vp.name}] ${route} has ${report.h1s.length} <h1> elements`);
      errors++;
    }
    if (report.covered) {
      console.error(`✗ [${vp.name}] ${route} sticky action bar covers the footer link`);
      errors++;
    }
    if (consoleErrors.length) {
      console.error(`✗ [${vp.name}] ${route} console error: ${consoleErrors[0].slice(0, 140)}`);
      errors++;
    }

    page.off("console", onConsole);
  }

  await page.close();
  console.log(`  ${vp.name} (${vp.width}px): ${ROUTES.length} routes checked`);
}

await browser.close();

if (errors) {
  console.error(`\n✗ ${errors} layout issue(s).\n`);
  process.exit(1);
}
console.log(`\n✓ ${ROUTES.length} routes clean at 375px and 1280px.\n`);
