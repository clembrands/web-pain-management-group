#!/usr/bin/env node
// Prepares the partner hospital logos PMG supplied (public/assets/partner logos/, 486 x 420
// tiles with padding) for the Home logo band: trims the padding, writes a WebP per logo to
// public/assets/partners/, and writes src/content/partner-logos.json with each logo's alt
// text and a display size that gives wide and square logos the same visual weight.
// Alt text is the organization name as it reads on the logo.
//
//   node scripts/process-partner-logos.mjs

import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const src = "public/assets/partner logos/";
const out = "public/assets/partners/";

const names = {
  "Columbus-Regional-Logosite.jpg": "Columbus Regional Healthcare System",
  "HMHLOGOv2.png": "Harrison Memorial Hospital",
  "HRHmaine.jpg": "Houlton Regional Hospital",
  "MyMichigan_logo3.jpg": "MyMichigan Health",
  "NMMC-logo.jpg": "Northern Maine Medical Center",
  "acrmc_logo.png": "Adams County Regional Medical Center",
  "avita_logo2.png": "Avita Health System",
  "beaconNew.jpg": "Beacon Health System",
  "breck_logo.png": "Breckinridge Health",
  "bvhs_logo.png": "Blanchard Valley Health System",
  "clinton_logo.png": "Clinton Memorial Hospital",
  "crystal_logo.png": "Crystal Clinic Orthopaedic Center",
  "decatur_logo.png": "Decatur County Memorial Hospital",
  "edgerton_logo.png": "Edgerton Hospital and Health Services",
  "edgewood_logo.png": "Edgewood Surgical Hospital",
  "ferrell.png": "Ferrell Hospital",
  "ftmc_logo.png": "Fisher-Titus Medical Center",
  "hancock_new_small.png": "Hancock Health",
  "henry_logo.png": "Henry County Hospital",
  "hmc_web_logo.jpg": "HMC",
  "jointtownship_logo.png": "Grand Lake Health System",
  "knox_logo2.png": "Knox Community Hospital",
  "madison.png": "Madison Health",
  "magruder_logo.png": "Magruder Hospital",
  "marshall_browning.png": "Marshall Browning Hospital",
  "massac_square.png": "Massac Memorial Hospital",
  "meadowview_logo.png": "Meadowview Regional",
  "mem_owosso_logo.png": "Memorial Healthcare",
  "memorial_logo.png": "Memorial Hospital",
  "ohiocounty_logo2.jpg": "Ohio County Pain Care",
  "parkview_square.png": "Parkview",
  "paulding_logo.png": "Paulding County Hospital",
  "pcmh.jpg": "PCMH",
  "putnamcountry_logo.png": "Putnam County Hospital",
  "rhea_logo.png": "Rhea Medical Center",
  "samaritan_logo.png": "University Hospitals Samaritan Medical Center",
  "southeastern_logo.png": "Southeastern Med",
  "twin_lakes_logo.png": "Twin Lakes Regional Medical Center",
  "vanwert_logo2.jpg": "OhioHealth",
  "wayne_logo.png": "Wayne HealthCare",
};

// Equal visual weight: every logo covers about the same area, within a height range.
const area = 6000;
const minH = 28;
const maxH = 64;

mkdirSync(out, { recursive: true });
const logos = [];
for (const file of readdirSync(src).sort()) {
  const name = names[file];
  if (!name) throw new Error(`No name for ${file}; add it to the names map.`);
  const slug = file
    .replace(/\.[a-z]+$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
  // Flatten onto white first so JPEG and PNG tiles trim the same way.
  const trimmed = await sharp(src + file)
    .flatten({ background: "#ffffff" })
    .trim({ background: "#ffffff", threshold: 12 })
    .toBuffer({ resolveWithObject: true });
  const { width, height } = trimmed.info;
  const ratio = width / height;
  const h = Math.round(Math.min(maxH, Math.max(minH, Math.sqrt(area / ratio))));
  const w = Math.round(h * ratio);
  // Twice the display height for sharp rendering on high-density screens.
  await sharp(trimmed.data)
    .resize({ height: Math.min(height, h * 2) })
    .webp({ quality: 88 })
    .toFile(`${out}${slug}.webp`);
  logos.push({
    src: `/assets/partners/${slug}.webp`,
    alt: name,
    width: w,
    height: h,
  });
}
writeFileSync(
  "src/content/partner-logos.json",
  JSON.stringify(logos, null, 2) + "\n",
);
console.log(`${logos.length} logos written to ${out}`);
