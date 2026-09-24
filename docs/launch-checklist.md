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

- [ ] `SANITY_API_WRITE_TOKEN` (Editor) set locally and in Vercel Production, server-only.
- [ ] `npm run import:content` run: 40 partners and 4 news posts; records checked in Studio.
- [ ] `submissions` dataset confirmed private (the form refuses to write to a public one).
- [ ] Publishing webhook connected so new case studies, news, and partner edits go live.

### Forms (owner: Clembrands, destination from PMG)

- [ ] Hospital Inquiry Form destination confirmed with PMG (brief §10, question 2). Default:
      saved to the private Sanity dataset, plus an email notification.
- [ ] Resend account and sending domain verified; `RESEND_API_KEY`, `INQUIRY_NOTIFY_TO`, and
      `INQUIRY_NOTIFY_FROM` set in Vercel Production.
- [ ] Test submission received in Studio (`/studio/submissions/`) and by email.
- [ ] Vercel Firewall rate-limit rule on POST requests to `/contact/`. The in-app limit is
      per server instance, so the firewall rule is the hard cap.
- [ ] Newsletter provider chosen and connected in `src/lib/newsletter.ts` (brief §10,
      question 4), or the signup box removed from `/news/`.

### Legal and utility pages (owner: PMG)

- [ ] Privacy Policy, Terms of Service, and Accessibility text supplied and reviewed by PMG.
      Each page shows "Legal text pending PMG review" and is noindex until then.
- [ ] The Privacy Policy covers the inquiry form and newsletter signup.

### Pages waiting on PMG content

- [ ] Leadership Team: names, titles, credentials, headshots, and short bios. Page is noindex
      until then; Person structured data is added with the real profiles.
- [ ] Life at PMG: provider testimonials, quoted with permission. Page is noindex until then.

### Domain (owner: PMG / Clembrands)

- [ ] DNS owner and cutover plan agreed (brief §10, question 5).

## After cutover

- [ ] Run `npm run verify:urls -- https://painmgmtgroup.com --launch` against production.
- [ ] Submit `https://painmgmtgroup.com/sitemap.xml` in Search Console and Bing Webmaster Tools.
- [ ] GA4 Realtime (both properties) and Clarity show traffic; see `docs/analytics.md`.
- [ ] PMG chooses one GA4 property; pause the other tag in GTM.
- [ ] Rich Results Test passes for Home, a partnership page, `/partnership/questions/`, a state
      page, and an article.
