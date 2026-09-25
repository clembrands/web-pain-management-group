# PMG Site Rebuild: Build Brief for Claude Code

**Client:** Pain Management Group (PMG)
**Live site:** https://painmgmtgroup.com
**Prepared by:** Clembrands
**Source of truth:** PMG Site Map, Rev 2.0 (client-approved), `deliverables/PMG-Site-Map-Rev-2.0.pdf`. If this brief and the site map ever disagree, the site map wins. Ask before deviating from either.

Decisions made after this brief was written are recorded in `docs/decisions.md` and take precedence over the defaults below (notably: Sanity is kept as the CMS for Pain Education, News, Case Studies, and partner data).

---

## 1. What you're building

A full rebuild of painmgmtgroup.com around an approved information architecture. The site serves two audiences, in this priority order:

1. **Hospital leaders** (CEOs, CFOs, service-line VPs) evaluating a pain management partnership with PMG. This is the primary conversion path. Goal: **Schedule a Call**.
2. **Physicians and APPs** evaluating a job with PMG. Goal: **View Opportunities**.

Patients are not a target audience, but they do land on the site. They get routed to Our Partners (Find a Clinic) and the Pain Education library.

The non-negotiable principle: **existing search equity is never gambled.** Every URL that already ranks keeps its exact address. Every URL that moves gets a permanent 301. Nothing ships that breaks an indexed URL.

---

## 2. Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Deployed on Vercel
- Content: Sanity for Pain Education, News, Case Studies, and partner hospitals; everything else in code
- Redirects in `next.config` as `permanent: true` (308/301)
- Analytics: GTM container loading GA4 + Microsoft Clarity. No Meta Pixel.

---

## 3. Before writing any pages: inventory the live site

1. Crawl painmgmtgroup.com (sitemap.xml plus internal links) and produce a CSV of every live, indexable URL: `url, title, status, proposed_destination, action (keep | 301 | retire)`.
2. From that crawl, pull:
   - All Pain Education article URLs, with exact slugs, bucketed into Conditions, Procedures, Medications. Preserve every article found; report the final count and split.
   - The partner hospital list behind the current `/our-partners/` JavaScript filter: hospital name, city, state, and any existing links. There should be 10 states.
   - The ~13 orphaned theme-demo pages that are currently indexable.
   - The 3 named hospital-leader testimonials (quote, name, title, organization).
   - Existing awards / press / blog posts for News.
3. Migrate article body content, images, and alt text faithfully. Don't rewrite medical content.

---

## 4. Route map

Legend: **NEW** = doesn't exist today · **MIGRATE** = carried forward · **FIX** = exists but broken or incomplete

| Page | Route | Status | Notes |
|---|---|---|---|
| Home | `/` | MIGRATE | Two-audience hero that routes to Partnership Model or For Providers. Below the fold: preview results, proof, objections. |
| Partnership Model (hub) | `/partnership/` | NEW | The hospital-leader path. |
| How the Partnership Works | `/partnership/how-it-works/` | MIGRATE | 4-phase timeline. 301 from `/why-choose-us/`. |
| The Balanced Pain Treatment Model | `/partnership/balanced-pain-treatment/` | NEW | Medically, socially, financially responsible. |
| Partnership & Financial Model | `/partnership/financial-model/` | NEW | Joint-venture economics, plainly explained. |
| What Hospital Leaders Ask | `/partnership/questions/` | NEW | Objections library. Each question an H2 with a direct answer. FAQPage schema. |
| Results & Outcomes (hub) | `/results/` | NEW | Partnerships, encounters, retention. |
| Program Dashboard | `/results/dashboard/` | NEW | Outcomes tracked in the open. |
| Case Studies | `/results/case-studies/` + `/results/case-studies/[slug]/` | NEW | One indexable page per partner story. |
| Testimonials | `/results/testimonials/` | MIGRATE | The 3 existing named hospital-leader quotes. |
| Our Partners (hub) | `/our-partners/` | MIGRATE | URL unchanged. Add an interactive locations map. |
| Partners by State | `/our-partners/[state]/` ×10 | NEW | Replaces the JS filter with 10 statically generated pages. |
| For Providers & APPs (hub) | `/providers/` | FIX | 301 from `/provider-opportunities/` and `/service/`. |
| Why Practice With PMG | `/providers/why-pmg/` | NEW | Autonomy, procedure support, schedules. |
| Open Opportunities | `/providers/opportunities/` | MIGRATE | Existing job-listing tool. |
| Life at PMG | `/providers/life-at-pmg/` | NEW | Culture, provider testimonials. |
| Pain Education (hub) | `/pain-education/` | MIGRATE AS-IS | Hub reorganized into Conditions / Procedures / Medications. |
| Articles | `/pain-education/<existing-slug>/` | MIGRATE | Every slug preserved exactly. Category never appears in the URL. |
| About PMG (hub) | `/about-us/` | MIGRATE | URL unchanged. |
| Our Mission & Story | `/about-us/mission/` | FIX | Replaces today's dead Mission Statement link. |
| Leadership Team | `/about-us/leadership/` | NEW | Named people, photos, credentials. Person schema. |
| Internal Team Opportunities | `/about-us/careers/` | MIGRATE | Non-clinical roles. |
| News | `/news/` + `/news/[slug]/` | MIGRATE | 301 from `/blog/`, `/blog/*`, `/blog-left-sidebar/`. |
| Contact | `/contact/` | FIX | URL unchanged. Rebuilt as a real conversion page. |
| Hospital Inquiry Form | on `/contact/` | NEW | The "Schedule a Call" form. |
| Find a Clinic | on `/contact/` | MIGRATE | Routes patients to Our Partners. |
| Privacy Policy | `/privacy/` | NEW | |
| Terms of Service | `/terms/` | NEW | |
| HTML Site Map | `/sitemap/` | NEW | Auto-generated from the route tree. |

**Rules:** `trailingSlash: true`. Nothing more than two clicks from Home. Primary nav: Partnership Model, Results, Our Partners, For Providers, Pain Education, About, News, plus a Schedule a Call button; Contact in footer and utility nav. Hospital-leader sections end with Schedule a Call; provider sections end with View Opportunities.

---

## 5. Redirects

All permanent. Built from the crawl, at minimum:

| From | To |
|---|---|
| `/why-choose-us/` | `/partnership/how-it-works/` |
| `/provider-opportunities/` | `/providers/` |
| `/service/` | `/providers/` |
| `/blog/`, `/blog/:slug*` | `/news/`, `/news/:slug*` |
| `/blog-left-sidebar/` | `/news/` |
| Old Mission Statement link | `/about-us/mission/` |
| Theme-demo pages with traffic or links | 301 to the closest real page |
| Other theme-demo pages | 410 Gone, after approval |
| Review-build routes | Rev 2.0 equivalents (see `docs/decisions.md`) |

After deploy, a script requests every URL from the original crawl and confirms each returns 200 or a single-hop 301 to a 200.

---

## 6. Functional pieces

- **Hospital Inquiry Form:** name, title, hospital/health system, email, phone, state, message. Server-side validation, honeypot + rate limit. Destination TBD behind one handler function.
- **Open Opportunities:** identify the existing job-listing tool before rebuilding; preserve it if it's an embed.
- **Partners by State:** 10 pages from one partners data source. Unique H1 ("[State] Hospital Pain Management Partners"), intro, every partner hospital with city, a map, Schedule a Call CTA. Hub gets an interactive map linking to each state.
- **Newsletter signup** on News. Provider TBD, stubbed.
- **Results figures:** never invented. Placeholders read `{{TBD: confirmed by PMG}}` until PMG confirms.

---

## 7. SEO / GEO layer

- Unique title, meta description, canonical, Open Graph, Twitter per page via the Metadata API.
- Server-rendered JSON-LD: Organization site-wide; BreadcrumbList on every page except Home; Article or MedicalWebPage on every education article; FAQPage on `/partnership/questions/`; Person on Leadership; ItemList on each state page.
- One H1 per page, logical H2/H3.
- Auto-generated `sitemap.xml` with every indexable route.
- `robots.txt` allows Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, Google-Extended, Applebot-Extended.
- Static generation, `next/image`, green mobile Core Web Vitals.
- Internal linking: related articles within a category; state pages link to hub and each other; hospital-leader pages link to `/partnership/questions/` and `/results/`.

---

## 8. Build order

1. Inventory. *Stop for review.*
2. Foundation: layout, nav, footer, tokens, redirects, analytics, robots/sitemap.
3. Home + Partnership Model.
4. Results & Outcomes.
5. Our Partners (hub + 10 states + map).
6. For Providers & APPs.
7. Pain Education (hub + every article).
8. About, News, Contact, utility pages.
9. SEO/GEO pass: schema validation, metadata audit, redirect verification, Lighthouse.

Stop after each phase for review.

---

## 9. Definition of done

- [ ] Every URL from the original crawl returns 200 or a single 301 to a 200
- [ ] Every Pain Education slug byte-for-byte identical to live
- [ ] `/our-partners/`, `/about-us/`, `/contact/` URLs unchanged
- [ ] 10 state pages live, statically generated, in sitemap.xml
- [ ] Theme-demo pages retired (410 or 301), none left indexable
- [ ] JSON-LD validates with zero errors on every page type
- [ ] robots.txt allows the listed AI bots
- [ ] Inquiry form submits end to end
- [ ] No invented statistics; all Results figures marked TBD or confirmed
- [ ] GTM, GA4, Clarity firing
- [ ] Mobile Lighthouse: Performance 90+, SEO 100, Accessibility 95+

---

## 10. Open questions

1. Design direction: current PMG branding, or a new design system / mockup?
2. Where do Hospital Inquiry Form submissions go?
3. What powers the current job listings, and do we keep it?
4. Newsletter provider?
5. Hosting and domain: is DNS moving to Vercel, and who controls it?
6. Leadership Team: names, titles, credentials, headshots.
7. Case studies and Results figures: who at PMG supplies and signs off?

## Copy rules

- No em dashes in site copy.
- Don't rewrite migrated medical content.
- New copy is direct and specific, written for hospital executives first.
