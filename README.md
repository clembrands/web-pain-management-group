# Pain Management Group

Next.js site scaffold based on approved homepage direction **1H — Dark Synthesis**.
Original HTML concepts and source assets remain in the repository as design references.

## Local development

Use Node 22.13+ (Node 22 LTS is pinned in `.nvmrc`).

```sh
npm ci
cp .env.example .env.local
npm run dev
```

The site runs at http://localhost:3000 without CMS credentials, using `src/content/site.json`.
Configured Sanity projects serve published content with a 60-second cache. Missing singleton
fields fall back to local concept content; CMS connection errors surface rather than being hidden.
An intentionally empty CMS collection stays empty. The seed command populates initial content.

```sh
npm run lint
npm run typecheck
npm run build
npm run start
```

## Structure

| Path                    | Purpose                                                                       |
| ----------------------- | ----------------------------------------------------------------------------- |
| `src/app/(site)`        | Homepage, interior routes, shared header and footer                           |
| `src/components/home`   | React sections translated from 1H                                             |
| `src/app/globals.css`   | Tailwind 4 and 1H design tokens                                               |
| `src/content/site.json` | Initial concept copy and non-destructive CMS seed source                      |
| `src/sanity/schemas`    | Homepage, site settings, pages, partners, locations, opportunities, inquiries |
| `src/sanity/lib`        | Server-only content reads and private inquiry writes                          |
| `/studio/content`       | Full-screen Sanity content editor                                             |
| `/studio/submissions`   | Authenticated inquiry workspace                                               |
| `/api/revalidate`       | Signed Sanity publishing webhook                                              |

Public routes: `/`, `/partnership`, `/our-partners`, `/locations`, `/for-providers`, `/contact`.
The directory supports searching and filtering published locations. Provider opportunities
render from Sanity. Empty collections do not fabricate clinic addresses or open positions.

## Connect Sanity

Project created September 7, 2026: **Pain Management Group**, ID `ac5zxyz7`,
organization **CLEM**. [Manage project](https://www.sanity.io/manage/project/ac5zxyz7).
The `production` and `submissions` datasets are created, localhost:3000 is allowed
for Studio, and the ignored `.env.local` points to this project. Content seeding
and an Editor API token are pending approval; no content has been uploaded yet.

1. Create or select a **PMG-specific** Sanity project. Do not reuse another client's dataset.
2. Create a public `production` dataset and a **private** `submissions` dataset.
3. Set the project ID, dataset names, and server-only Editor token in `.env.local`.
   Dataset names are identifiers, not secrets; the public submissions dataset name is used by Studio.
4. Add localhost and the Vercel project origin to Sanity CORS origins with credentials allowed for Studio.
5. Run `npm run seed:sanity`. It uploads the concept assets and creates initial published documents.
   It skips existing documents and never replaces editor changes. Review concept statistics and copy
   before launch; the seed is a starting point, not factual approval.
6. Open `/studio/content`. Add real contact details, booking URL, video URL, location records,
   and provider opportunities as available. `/studio` remains a setup screen without a project ID.

Inquiries validate on the server and write only to the private dataset. The server verifies
dataset privacy before enabling the form and again before saving. With missing credentials,
an inaccessible dataset, or a public dataset, the form is unavailable. A success message is only
returned after a successful write. Email notifications are not connected yet; inquiries appear in Studio.
Do not use this form to collect medical information. Add spam protection/rate limiting and the
approved privacy notice before enabling public submissions at launch.

### Publishing webhook

In Sanity Manage → API → Webhooks:

- URL: `https://<pmg-host>/api/revalidate`
- Trigger: create, update, delete; dataset: `production`
- Filter: `_type in ["siteSettings", "homePage", "page", "partner", "location", "opportunity"]`
- Projection: `{_type, _id}`
- Secret: same value as `SANITY_REVALIDATE_SECRET`

The endpoint verifies Sanity's signed request and expires the shared content cache.
Requests are rejected when the secret is missing or the signature is invalid.

## Vercel

Reference patterns: `web-smiles-nw` (App Router, Tailwind, embedded Studio, isolated inquiries,
indexing controls), `web-autometric` (content seeding), and `web-edgewood-surgical` (explicit build root).

Created September 7, 2026: [web-pain-management-group](https://vercel.com/clembrands/web-pain-management-group)
under **CLEM**, project ID `prj_Bg1dNtqtgyCw0pkO01Ke243TKxyY`. The local repository is linked
through ignored `.vercel/project.json`. Verified settings: **Next.js** preset, repository root,
Node 22, `npm ci`, and `npm run build`. `vercel.json` selects `iad1`
for US East server execution. No static export is used because the site includes Server Actions and Studio.

Add the variables from `.env.example` to the appropriate Vercel environments. Keep write tokens
and webhook secrets server-only. Use a separate staging dataset if preview content must be isolated.
Vercel Analytics is mounted on production deployments only.

`NEXT_PUBLIC_INDEXABLE` defaults to false. Preview deployments remain noindex even if it is set
to true. Before launch, set the canonical `NEXT_PUBLIC_SITE_URL` to the final HTTPS domain,
approve content, and enable indexing only in Production. Robots and the sitemap follow this switch.
The Vercel project exists, but GitHub auto-deploy integration, environment variables, and the
first deployment are not configured yet. No DNS changes have been made.

## Still needed for launch

- Sanity Editor token, initial content seed, deployment CORS origin, and webhook connection.
- Final interior copy, verified statistics/partner permissions, approved imagery/map, and video source.
- Contact details and scheduling destination; clinic data and actual job listings.
- Inquiry notification delivery, anti-spam controls, and approved privacy/legal pages.
- Current-site URL inventory and redirect mapping before any domain cutover.
- CMS-connected testing, final accessibility review, metadata/social image review, and production deployment.

## Improvements over the references

- Homepage and primary page content can be edited in Sanity, not only blog posts.
- Seed imports preserve existing editor changes and upload local reference images.
- Signed publishing webhooks expire cached content immediately.
- Preview indexing protection is independent of the production indexing flag.
- Private dataset checks prevent accidental public inquiry storage.
- Studio is isolated from site navigation and loaded only on its own route.

Targeted npm overrides patch the Sanity CLI's transitive `adm-zip`, `js-yaml`,
and `uuid` dependencies. Recheck these when upgrading Sanity and remove them once
upstream dependencies include the fixes.

## Scaffold verification

- Production build, strict TypeScript, ESLint, and inquiry validation tests pass.
- All six site pages and Studio setup routes return 200; an unknown route returns 404.
- Desktop/mobile browser checks cover rendering, menu navigation, FAQ expansion,
  and the contact setup state. The location page has no horizontal overflow at mobile width.
- Unconfigured publishing webhooks return 503; staging robots disallow indexing.
- npm audit reports zero known vulnerabilities with the pinned lockfile.
- PMG project `ac5zxyz7` and its datasets are created and locally connected.
  Live CMS publishing, seeding, and successful inquiry storage remain unverified;
  the Editor credential and initial seed are pending approval.

Official implementation references: [Next.js](https://nextjs.org/docs/app/getting-started/installation),
[Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs),
and [next-sanity](https://github.com/sanity-io/next-sanity).

## Client review build

`NEXT_PUBLIC_CONTENT_MODE=review` is the default. This mode uses local draft content,
shows a persistent review label, forces noindex, and disables real inquiry submission
on both the page and the Server Action. The contact page has a browser-only demo with
validation and a clearly labeled confirmation. Nothing entered there is sent or stored.

Open `/review` for the complete page inventory. The build includes the 17 core pages,
35 education layouts, three sample clinic pages, three sample job pages, three draft
resources, one illustrative partner story, and one leadership profile. Every fictional
record is marked as an example. Clinical descriptions and video embeds await approved
source material; these are layouts, not finished patient education. Education slugs
are provisional until the complete legacy URL mapping is reconciled.

The `editorialPage` Sanity schema supports nested paths, sections, related pages, source
notes, reviewer information, and publication approval. In `published` content mode,
these pages require an approved, non-sample CMS record; local placeholders are not
used as a fallback. Review collection cards currently demonstrate local records and
must be connected to approved CMS collections before production launch.

The review site is ready for layout and content-direction feedback. It is not ready
for patient use or production indexing. The Sanity token/seed remain pending approval;
this build does not create credentials or write review content to the CMS.

### Hosted client review

- Demo: https://web-pain-management-group.vercel.app/
- Page inventory: https://web-pain-management-group.vercel.app/review
- Deployment: `dpl_k2JjdfHtvUyTAzx9774JYHX1KEny` (READY, 2026-09-07).
- Vercel assigned the first deployment to its production target. This is still a
  noindex review site on the new vercel.app hostname; the existing PMG domain has
  not been connected or changed.
- Verification: production build, TypeScript, ESLint, five tests, all 64 review
  routes and internal links, unknown-route 404, desktop/mobile browser checks,
  education search/filter, demo confirmation, and hosted image delivery passed.

Visual review update: photo heroes and captioned image cards now span the editorial
pages, with supporting photography on business pages and explicit portrait/clinic
image placeholders. See docs/photography-direction.md for the final image brief.
Latest demo deployment: dpl_2nAKCzHcafQcrYyy3bjdeiUMqqEV (READY).
