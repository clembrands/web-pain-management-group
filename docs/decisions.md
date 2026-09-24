# PMG rebuild decisions log

Source of truth: `deliverables/PMG-Site-Map-Rev-2.0.pdf`. The September 7 client-review
sitemap (`deliverables/PMG Website Sitemap for Client Review.docx`) and the documents built
on it (`docs/seo-geo-sitemap.md`, `docs/photography-direction.md`) are superseded.

## 2026-09-24: Phase 1 approved

- **CMS: keep Sanity** for Pain Education, News, Case Studies, and partner hospitals.
  Everything else is code.
- **Routes follow Rev 2.0 exactly**, with `trailingSlash: true` to match WordPress.
- **Pain Education: 36 articles** (7 Conditions, 25 Procedures, 4 Medications), every slug
  exactly as live. Superion, live but missing from the old hub, is listed under Procedures.
  The existing `/pain-education/genicular-nerve-ablation/` redirect stays.
- **News:** `/blog/`, `/blog/:slug+`, `/blog-left-sidebar/`, and the WordPress category,
  author, and date archives 301 to `/news/`. The 4 posts move to `/news/<same-slug>/`.
- **State pages** use the full state name: `/our-partners/ohio/`.
- **Theme demo pages: 410 Gone** for all 18 (plus their 12 pagination pages). If a Search
  Console export arrives before launch, any page with real clicks switches to a 301.
- **Analytics:** reuse GTM `GTM-KNQXQ7K` and GA4 `G-5JJ8KNE4RS`, add Microsoft Clarity
  through GTM, no Meta Pixel. See `docs/analytics.md`: the container is currently empty.
- **Review-build routes** 301 to their Rev 2.0 equivalents (table below).
- **`/accessibility/`** stays as a footer utility page beside Privacy, Terms, and Site Map.

### Guardrails for Phase 2 onward

- **Partners:** never publish a guessed city or name. The 10 partners with no address on the
  live site show name and state only until PMG confirms. Current names stay as they are,
  including "Hosplital". Open questions are in `deliverables/partners-to-confirm.csv`.
- **Article schema:** PMG (the Organization) is author and publisher. The Sanity `article`
  type has an optional `medicalReviewer` field for when PMG names one.
- **ViewMedica:** every existing embed is kept exactly as it is.
- **Testimonials:** Patrick J. Martin's title stays blank.
- **Jobs:** Open Opportunities is two links, to Indeed and CareerMD. Internal roles link to
  careers@painmgmtgroup.com.

## 2026-09-24: Phase 2 approved, Phase 3 guidance

- GTM setup is a launch blocker, tracked in `docs/launch-checklist.md`.
- Both GA4 properties (`G-5JJ8KNE4RS`, `G-BY22K2YH53`) fire through GTM at launch; PMG
  then picks one.
- 308 redirects and the two-hop redirects for slash-less URLs are acceptable.
- Keep the review build's visual design. Draft copy comes from the live site, Rev 2.0, and
  the brief, written for hospital executives.
- No invented numbers, outcomes, or claims. Every figure on Home, including partnership
  counts, is a `{{TBD: ...}}` placeholder until PMG confirms it.
- Home copy moved from Sanity (`homePage`) into code, in line with Sanity holding only
  articles, news, case studies, and partners.

## 2026-09-24: Phase 3 approved, Phases 4 and 5

- Pain statistic cited to the Institute of Medicine (2011), *Relieving Pain in America*, and
  listed in `docs/open-questions.md` for verification.
- 13th question added: "How long does it take to launch a program?" The opioid and exit
  answers need PMG sign-off before launch.
- "Joint venture" stays (Rev 2.0 term); PMG confirms deals are structured that way.
- Every "Concept photography" caption must be gone by launch.
- Results: every metric is a TBD tile with its definition, source, and period. No sample
  case studies; the index is noindex until one is published. Testimonials have no photos.
- Our Partners: names exactly as the live site, city only where the live site has it. A
  static SVG map links to all 10 state pages. The overall partner and state counts are not
  stated as figures anywhere; the dashboard's network counts are TBD.

## 2026-09-24: Phases 4 and 5 approved, Phases 6 and 8

- Partner and state counts are derived from the partner directory and shown on the Our
  Partners hub, its meta description, and the dashboard's network tiles. Every other
  dashboard value stays TBD. Home's "hospital partnerships" stat stays TBD.
- Each state page has a unique 100 to 200 word intro built from the partner data.
- New route status `pending`: built pages that wait on PMG content (Life at PMG, Leadership,
  Privacy, Terms, Accessibility). Noindex and out of sitemap.xml.
- News: the 4 posts are migrated verbatim as Portable Text; images still on the live site
  are copied into `public/news/`. Two images already 404 on the live site and are omitted.
- Inquiry form: saves to the private Sanity dataset and emails a notification through
  Resend. Honeypot, minimum fill time, and a per-instance rate limit; a Vercel Firewall
  rule is the hard limit at launch.
- Newsletter signup is stubbed behind `src/lib/newsletter.ts`; the form shows "coming soon".
- Legal pages carry a "Legal text pending PMG review" placeholder; no legal text written.

## Review-build routes (301)

| Review route | Rev 2.0 destination |
| --- | --- |
| `/partnership/operating-model/` | `/partnership/how-it-works/` |
| `/partnership/quality-and-compliance/` | `/partnership/balanced-pain-treatment/` |
| `/our-partners/stories/:slug*/` | `/results/case-studies/` |
| `/locations/:path*/` | `/our-partners/` |
| `/for-providers/` | `/providers/` |
| `/for-providers/practice-model/` | `/providers/why-pmg/` |
| `/careers/:path*/` | `/providers/opportunities/` |
| `/resources/:path*/` | `/news/` |
| `/about-us/leadership/sample-clinical-leader/` | `/about-us/leadership/` |
| `/review/` | `/sitemap/` |
| 8 provisional `/pain-education/` slugs | the real live slug (see `src/lib/redirects.ts`) |
