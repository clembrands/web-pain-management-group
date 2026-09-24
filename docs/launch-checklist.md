# Launch checklist

Everything that must be true before DNS moves from WordPress to Vercel. Items are added as
each build phase finds them. **Blockers** stop the launch; the rest can follow within days.

## Blockers

### Analytics (owner: PMG to grant GTM Publish access)

- [ ] GTM `GTM-KNQXQ7K` has Google tags for both GA4 properties, `G-5JJ8KNE4RS` and
      `G-BY22K2YH53`, on All Pages. The container is empty today. See `docs/analytics.md`.
- [ ] Microsoft Clarity tag added through GTM.
- [ ] Container published and verified in GTM Preview.

### Content and facts (owner: PMG)

- [ ] Every `{{TBD: ...}}` placeholder is replaced with a PMG-confirmed fact or removed.
      `npm run verify:urls -- <url> --launch` fails while any crawled page still shows one.
- [ ] Partnership facts confirmed: years in operation (live site says 2009), number of
      hospital partnerships, care locations, retention, patient encounters, joint-venture
      structure, startup investment, break-even timing, governance, and staffing model.
- [ ] Draft answers on `/partnership/questions/` reviewed and approved by PMG.
- [ ] Partner names and cities confirmed (`deliverables/partners-to-confirm.csv`).
- [ ] Concept photography replaced, or approved for use (home and partnership pages).
- [ ] Permission to show partner hospital logos.

### URLs and indexing

- [ ] No page is still a placeholder. `npm run verify:urls -- <url> --launch` passes: every
      crawled URL answers 200, a single redirect to a 200, or 410, and none lands on a noindex
      page.
- [ ] Production environment: `NEXT_PUBLIC_SITE_URL=https://painmgmtgroup.com` and
      `NEXT_PUBLIC_INDEXABLE=true`. Preview environments keep indexing off.
- [ ] `robots.txt` on production allows the listed crawlers; `sitemap.xml` lists every page.
- [ ] Search Console: re-check the 18 retired demo pages against a clicks export. Any page
      with real clicks moves from 410 to a 301.

### Forms (owner: Clembrands, destination from PMG)

- [ ] Hospital Inquiry Form destination decided and connected (brief §10, question 2).

### Domain (owner: PMG / Clembrands)

- [ ] DNS owner and cutover plan agreed (brief §10, question 5).

## After cutover

- [ ] Run `npm run verify:urls -- https://painmgmtgroup.com --launch` against production.
- [ ] Submit `https://painmgmtgroup.com/sitemap.xml` in Search Console and Bing Webmaster Tools.
- [ ] GA4 Realtime (both properties) and Clarity show traffic; see `docs/analytics.md`.
- [ ] PMG chooses one GA4 property; pause the other tag in GTM.
- [ ] Rich Results Test passes for Home, a partnership page, `/partnership/questions/`, a state
      page, and an article.
