#!/usr/bin/env node
// Requests every URL from the Phase 1 crawl against a deployment and checks the outcome
// the migration plan promises:
//
//   keep    200 at the same address
//   301     one permanent redirect (301 or 308) to the planned page, which returns 200
//   retire  410 Gone
//
// Old URLs without a trailing slash may take one extra hop: Next.js adds the slash first,
// exactly as the live WordPress site did.
//
//   node scripts/verify-urls.mjs http://localhost:3000
//   node scripts/verify-urls.mjs https://<preview>.vercel.app
//   node scripts/verify-urls.mjs https://painmgmtgroup.com --launch
//
// --launch also fails any page that is still noindex (a placeholder, or indexing off), and
// any page still showing a {{TBD: ...}} placeholder. A kept URL that answers 200 but is
// noindex loses its search equity just the same.
//
// Exits non-zero if any URL fails, listing each failure.

import { readFile } from "node:fs/promises";

const args = process.argv.slice(2);
const launch = args.includes("--launch");
const base = new URL(
  args.find((a) => !a.startsWith("--")) ?? "http://localhost:3000",
).origin;
const csv = await readFile(
  new URL("../inventory/urls-plan.csv", import.meta.url),
  "utf8",
);

function parse(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted && c === '"' && text[i + 1] === '"') {
      cell += '"';
      i++;
    } else if (c === '"') {
      quoted = !quoted;
    } else if (!quoted && c === ",") {
      row.push(cell);
      cell = "";
    } else if (!quoted && c === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += c;
    }
  }
  const [header, ...body] = rows;
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i]])));
}

const request = (path) =>
  fetch(`${base}${path}`, {
    redirect: "manual",
    signal: AbortSignal.timeout(30_000),
  }).then(async (res) => {
    const body = await res.text();
    const location = res.headers.get("location");
    const noindex =
      /noindex/i.test(res.headers.get("x-robots-tag") ?? "") ||
      /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(body);
    return {
      status: res.status,
      location: location ? new URL(location, base).pathname : null,
      noindex,
      tbd: body.includes("data-tbd"),
    };
  });

const PERMANENT = new Set([301, 308]);

async function check(row) {
  const path = new URL(row.url).pathname;
  const first = await request(path);
  const hops = [first];
  // Follow up to two permanent redirects so chains are visible in the report.
  while (PERMANENT.has(hops.at(-1).status) && hops.length < 3)
    hops.push(await request(hops.at(-1).location));
  const final = hops.at(-1);
  const trail = hops.map((h) => h.status).join(" > ");
  if (launch && final.status === 200 && final.tbd)
    return `${hops.at(-2)?.location ?? path} still shows a TBD placeholder`;
  if (launch && final.status === 200 && final.noindex)
    return `${hops.at(-2)?.location ?? path} is noindex`;

  if (row.action === "keep")
    return first.status === 200 ? null : `expected 200, got ${trail}`;
  if (row.action === "retire")
    return first.status === 410 ? null : `expected 410, got ${trail}`;
  if (row.action === "301") {
    if (!PERMANENT.has(first.status))
      return `expected a permanent redirect, got ${first.status}`;
    if (first.location !== row.proposed_destination)
      return `redirects to ${first.location}, planned ${row.proposed_destination}`;
    return hops.length === 2 && final.status === 200
      ? null
      : `not a single hop to 200: ${trail}`;
  }
  if (row.action === "handled by trailingSlash") {
    if (first.location !== `${path}/`)
      return `expected the trailing-slash redirect first, got ${trail} to ${first.location}`;
    return final.status === 200 && hops.length <= 3
      ? null
      : `did not reach 200 in two hops: ${trail}`;
  }
  return `unknown action ${row.action}`;
}

await fetch(base, { signal: AbortSignal.timeout(10_000) }).catch(() => {
  console.error(`Cannot reach ${base}. Is the server running?`);
  process.exit(2);
});

const rows = parse(csv);
const failures = [];
const counts = {};
for (const row of rows) {
  const problem = await check(row).catch(
    (err) => `request failed: ${err.message}`,
  );
  counts[row.action] = (counts[row.action] ?? 0) + 1;
  if (problem) failures.push(`${new URL(row.url).pathname}  ${problem}`);
}

console.log(`Checked ${rows.length} crawled URLs against ${base}`);
for (const [action, n] of Object.entries(counts))
  console.log(`  ${action}: ${n}`);
if (failures.length) {
  console.log(`\n${failures.length} failed:\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log("All passed.");
