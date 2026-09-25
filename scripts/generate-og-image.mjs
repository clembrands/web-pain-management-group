#!/usr/bin/env node
// Renders the default social share image (public/og-default.png, 1200 x 630) with the
// site's own fonts: PMG's logo in white on deep navy, the Home headline, and the Balanced
// mark as an outline. Needs a running build for the fonts and logo, and playwright-core
// (npm i --no-save playwright-core).
//
//   node scripts/generate-og-image.mjs http://localhost:3100

import { chromium } from "playwright-core";

const base = process.argv[2] ?? "http://localhost:3100";
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ??
    "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(base + "/", { waitUntil: "networkidle" });
await page.evaluate(async () => {
  const square = (x, y) =>
    `<rect x="${x}" y="${y}" width="44" height="44" fill="none" stroke="currentColor" stroke-width="0.35"/>`;
  document.body.innerHTML = `
  <div id="og" style="position:fixed;inset:0;width:1200px;height:630px;background:#0f1e2c;color:#fff;overflow:hidden;font-family:var(--font-poppins)">
    <svg viewBox="-1 -1 114 90" style="position:absolute;right:-40px;top:40px;width:560px;color:#7fb2d6;opacity:.28">${square(0, 0) + square(34, 22) + square(68, 44)}</svg>
    <img src="/assets/pmg-logo.png" alt="" style="position:absolute;left:80px;top:72px;width:420px;filter:brightness(0) invert(1)">
    <h1 style="position:absolute;left:80px;top:210px;width:900px;margin:0;font-family:var(--font-poppins-light);font-weight:300;font-size:74px;line-height:1.05;letter-spacing:-0.015em">You run the hospital.<br><span style="color:#7fb2d6">We make pain management work.</span></h1>
    <div style="position:absolute;left:80px;right:80px;bottom:60px;border-top:1px solid rgba(255,255,255,.2);padding-top:22px;display:flex;justify-content:space-between;font-size:17px;letter-spacing:.18em;text-transform:uppercase;color:#c4d3df">
      <span>Hospital-based pain management partnerships</span><span>painmgmtgroup.com</span>
    </div>
  </div>`;
  await document.fonts.ready;
  await Promise.all([...document.images].map((i) => i.decode()));
});
await page.locator("#og").screenshot({ path: "public/og-default.png" });
await browser.close();
console.log("wrote public/og-default.png");
