// Partner data must match the live site exactly until PMG confirms changes.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { partnerHospitals } from "../src/content/legacy/partners.ts";
import { legacyPartnerPages } from "../src/content/legacy/partner-urls.ts";
import { partnerStates } from "../src/content/legacy/states.ts";
import { stateShapes } from "../src/content/us-map.ts";
import { redirects } from "../src/lib/redirects.ts";

// inventory/partners.csv columns: state, state_slug, name, city, ...
const live = readFileSync(
  new URL("../inventory/partners.csv", import.meta.url),
  "utf8",
)
  .trim()
  .split("\n")
  .slice(1)
  .map((line) => {
    const cells = [...line.matchAll(/("(?:[^"]|"")*"|[^,]*)(?:,|$)/g)].map(
      (m) => m[1].replace(/^"|"$/g, "").replace(/""/g, '"'),
    );
    return {
      state: cells[1],
      name: cells[2],
      city: cells[3],
      suggested: cells[5],
    };
  });

test("all 40 partners, names exactly as on the live site", () => {
  assert.equal(partnerHospitals.length, 40);
  assert.deepEqual(
    partnerHospitals.map((p) => [p.state, p.name]),
    live.map((p) => [p.state, p.name]),
  );
  assert.ok(
    partnerHospitals.some((p) => p.name === "Perry County Memorial Hosplital"),
  );
});

test("a city appears only where the live site gave one, never a suggestion", () => {
  for (const [i, p] of partnerHospitals.entries()) {
    assert.equal(p.city ?? "", live[i].city, p.name);
    if (live[i].suggested) assert.equal(p.city, undefined, p.name);
  }
  assert.equal(partnerHospitals.filter((p) => p.city).length, 30);
});

test("every partner state has partners, a map shape, and a page", () => {
  for (const s of partnerStates) {
    assert.ok(
      partnerHospitals.some((p) => p.state === s.slug),
      s.slug,
    );
    assert.ok(
      stateShapes.some((shape) => shape.slug === s.slug),
      s.slug,
    );
  }
});

test("each old /em_portfolios/ page redirects to its partner's state page", () => {
  assert.equal(legacyPartnerPages.length, 40);
  for (const p of partnerHospitals) {
    const r = redirects.find((r) => r.source === p.legacyUrl);
    assert.equal(r?.destination, `/our-partners/${p.state}/`, p.name);
  }
});
