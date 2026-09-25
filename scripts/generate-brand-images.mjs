#!/usr/bin/env node
// Generates images from PMG's existing logo (public/assets/pmg-logo.png, 495 x 57):
//   public/assets/pmg-logo-square.png  600 x 600, for Organization JSON-LD (Google asks
//                                       for a logo of at least 112 x 112)
//   (public/og-default.png, the social share image, is rendered by generate-og-image.mjs)
//   src/app/favicon.ico, icon.png,     browser and home-screen icons: the logo's "P" mark
//   apple-icon.png                     (its left 64 pixels) on white
// The logo itself is not altered, only placed on a canvas.
//
//   node scripts/generate-brand-images.mjs

import { writeFileSync } from "node:fs";
import sharp from "sharp";

const logo = "public/assets/pmg-logo.png";

const square = await sharp(logo).resize({ width: 520 }).toBuffer();
await sharp({
  create: { width: 600, height: 600, channels: 4, background: "#ffffff" },
})
  .composite([{ input: square, gravity: "center" }])
  .png()
  .toFile("public/assets/pmg-logo-square.png");

// The mark, centered on a white square with a small margin.
const mark = await sharp(logo)
  .extract({ left: 0, top: 0, width: 64, height: 57 })
  .toBuffer();
const icon = async (size) => {
  const inner = Math.round(size * 0.8);
  const scaled = await sharp(mark)
    .resize({
      width: inner,
      height: inner,
      fit: "contain",
      background: "#ffffff",
    })
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: "#ffffff" },
  })
    .composite([{ input: scaled, gravity: "center" }])
    .png()
    .toBuffer();
};
await sharp(await icon(512)).toFile("src/app/icon.png");
await sharp(await icon(180)).toFile("src/app/apple-icon.png");

// favicon.ico: an ICO container holding 16 and 32 pixel PNGs.
const pngs = [await icon(16), await icon(32)];
const header = Buffer.alloc(6 + 16 * pngs.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(pngs.length, 4);
let offset = header.length;
pngs.forEach((png, i) => {
  const size = [16, 32][i];
  const at = 6 + 16 * i;
  header.writeUInt8(size, at);
  header.writeUInt8(size, at + 1);
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(png.length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += png.length;
});
writeFileSync("src/app/favicon.ico", Buffer.concat([header, ...pngs]));

console.log(
  "Wrote the square logo, the default share image, and the site icons",
);
