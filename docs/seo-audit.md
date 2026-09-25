# SEO and GEO audit (Phase 9)

Run on a production build with indexing on (`NEXT_PUBLIC_INDEXABLE=true`), 70 indexable pages.
Re-run it any time with:

```
NEXT_PUBLIC_INDEXABLE=true NEXT_PUBLIC_SITE_URL=http://localhost:3100 npm run build
NEXT_PUBLIC_INDEXABLE=true NEXT_PUBLIC_SITE_URL=http://localhost:3100 npx next start -p 3100
npm run audit:site -- http://localhost:3100 --validate          # add --launch before go-live
```

It writes `deliverables/seo-audit.csv`: every indexable page with its title, description, H1,
clicks from Home, structured data types, and the schema.org validator result.
`tests/routes.test.ts` also enforces title length, description length, uniqueness, and no em
dashes on every build.

## 1. Structured data

Every page's JSON-LD was sent to the schema.org validator (validator.schema.org).
**Result: 0 errors and 0 warnings on all 70 pages.**

| Type                      | Where                                                      | Pages |
| ------------------------- | ---------------------------------------------------------- | ----- |
| Organization              | Every page (one `@id`, referenced as author and publisher) | 70    |
| BreadcrumbList            | Every page except Home                                     | 69    |
| FAQPage                   | `/partnership/questions/` (13 questions)                   | 1     |
| ItemList of MedicalClinic | The 10 state pages                                         | 10    |
| MedicalWebPage            | The 36 Pain Education articles                             | 36    |
| NewsArticle               | The 4 news posts                                           | 4     |

Checked by hand against Google's rich-result requirements. Required properties are all
present. Remaining notes, each accepted with the reason:

- **FAQPage: Google shows FAQ rich results only for well-known government and health sites.**
  Accept. The markup is valid and still describes the page to Bing and AI answer engines,
  which is what GEO is after. The answers currently include `{{TBD: ...}}` text, which the
  `--launch` audit blocks until PMG confirms the facts.
- **ItemList of MedicalClinic: not a Google carousel type** (carousels cover courses, movies,
  recipes, and restaurants). Accept. It gives each partner's name, city, phone, and website to
  search and AI engines in a structured form, with no guessed addresses.
- **MedicalWebPage: not a Google rich-result type.** Accept. It is valid schema.org, names PMG
  as author and publisher, and keeps the medical reviewer field empty until PMG names one.
- **NewsArticle: `dateModified` absent** (Google recommends it). Accept. WordPress's modified
  dates were not part of the migration and are not invented; `datePublished` is the live
  post date.
- **NewsArticle: three posts have no photo of their own**, so their `image` is the site's
  default share image. Accept; Google recommends an image and this meets it. Replace with a
  real photo if PMG has one.
- **Organization logo:** the site logo (495 by 57) is below Google's 112 by 112 minimum, so
  structured data now uses a 600 by 600 square version (`public/assets/pmg-logo-square.png`).
  A vector logo from PMG would sharpen it and the favicon.

Google's Rich Results Test needs a public URL, so it runs after cutover (`docs/cutover.md`).

## 2. Metadata

All 70 indexable pages pass: title of 60 characters or less, description of 120 to 160,
both unique across the site, exactly one H1, a canonical URL matching the page, Open Graph
and Twitter tags with an image.

What changed in this phase:

- **Default share image** (`public/og-default.png`, 1200 by 630): the PMG logo on white with
  a navy band. Every page uses it until it has its own.
- **Titles:** `<title> | Pain Management Group` when it fits in 60 characters, otherwise
  `<title> | PMG`, otherwise the title alone. Five pages have a set search title: Home, About,
  Contact (to avoid "Pain Management Group" twice) and the two award posts, whose headlines
  run 80 characters. In Sanity, "SEO title" is now the full search title, 60 characters max.
- **Descriptions** rewritten on 14 section pages and the 10 state pages, which were too short. State page descriptions use the
  state's partner count from the directory, so all ten differ. Article and news descriptions
  come from each body's opening text, ending on a full sentence where one fits.
- **Favicon and app icons** from the logo's "P" mark (there was none; every page logged a 404).

## 3. Internal linking

- No orphans: every indexable page is linked from at least one other page.
- Every indexable page is within two clicks of Home (the header menu and footer reach every
  section; section hubs list their pages).
- Every hospital-leader page links to `/partnership/questions/` and `/results/`.

## 4. Lighthouse (mobile)

Lighthouse 13.5, mobile emulation with simulated slow 4G, on the local production build.

| Page                               | Performance | Accessibility | SEO | Best practices |
| ---------------------------------- | ----------- | ------------- | --- | -------------- |
| Home `/`                           | 96          | 100           | 100 | 96             |
| `/partnership/how-it-works/`       | 97          | 100           | 100 | 96             |
| `/our-partners/ohio/`              | 99          | 100           | 100 | 96             |
| `/pain-education/spinal-stenosis/` | 99          | 100           | 100 | 96             |
| `/contact/`                        | 99          | 100           | 100 | 96             |

All targets met (Performance 90+, SEO 100, Accessibility 95+). Fixed along the way: the
missing favicon, and phone and website links on partner cards now meet the 24-pixel touch
target (Ohio accessibility went from 96 to 100).

Not fixable here: Best practices is 96 on every page only because the build environment's
network proxy blocks Google Tag Manager's certificate, which logs a console error. On
production GTM loads normally; its scripts (GA4 twice, Clarity) will cost some Performance
points, so re-run Lighthouse after cutover. ViewMedica videos could not load here for the
same reason.

## 5. Crawl rules

- **Production** (`NEXT_PUBLIC_INDEXABLE=true`, not a preview): `robots.txt` allows every
  named crawler (Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot,
  ClaudeBot, Claude-SearchBot, Google-Extended, Applebot-Extended) and everyone else, keeps
  `/studio/` and `/api/` out, and points to the sitemap. `sitemap.xml` lists the 70 indexable
  pages only: no noindex page (legal, Leadership, Life at PMG, the empty Case Studies index).
- **Previews:** checked with the worst case, a build with `NEXT_PUBLIC_INDEXABLE=true` and
  `VERCEL_ENV=preview`. `robots.txt` is `Disallow: /`, `sitemap.xml` is empty, every page is
  `noindex, nofollow`, and GTM does not load.
