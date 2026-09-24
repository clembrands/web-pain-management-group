// Writes public/partner-map-dark.svg: the partner map on a navy background, with no links,
// for decorative use as an image (a hero background) so pages do not inline the map twice.
// The interactive map with state links is src/components/partner-map.tsx.
//
//   node --experimental-strip-types scripts/generate-map-svg.ts

import { writeFileSync } from "node:fs";
import { stateShapes, usMapViewBox } from "../src/content/us-map.ts";
import { partnerStates } from "../src/content/legacy/states.ts";

const partner = new Set<string>(partnerStates.map((s) => s.slug));
const paths = stateShapes
  .map(
    (s) =>
      `<path d="${s.d}" fill="${partner.has(s.slug) ? "#7fb2d6" : "#243c52"}" stroke="#16293a" stroke-width="1.2"/>`,
  )
  .join("");
writeFileSync(
  new URL("../public/partner-map-dark.svg", import.meta.url),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${usMapViewBox}" role="img" aria-label="Map of the United States with PMG partner states highlighted">${paths}</svg>\n`,
);
console.log("Wrote public/partner-map-dark.svg");
