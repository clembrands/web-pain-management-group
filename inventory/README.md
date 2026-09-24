# Phase 1 inventory: painmgmtgroup.com

Crawled 2026-09-24 from `robots.txt`, `wp-sitemap.xml` (11 child sitemaps), and every
internal link. Each URL was requested once without following redirects.

```sh
NODE_USE_ENV_PROXY=1 node scripts/inventory/crawl.mjs   # fetch -> raw.json, html/
node scripts/inventory/report.mjs                       # raw.json -> the CSVs below
```

`html/` holds the raw pages and is not committed; the crawl recreates it.

## Totals

142 URLs requested: 137 return 200, 5 return 301, none return 404.
125 are live and indexable, and each has an action in `urls.csv`:

| Action | Indexable URLs | What |
| --- | --- | --- |
| keep | 41 | `/`, `/about-us/`, `/contact/`, `/our-partners/`, `/pain-education/`, and 36 articles |
| 301 | 66 | see `redirects.csv` (68 rows, including 2 existing live redirects) |
| retire | 18 | theme demo pages, see `retire.csv` (30 rows including 12 non-indexable pagination pages) |

`urls-plan.csv` has every URL with a reason for its action.

## Pain Education: 36 articles (7 Conditions, 25 Procedures, 4 Medications)

The count is 36, not 32. `education.csv` has each exact slug.

- The hub links 35 articles under three headings: 7 Conditions, 24 Procedures, 4 Medications.
- One hub link, `/pain-education/genicular-nerve-ablation/`, already 301s to
  `/pain-education/genicular-nerve-ablation-rf-neurotomy/`. The target is the article; the
  existing redirect must be carried into `next.config`.
- `/pain-education/superion-interspinous-spacer-vertiflex/` is live, indexable, and in the
  sitemap, but the hub doesn't link to it. It's filed under Procedures.
- No article shows an author, a medical reviewer, or a published date.
- 33 articles embed a ViewMedica video (account 7704), and 3 have none: post-laminectomy
  syndrome, spondylosis, and genicular nerve ablation. There are no inline images.

## Partners: 40 hospitals in 10 states

The `/our-partners/` filter has exactly 10 states: Illinois 3, Indiana 4, Kentucky 5, Maine 2,
Michigan 3, North Carolina 1, Ohio 18, Pennsylvania 1, Tennessee 2, Wisconsin 1.

The hub grid shows only a logo and an outbound link. Names, addresses, and phones come from
40 indexable `/em_portfolios/<slug>/` pages, matched by logo. `partners.csv` has all fields.

- 30 partners have a full address and phone on the live site.
- 10 have no address anywhere on the site. Their `city` is blank; a guess sits in
  `suggested_city` for PMG to confirm, and is never published. Every open question is in
  `deliverables/partners-to-confirm.csv`.
- Some live names disagree with their slugs (`new-day-...` is Grand Lake,
  `community-hospitals-...` is Parkview) and one title has a typo ("Hosplital"). The
  legacy URL keeps the old slug; the display name needs PMG's approval.
- Each `/em_portfolios/` page 301s to its state page.

## Theme demo pages to retire: 18 indexable

All 18 come from the WordPress theme and have no internal links from real pages. Proposed
action is 410 Gone. The brief estimated about 13; the difference is the 4 stock
`/em_team/` profiles and the 3 `/slider/` records, which are theme post types.

`/blog-left-2column/`, `/blog-right-2column/`, `/blog-right-sidebar/`, `/home-one-page/`,
`/home-video-page-2/`, `/portfolio/`, `/portfolio-3column/`, `/portfolio-full-3column/`,
`/pricing-plan/`, `/sample-page/`, `/type/gallery/`, `/slider/slider/`, `/slider/slider2-2/`,
`/slider/slider3-2/`, `/em_team/cristian-escobar/`, `/em_team/mr-miller/`,
`/em_team/patrick-tomasso/`, `/em_team/stephen-miller/`

Plus 12 non-indexable pagination pages under the two portfolio grids.

No Search Console or analytics data was available, so "has traffic" was judged by internal
links only. Blog archives are linked from every post's sidebar, so they 301 to `/news/`
instead of retiring.

## Testimonials: 3

From `/our-clients/` and `/em_testimonial/`, in `testimonials.csv`:

- Patrick J. Martin, FACHE, Fisher-Titus Medical Center. No job title is shown.
- Bill Watkins, CAO, Blanchard Valley Medical Practices. The quote names Bluffton Hospital.
- William Kose, MD, Chief Quality Officer, BVHS. The legacy slug is `mr-maldonado`.

## News: 4 posts

The posts sit at root-level slugs, not under `/blog/`. Each 301s to `/news/<same-slug>/`.
All 4 are dated and listed in `news.csv`:

- 2017-12-07 PMG Helping In Houston
- 2018-01-16 Thank You For Paying It Forward
- 2019-01-31 Spirit Award from The Partnership for Excellence
- 2022-08-29 The Partnership for Excellence Silver Award 2022

## Jobs tool

`/service/` (nav label "Careers") has no embed and no applicant tracking system. It's a
`<select>` that sends visitors to two external pages:

- "APC": https://www.indeed.com/cmp/Pain-Management-Group-3/jobs
- "Physicians & APCs": https://app.careermd.com/physicians/careerfairs/employersnapshot.aspx?pid=244675225

Internal roles show no listings, only careers@painmgmtgroup.com. `/provider-opportunities/`
and `/internal-team-opportunities/` are lorem ipsum placeholders.

## Other findings

- **Mission Statement link:** the nav item labeled "Mission Statement" points to
  `/about-us/`. There is no dead URL to redirect; `/about-us/mission/` is simply new.
- **Our Approach** in the nav links to `#`.
- **Analytics on the live site:** GTM `GTM-KNQXQ7K` and GA4 `G-5JJ8KNE4RS`. No Clarity and
  no Meta Pixel found.
- **Forms:** none in use. `/contact/` is an email address (contact@painmgmtgroup.com) and a
  link to the clinic directory. Contact Form 7 loads on every page, but only the two demo
  home pages contain a form.
- **Existing redirects to preserve:** `/about/` to `/about-us/`, and the genicular article
  above. Missing trailing slashes already 301 on the live site.
