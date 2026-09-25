# Pain Management Group

Rebuild of painmgmtgroup.com around the client-approved **PMG Site Map, Rev 2.0**
(`deliverables/PMG-Site-Map-Rev-2.0.pdf`). The build brief is `deliverables/PMG-Build-Brief.md`
and decisions since then are logged in `docs/decisions.md`.

Next.js (App Router), TypeScript, Tailwind CSS 4, Sanity, deployed on Vercel.

## Build status

| Phase | Scope                                                                         | Status    |
| ----- | ----------------------------------------------------------------------------- | --------- |
| 1     | Live-site inventory (`inventory/`)                                            | Approved  |
| 2     | Foundation: layout, nav, footer, tokens, redirects, analytics, robots/sitemap | Approved  |
| 3     | Home and Partnership Model                                                    | Approved  |
| 4     | Results and Outcomes                                                          | Approved  |
| 5     | Our Partners and 10 state pages                                               | Approved  |
| 6     | For Providers and APPs                                                        | Approved  |
| 7     | Pain Education and 36 articles                                                | Approved  |
| 8     | About, News, Contact, utility pages                                           | Approved  |
| 9     | SEO/GEO pass                                                                  | In review |

Every Rev 2.0 route has content. Pages waiting on PMG material (legal text, leadership,
provider testimonials) have route status `pending`: noindex and left out of `sitemap.xml`.

## Local development

Node 22.13+ (`.nvmrc`).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

The site runs without Sanity credentials.

```sh
npm run lint
npm run typecheck
npm test                     # redirect map and routes checked against inventory/
npm run build
npm run start
npm run audit:site -- http://localhost:3000    # metadata, schema, links, crawl rules (see docs/seo-audit.md)
npm run verify:urls -- http://localhost:3000   # every crawled URL, against a running server
```

## Where things live

| Path                                   | Purpose                                                                                                                |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `src/lib/routes.ts`                    | The Rev 2.0 route tree. Nav, footer, breadcrumbs, `sitemap.xml`, and `/sitemap/` read from it.                         |
| `src/lib/redirects.ts`                 | Every 301 (live WordPress URLs and review-build routes) and every 410                                                  |
| `src/proxy.ts`                         | Serves 410 Gone for retired theme demo pages                                                                           |
| `src/lib/seo.ts`                       | Metadata, canonical URLs, Organization and BreadcrumbList JSON-LD, crawler list                                        |
| `src/lib/site.ts`                      | PMG contact details, job board links, Schedule a Call target                                                           |
| `src/content/legacy/`                  | URL contract from the crawl: 36 article slugs, 10 states, 4 news posts, 40 partner pages                               |
| `src/components/page-shell.tsx`        | Interior page layout: deep navy hero with duotone photo slot, breadcrumbs, one H1, hairline related links, closing CTA |
| `src/components/design/`               | Design-system pieces: Balanced mark, timeline, rule FAQs, logo scroll, compact statement, count-up figures             |
| `src/components/home/narrative.tsx`    | Home as an eight-part narrative for hospital leaders                                                                   |
| `src/content/pages/`                   | Draft copy for code-owned pages. `{{TBD: ...}}` marks unconfirmed facts and fails the launch check.                    |
| `docs/launch-checklist.md`             | Everything that must happen before DNS cutover                                                                         |
| `src/sanity/schemas/content.ts`        | Sanity types: articles, news, case studies, partner hospitals                                                          |
| `inventory/`                           | Phase 1 crawl output. `README.md` there summarizes it.                                                                 |
| `scripts/inventory/`                   | Re-runs the crawl (`npm run inventory:crawl`) and report (`npm run inventory:report`)                                  |
| `scripts/verify-urls.mjs`              | Post-deploy check of every crawled URL                                                                                 |
| `inventory/partners-to-confirm.csv`    | Partner issues as data; the import copies them into Sanity notes                                                       |
| `deliverables/PMG-items-to-confirm.md` | The one list of facts and approvals to send PMG                                                                        |
| `scripts/audit-site.ts`                | SEO/GEO audit of a running build (`npm run audit:site`); see `docs/seo-audit.md`                                       |
| `docs/cutover.md`                      | DNS switch and the two weeks after                                                                                     |
| `docs/sample-figures.md`               | The 18 illustrative numbers on the review site, and what PMG must supply for each                                      |

### URLs

- `trailingSlash: true`, matching WordPress. Links in code always include the slash.
- Redirects are permanent. Next.js answers with 308, which search engines treat like 301.
- Crawled URLs without a trailing slash take one extra hop (slash first, then the redirect),
  as they did on WordPress.
- `npm test` fails if a crawled URL loses its destination, a redirect chains, or an article
  slug drifts from the live site.

### Indexing and analytics

`NEXT_PUBLIC_INDEXABLE` defaults to false. Previews are always noindex, `robots.txt`
disallows everything, and `sitemap.xml` is empty. On the production domain with
`NEXT_PUBLIC_INDEXABLE=true`, `robots.txt` explicitly allows Googlebot, Bingbot, and the AI
retrieval crawlers, and the GTM container loads. See `docs/analytics.md` for the GTM changes
PMG needs before launch.

At launch, run `npm run verify:urls -- https://painmgmtgroup.com --launch`. The `--launch`
flag also fails any crawled URL that lands on a noindex page.

## Sanity

Project **Pain Management Group** (`ac5zxyz7`, organization CLEM) with `production` and a
private `submissions` dataset. Studio is at `/studio/content`, inquiries at
`/studio/submissions`. Content types: `article`, `newsPost`, `caseStudy`, `partner`, plus
the private `inquiry` type. All other page copy lives in code (`src/content/pages/`).

Articles, partners, and news: until `npm run import:content` runs, the site reads the 36
articles, 40 partners, and 4 news posts migrated from the live site (`src/content/legacy/`).
Regenerate the migrated article and news bodies with `node scripts/inventory/articles.mjs`
and `node scripts/inventory/news.mjs` (both need the crawl in `inventory/html/`). The import never
overwrites existing documents. It needs `SANITY_API_WRITE_TOKEN` (an Editor token).

Case studies render from Sanity only; with none published, the index
shows an empty state and stays noindex and out of `sitemap.xml`.

The partner map is static SVG generated from us-atlas by `npm run generate:us-map`.

The Hospital Inquiry Form (`/contact/`) saves each submission to the private `submissions`
dataset and emails a notification through Resend (`RESEND_API_KEY`, `INQUIRY_NOTIFY_TO`,
`INQUIRY_NOTIFY_FROM`). Both live in `src/lib/inquiry-delivery.ts`. The form is offered only
when at least one destination is configured.

Publishing webhook: `https://<host>/api/revalidate/` (note the trailing slash), triggered on
create, update, and delete in `production`, secret `SANITY_REVALIDATE_SECRET`.

## Vercel

Project [web-pain-management-group](https://vercel.com/clembrands/web-pain-management-group)
(team CLEM), region `iad1`. The existing domain has not been connected; DNS is an open question.
