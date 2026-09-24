# PMG rebuild decisions log

Source of truth: `deliverables/PMG-Site-Map-Rev-2.0.pdf`. The September 7 client-review
sitemap (`deliverables/PMG Website Sitemap for Client Review.docx`) is superseded.

## 2026-09-24

- **CMS: keep Sanity.** Sanity holds Pain Education, News, Case Studies, and partner
  hospital data. Every other page is code.
- **Routes follow Rev 2.0 exactly**, with `trailingSlash: true` to match the live
  WordPress URLs. The review build's routes are replaced (see below).
- **Pain Education article count:** preserve every article the crawl finds, with its exact
  slug, whether that is 32 or 35. Phase 1 reports the final count and category split, and
  the client site map is updated to match.
- **News:** `/blog-left-sidebar/` and `/blog/` (plus `/blog/:slug*`) 301 to `/news/`. Any
  other blog-archive or theme-demo URL the crawl finds with traffic or inbound links also
  gets a 301. The rest are listed for retirement.
- **State pages** use the full state name as the slug: `/our-partners/ohio/`.

## Review-build routes to 301 (Phase 2)

The client saw these on the review deployment. Each gets a permanent redirect to its
Rev 2.0 equivalent. Rows marked "confirm" need a decision before Phase 2 ships.

| Review route | Rev 2.0 destination | Note |
| --- | --- | --- |
| `/partnership/operating-model` | `/partnership/how-it-works/` | |
| `/partnership/quality-and-compliance` | `/partnership/balanced-pain-treatment/` | confirm: closest match |
| `/our-partners/stories/:slug` | `/results/case-studies/` | samples only, no real stories yet |
| `/locations`, `/locations/:path*` | `/our-partners/` | |
| `/for-providers` | `/providers/` | |
| `/for-providers/practice-model` | `/providers/why-pmg/` | |
| `/careers`, `/careers/:slug` | `/providers/opportunities/` | |
| `/resources`, `/resources/:slug` | `/news/` | |
| `/about-us/leadership/sample-clinical-leader` | `/about-us/leadership/` | |
| `/accessibility` | none in Rev 2.0 | confirm: keep as an unlisted footer page, or 301 |
| `/review` | `/sitemap/` | internal inventory page, retired |
| `/pain-education/<provisional-slug>` | the real live slug | mapped after the crawl; provisional slugs were derived from titles |
