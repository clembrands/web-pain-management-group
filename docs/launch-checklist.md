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
- [ ] Every item in `docs/open-questions.md` is closed, including the pain statistic that
      Clembrands verifies against the IOM report.
- [ ] PMG signs off on two answers on `/partnership/questions/`: "How do you keep pain care,
      including opioid prescribing, responsible?" (clinical team) and "What happens if the
      partnership isn't working?" (contract terms).
- [ ] Partner names and cities confirmed (`deliverables/partners-to-confirm.csv`).
- [ ] Permission to show partner hospital logos.

### Photography

- [ ] No "Concept photography" caption remains anywhere on the site. Each concept image is
      either replaced with a real PMG photo or kept without the caption once PMG approves it.
      Check with `grep -r "Concept photography" src/`.

### URLs and indexing

- [ ] No page is still a placeholder. `npm run verify:urls -- <url> --launch` passes: every
      crawled URL answers 200, a single redirect to a 200, or 410, and none lands on a noindex
      page.
- [ ] Production environment: `NEXT_PUBLIC_SITE_URL=https://painmgmtgroup.com` and
      `NEXT_PUBLIC_INDEXABLE=true`. Preview environments keep indexing off.
- [ ] `robots.txt` on production allows the listed crawlers; `sitemap.xml` lists every page.
- [ ] Search Console: re-check the 18 retired demo pages against a clicks export. Any page
      with real clicks moves from 410 to a 301.

### Sanity (owner: Clembrands)

- [ ] Editor token approved; `npm run import:partners` run; partner records checked in Studio.
- [ ] Publishing webhook connected so new case studies and partner edits go live.

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
