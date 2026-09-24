// Imports the 40 partner hospitals migrated from the live site into Sanity.
//
//   npm run import:partners
//
// Needs NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local. Existing
// documents are never overwritten, so editor changes in Studio are kept. Open questions
// from deliverables/partners-to-confirm.csv are copied into each record's "toConfirm" note.
import { readFileSync } from "node:fs";
import { createClient } from "next-sanity";
import { partnerHospitals } from "../src/content/legacy/partners.ts";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) {
  console.error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN first.",
  );
  process.exit(1);
}
const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-09-01",
  token,
  useCdn: false,
});

// name -> issues, from the confirmation list (last column).
const issues = new Map(
  readFileSync(
    new URL("../deliverables/partners-to-confirm.csv", import.meta.url),
    "utf8",
  )
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => {
      const cells = [...line.matchAll(/("(?:[^"]|"")*"|[^,]*)(?:,|$)/g)].map(
        (m) => m[1].replace(/^"|"$/g, "").replace(/""/g, '"'),
      );
      return [cells[1], cells[5]] as const;
    }),
);

for (const p of partnerHospitals) {
  const id = `partner-${p.legacyUrl?.split("/")[2] ?? p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const doc = {
    _id: id,
    _type: "partner",
    ...p,
    ...(issues.get(p.name) ? { toConfirm: issues.get(p.name) } : {}),
  };
  await client.createIfNotExists(doc);
  console.log(`${id} (created, or already present and left unchanged)`);
}
