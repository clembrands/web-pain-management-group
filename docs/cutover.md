# Cutover: WordPress to Vercel

How painmgmtgroup.com moves from the WordPress host to Vercel, what to check in the first
hour, and what to watch for two weeks after. The canonical host stays
`https://painmgmtgroup.com` (no `www`), as on WordPress today: `www` and `http://` both
redirect to it with a 301.

Owners: Clembrands runs the steps; PMG (or whoever holds DNS) makes the DNS change.

## 1. The week before

- [ ] Every **Blocker** in `docs/launch-checklist.md` is closed.
- [ ] Production build passes both checks against the Vercel production deployment URL
      (before the domain points at it):
      `     npm run verify:urls -- https://<production-deployment>.vercel.app --launch
    npm run audit:site -- https://<production-deployment>.vercel.app --validate --launch \
      --site=https://painmgmtgroup.com
    `
      `--site` tells the audit the build's canonical URLs already point at the real domain.
      If Vercel Deployment Protection blocks the deployment URL, run both checks in step 3
      instead.
- [ ] **Search Console baseline.** Export, from the painmgmtgroup.com property: Performance
      (last 3 months, by page and by query), Pages (indexed and not indexed), and Links (top
      linked pages). Keep the exports with the project; they are what week two is compared to.
- [ ] **Record the current DNS.** Screenshot or export every record for painmgmtgroup.com,
      especially the current `A`/`CNAME` values for the apex and `www` (the rollback values)
      and every `MX`, `TXT` (SPF, DKIM, DMARC, site verification), and `CNAME` used by email
      or other services. Email must keep working, including careers@painmgmtgroup.com.
- [ ] **Lower the TTL** on the apex and `www` records to 300 seconds, at least 48 hours ahead.
- [ ] **Add the domains in Vercel** (Project, Settings, Domains): `painmgmtgroup.com` as the
      production domain and `www.painmgmtgroup.com` redirecting to it (301). Vercel then shows
      the exact DNS values to set; use those, not values from memory.
- [ ] **Back up WordPress** (files and database) and keep the WordPress host running for at
      least 30 days after cutover, untouched, as the rollback.
- [ ] Pick a low-traffic window (early morning on a weekday) with Clembrands and the DNS
      owner both available for two hours.

## 2. The switch

- [ ] Change only the apex and `www` records to the values Vercel shows. Leave every other
      record (`MX`, `TXT`, and unrelated `CNAME`s) exactly as it is.
- [ ] Wait for Vercel to show both domains as valid and the certificate as issued (usually
      minutes with a 300-second TTL).

## 3. The first hour

Run these as soon as `https://painmgmtgroup.com` serves the new site.

- [ ] Hosts and protocol:
      `     curl -sI https://painmgmtgroup.com/          # 200, from Vercel
    curl -sI https://www.painmgmtgroup.com/      # 301 or 308 to https://painmgmtgroup.com/
    curl -sI http://painmgmtgroup.com/           # redirect to https
    `
- [ ] Every URL from the old site answers correctly:
      `     npm run verify:urls -- https://painmgmtgroup.com --launch
    `
      This checks all 74 crawled WordPress URLs (kept pages 200, moved pages one permanent
      redirect to a 200, retired demo pages 410) and fails on any page that is noindex or
      still shows a TBD placeholder.
- [ ] Metadata, structured data, links, and crawl rules on the live domain:
      `     npm run audit:site -- https://painmgmtgroup.com --validate --launch
    `
- [ ] `https://painmgmtgroup.com/robots.txt` lists the named crawlers with `Allow: /` and
      points to the sitemap. `https://painmgmtgroup.com/sitemap.xml` lists 70 pages (more
      once case studies are published), all on `https://painmgmtgroup.com`.
- [ ] Spot-check in a browser: Home, How the Partnership Works, Ohio, an article with a video
      (Spinal Stenosis) and one with the older video embed (Genicular Nerve Ablation), News,
      Contact. Check that ViewMedica videos play.
- [ ] Submit a test inquiry on `/contact/`; confirm it arrives in Studio
      (`/studio/submissions/`) and by email.
- [ ] GA4 Realtime shows the visit in both properties; Clarity records a session; GTM
      Preview shows the tags firing.
- [ ] Google Rich Results Test passes for Home, `/partnership/questions/`, `/our-partners/ohio/`,
      an article, and a news post.
- [ ] Lighthouse (mobile) on Home, a partnership page, a state page, an article, and Contact.
      Targets: Performance 90+, SEO 100, Accessibility 95+. The pre-launch run could not load
      Google Tag Manager, so the real numbers include its scripts.
- [ ] Email still works: send to and from a painmgmtgroup.com address.

**Rollback:** if a blocker appears that cannot be fixed within the hour (site down, form
broken, mass 404s), put the apex and `www` records back to the recorded WordPress values.
With a 300-second TTL most visitors are back on WordPress within minutes.

## 4. Search Console and Bing, same day

- [ ] Search Console: confirm the `painmgmtgroup.com` property is verified (a Domain property
      verified by DNS `TXT` survives the switch; an HTML-file or meta-tag verification from
      WordPress does not, so re-verify by DNS if needed).
- [ ] Submit `https://painmgmtgroup.com/sitemap.xml` (Indexing, Sitemaps). Remove the old
      WordPress sitemaps (`/wp-sitemap.xml` and any Yoast `sitemap_index.xml`) from the list.
- [ ] URL Inspection, Request indexing: Home, `/partnership/`, `/partnership/questions/`,
      `/results/`, `/our-partners/`, `/providers/`, `/pain-education/`, `/contact/`.
- [ ] Bing Webmaster Tools: import the site from Search Console or verify it, then submit the
      same sitemap.

## 5. The two weeks after

Check daily for the first three days, then every two or three days until day 14. Each check
takes about 15 minutes.

- [ ] **Search Console, Pages:** "Not found (404)", "Server error (5xx)", and "Redirect error"
      counts. Open each new URL listed.
- [ ] **Search Console, Settings, Crawl stats:** responses by type. A rise in 404 or 5xx, or
      a drop in crawl requests, needs a look.
- [ ] **Vercel logs** (Observability, or runtime logs filtered by status 404): which paths
      visitors and bots hit that return 404.
- [ ] **Search Console, Performance:** clicks and impressions for the top pages against the
      baseline export. Some movement is normal in the first weeks; a page that loses most of
      its clicks needs checking (right URL, 200, indexable, same content).
- [ ] **GA4:** traffic level and top landing pages against the same weeks before cutover.

**What to do with a 404:**

- A real old URL (it has clicks, links, or appears in the baseline exports) gets a permanent
  redirect to its closest page: add it to `src/lib/redirects.ts`, add it to the crawl data so
  `npm test` covers it, deploy, and re-run `verify:urls`.
- One of the 18 retired theme demo pages with real clicks moves from 410 to a 301, as agreed
  in Phase 1.
- Junk requests (`/wp-admin/`, `/xmlrpc.php`, random probes) need nothing.
- Any 5xx is a bug: check the Vercel runtime logs and fix it the same day.

## 6. Day 14 sign-off

- [ ] No unexplained 404s or 5xx in Search Console or Vercel logs.
- [ ] Sitemap status "Success" in Search Console, with the submitted pages being indexed.
- [ ] Clicks and impressions for the top pages back near the baseline, or explained.
- [ ] PMG chooses one GA4 property; pause the other tag in GTM (`docs/analytics.md`).
- [ ] Raise the DNS TTL back to its usual value (for example 3600 seconds).
- [ ] Decide when to shut down the WordPress host (not before day 30).
