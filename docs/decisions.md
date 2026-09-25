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
  including "Hosplital". Open questions are in `inventory/partners-to-confirm.csv`.
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

- Pain statistic cited to the Institute of Medicine (2011), _Relieving Pain in America_, and
  listed for Clembrands to verify (now in `docs/launch-checklist.md`).
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

## 2026-09-24: Phases 6 and 8 approved, Phase 7

- Home's first stat is the directory count, labeled "partner hospitals"; every other home
  figure stays TBD.
- "Thank You For Paying It Forward" keeps no reference to its two images, which already 404
  on the live site.
- Pain Education: all 36 articles migrated verbatim (encoding repairs only) with their live
  slugs, from one shared WordPress-to-Portable-Text converter that also handles news.
  `tests/verbatim.test.ts` compares every body with its source HTML in `inventory/source/`.
- The live articles have no images and no publish dates; none are added. Schema is
  MedicalWebPage with PMG as author and publisher; a reviewer appears only when set.
- ViewMedica: 33 iframe embeds and 3 older script embeds, each reproduced exactly (an iframe
  `title` is added for screen readers). Playback is checked on the production domain.
- Each article has breadcrumbs, 3 or 4 related articles from its category, a disclaimer
  pending PMG review, and the Find a Clinic CTA.

## 2026-09-24: Phase 7 approved, Phase 9 (SEO/GEO)

- Search titles: `<title> | Pain Management Group`, then `<title> | PMG`, then the title
  alone, whichever first fits in 60 characters. A route or Sanity record can set a full
  `seoTitle` instead. Descriptions are 120 to 160 characters; tests enforce both.
- Default share image and a square logo for structured data, both generated from the
  existing logo (`scripts/generate-brand-images.mjs`), plus favicon and app icons from its
  "P" mark. A vector logo from PMG would replace them.
- `docs/open-questions.md` and the partner confirmation list merged into
  `deliverables/PMG-items-to-confirm.md`, written for PMG. The partner CSV moved to
  `inventory/` because the Sanity import reads it; the pain statistic check (Clembrands)
  moved to the launch checklist.
- `npm run audit:site` checks metadata, structured data, linking, and crawl rules on a
  running build; `--launch` also fails on TBD placeholders. Results in `docs/seo-audit.md`.
- Cutover runbook in `docs/cutover.md`.

## 2026-09-24: Sample figures, header

- Numeric placeholders now render as sample figures (`{{SAMPLE: key}}`, values and notes in
  `src/content/sample-figures.ts`, list in `docs/sample-figures.md`) so review pages read
  realistically. They are marked `data-sample` in the HTML and still fail both launch checks.
  Prose placeholders (legal structure, protocols) stay as highlighted TBDs. PMG's confirmation
  list says the numbers are illustrative.
- Header: utility bar removed; Find a Clinic sits beside the CTA; logo enlarged.

## 2026-09-25: Design system (Direction B, "Monument")

- Two Home directions were built at a noindex `/design-lab/`; Direction B was chosen and
  applied to Home, then to the interior template, and the lab removed.
- The system: light Poppins display type (weights 200 and 300, loaded separately) for
  headings, small tracked uppercase labels, hairline rules and open layouts instead of
  rounded cards, a deep navy hero with an optional photograph in navy duotone dissolving
  into the background, the Balanced three-square mark as a recurring device, the partner
  map full-bleed and dark as the Home centerpiece, a centered closing CTA.
- Motion is CSS only (scroll-driven animations, off under prefers-reduced-motion): reveals,
  figures that count up, a slow hero drift, timeline steps that slide in, a logo scroll.
- Concept photographs of people were replaced by two concept photographs without faces
  (`concept-corridor.jpg`, `concept-exam-room.jpg`), uncaptioned; both are on the launch
  checklist for replacement with PMG photography.
- Header: six items, hamburger below 1440px, News under About, Find a Clinic under Pain
  Education.

## 2026-09-25: Content phase, step 1 (no PMG input needed)

- Page FAQs with FAQPage schema: the objections-library questions each Partnership page
  and the Results hub answers (`faqs` on EditorialContent), patient questions on the ten
  state pages, the four Home questions, and every article's own question headings and
  answers. FAQ schema is on 50 of 70 pages, from 1.
- Plain-language definitions (`src/content/glossary.ts`, DefinedTermSet schema) as "Terms
  used on this page" blocks. A glossary page waits on approval, being outside Rev 2.0.
- Pain Education framing around the unchanged articles: procedures the article itself
  names (a hand-reviewed map), where care is offered, the referral model, MedicalCondition
  or MedicalProcedure as the page's main entity described by its opening paragraph, and
  longer category introductions on the hub.
- Organization schema now carries the ten partner states as areaServed, a contact point,
  and knowsAbout topics.
- All new copy is general or restates facts already on the site; it is listed for PMG's
  clinician on the launch checklist.

## 2026-09-25: PMG onboarding homework (July 2026)

- The homework (`deliverables/PMG-Website-Onboarding-Homework-7.1.26.docx`) is PMG's own
  written answers, so its figures are shown as PMG figures (`{{PMG: key}}`,
  `src/content/pmg-figures.ts`), sourced and not blocking launch: 40 partnerships, 187,000
  encounters in 2025, 95% retention over two years, about 68 care locations, 20 years in
  operation. The first-partnership year stays a sample because 2009 (live site) and 20
  years (homework) conflict.
- "What makes PMG different" added to the Partnership Model page in PMG's words; "better
  than anyone" softened pending PMG approval.
- Three questions added from PMG's objections list (other service lines, compliance,
  timing), answers TBD; the library allows up to 16.
- Noted for scoping: HubSpot for hospital executives, LinkedIn for APP and corporate jobs,
  a possible iStats "Clinic Summary Grid" sync for locations, no cookie banners or pop-ups,
  care with medication and opioid language.

## Review-build routes (301)

| Review route                                   | Rev 2.0 destination                             |
| ---------------------------------------------- | ----------------------------------------------- |
| `/partnership/operating-model/`                | `/partnership/how-it-works/`                    |
| `/partnership/quality-and-compliance/`         | `/partnership/balanced-pain-treatment/`         |
| `/our-partners/stories/:slug*/`                | `/results/case-studies/`                        |
| `/locations/:path*/`                           | `/our-partners/`                                |
| `/for-providers/`                              | `/providers/`                                   |
| `/for-providers/practice-model/`               | `/providers/why-pmg/`                           |
| `/careers/:path*/`                             | `/providers/opportunities/`                     |
| `/resources/:path*/`                           | `/news/`                                        |
| `/about-us/leadership/sample-clinical-leader/` | `/about-us/leadership/`                         |
| `/review/`                                     | `/sitemap/`                                     |
| 8 provisional `/pain-education/` slugs         | the real live slug (see `src/lib/redirects.ts`) |
