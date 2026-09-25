# PMG website: SEO and GEO content plan

**Step 1 of the content phase: audit and intent map.** This document says where the site is
thin, what each page must answer, which searches it should own, and what only PMG can
supply. The page-by-page detail is in `deliverables/seo-content-audit.csv` (70 rows), which
`npm run audit:content -- <url>` regenerates from a running build.

Ground rule, unchanged: no invented facts. Depth comes from PMG's own knowledge, extracted
deliberately, from material already on the site, and from how content is structured and
marked up so search engines and AI answer engines can use it.

## 1. Where the site stands

Measured on the current build, counting page content only (hero and body, not the shared
related-links and closing sections):

| Depth                  | Pages | What is there                                                                                                                    |
| ---------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------- |
| Thin (under 300 words) | 25    | Results hub, Testimonials, 9 of 10 state pages, all Provider pages, About, Mission, Careers, Contact, News hub, 3 short articles |
| Moderate (300 to 600)  | 42    | Partnership pages, Dashboard, Ohio, 33 of 36 articles, News posts                                                                |
| Substantial (600+)     | 3     | Home, What Hospital Leaders Ask, one news post                                                                                   |

Other findings:

- **The money pages depend on PMG.** The five Partnership pages carry 21 `{{TBD}}`
  placeholders between them, and the Results pages show sample figures. Their depth is
  capped until the interviews in section 4 happen.
- **State pages are directories, not destinations.** They answer "which hospitals" but not
  "what does this center do, how do I get referred, what should I expect." Nine of ten are
  under 300 words.
- **Pain Education has the depth (median 415 words) but no framing.** No summary, no
  "when to see a specialist," no link from a condition to the procedures that treat it, no
  link to where care is offered, and generic MedicalWebPage schema on every article.
- **FAQ markup exists on one page** (What Hospital Leaders Ask). Answer-first blocks with
  FAQPage schema are the single most useful GEO addition and are missing everywhere else.
- **Entity signals are sound.** Organization schema with the same `@id` on every page,
  BreadcrumbList everywhere, MedicalClinic per partner on state pages, valid on all 70
  pages. The base is good; it needs more specific types (MedicalCondition,
  MedicalProcedure, HowTo, LocalBusiness) as content arrives.

## 2. Priorities

Priority weighs business value (hospital executives first), how thin the page is, and how
much can be done without PMG. The CSV carries the priority per page.

| Priority | Pages                                                                                                                                             | Why                                                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **P1**   | 18: Home, the 5 Partnership pages, Results, Our Partners, Ohio, Indiana, Kentucky, the 7 condition articles                                       | The pages that win or lose a hospital executive, plus the patient pages with the most partners or the most search demand |
| **P2**   | 43: Dashboard, Case Studies, the other 7 state pages, Providers (3), About, Contact, Pain Education hub, the 29 procedure and medication articles | Real value, less urgency, or dependent on content that does not exist yet                                                |
| **P3**   | 9: Testimonials, Mission, Careers, News and its posts, Site Map                                                                                   | Keep accurate; no expansion planned                                                                                      |

Four P1 pages are thin today: `/results/`, `/our-partners/indiana/`,
`/our-partners/kentucky/`, `/pain-education/spondylosis/`.

## 3. The substance template

Every P1 and P2 interior page gets the same skeleton. It is what people read and what AI
engines quote from.

1. **A direct answer in the first 50 words.** The page's question (column
   `question_answered` in the CSV) answered outright, before any context.
2. **H2s phrased as the questions people type.**
3. **A key-facts block.** Short, structured, sourced statements. This is where PMG's
   confirmed numbers live; every figure names its source and period.
4. **Three to five FAQs specific to the page**, marked up as FAQPage.
5. **Plain-language definitions** of the terms the page uses: joint venture, service line,
   interventional pain, APP, referral pathway.
6. **Consistent entity naming**: Pain Management Group, PMG, Findlay, Ohio, spelled the
   same way everywhere and tied to the Organization schema.
7. **Related links in both directions**: condition to procedure, state to partnership
   model, question to results, article to the state pages where care is offered.

Page-type specifics:

- **Partnership pages:** grow to 900 to 1,200 words each from the interview transcripts.
  HowTo schema on the four phases once PMG confirms them.
- **State pages:** one paragraph per hospital (services offered, since when, who refers),
  MedicalClinic schema completed with address and phone, patient FAQs on appointments and
  referrals. Ohio, Kentucky and Indiana first.
- **Pain Education:** the migrated medical text stays as it is. Around it: a plain-language
  summary at the top, "when to see a pain specialist," "where this is offered" linking to
  state pages, three FAQs, MedicalCondition or MedicalProcedure schema in place of
  MedicalWebPage, condition-to-procedure links. Every addition carries the disclaimer and
  goes through PMG's clinician.
- **Results:** every figure with definition, source and period; Dataset schema on the
  dashboard once the figures are real.

One proposed new page, which needs your approval because it is outside Rev 2.0: a
**glossary** (`/pain-education/glossary/`) defining the 30 or so terms the site uses, each
linking to the pages that use it. It is the cheapest GEO win available and needs no PMG
facts, only clinician review.

## 4. What only PMG can supply

PMG's onboarding homework (July 2026, `deliverables/PMG-Website-Onboarding-Homework-7.1.26.docx`)
already answers the headline figures (40 partnerships, 187,000 encounters in 2025, 95%
retention over two years, about 68 care locations, 20 years in operation), the objections
hospital leaders raise, what sets PMG apart, and the provider selling points. What is left
fits one 20-minute call with the CEO or COO, plus two short follow-ups by email.

**The call: eight questions, in priority order** (CEO or COO; record it)
Feeds `/partnership/`, `/partnership/financial-model/`, `/partnership/how-it-works/`,
`/partnership/questions/`, Home. Five answered is enough to write the Partnership pages.

1. How is a partnership structured legally? Who owns what, and who decides what?
2. What does a hospital typically put in to start, and what does PMG bring?
3. How is the money handled: who bills, how is revenue shared, how is PMG paid?
4. From a signed agreement, how long to the first patient, and roughly how long to break
   even? What moves those numbers?
5. The site says PMG has partnered with hospitals since 2009; your homework says 20 years
   of operation. Which year should the site use?
6. What happens if a partnership isn't working: term, review, exit?
7. How do you answer the three objections from your own list that the site does not yet
   answer: taking business from orthopedics or primary care, compliance (Stark, opioids,
   billing), and "not the right time"?
8. What do you report to a partner hospital, and how often?

**Follow-up by email, clinical lead** (five minutes of their time)
Feeds `/partnership/balanced-pain-treatment/` and the Pain Education framing.

- What a balanced treatment plan includes, and how prescribing is kept responsible. This is
  the answer that needs their sign-off, given the homework's caution on opioid language.
- A look at the disclaimer and the short sections added around the articles.

**Follow-up by email, whoever holds the numbers**
Feeds `/results/*`.

- New patients, primary care referrals, average and longest partnership length, patient
  satisfaction, pain improvement, and emergency visits, each with a source and year; or a
  note on which of these PMG does not track, so the tile can come off the dashboard.

**Later, when convenient** (operations; no meeting needed to start)
Per-hospital detail for the state pages (services, when each center opened, who refers in)
and the provider practice model (autonomy, procedure support, schedules, compensation).
The homework's provider list already sets the outline for those pages.

Every item is also on `deliverables/PMG-items-to-confirm.md`.

## 5. Order of work

1. **Now, no PMG needed (done):** FAQ blocks and schema on the Partnership pages, Results,
   Home, the ten state pages and all 36 articles; plain-language term blocks on the
   Partnership and Results pages; Pain Education framing (procedures the article names,
   where care is offered, the referral model), MedicalCondition and MedicalProcedure
   entities, longer hub introductions; Organization schema detail. The glossary page waits
   on approval; its definitions are already in use.
2. **From the onboarding homework (done):** PMG's figures on Home, Results and the
   dashboard; "What makes PMG different" on the Partnership Model page; three new questions
   from PMG's objections list.
3. **After the 20-minute call:** Partnership pages to full depth; remaining TBDs on What
   Hospital Leaders Ask.
4. **After the email follow-ups:** Balanced Pain Treatment, Results and Dashboard, article
   review.
5. **When operations can help:** state pages with per-hospital paragraphs; Providers.
6. **Ongoing:** one News post per new partner, award or milestone.

## 6. Measuring it

- **Search Console** after launch: impressions and clicks per page against the target
  phrases in the CSV; the phrases are editorial judgment to be validated there, not volume
  data.
- **AI answer check, monthly:** ask ChatGPT, Perplexity and Google's AI answers the
  hospital-executive questions in the CSV ("how does a hospital start a pain management
  service line," "what is a pain management joint venture") and record whether PMG appears
  and what is quoted.
- **Depth:** `npm run audit:content` on each release; the goal is no P1 page under 600
  words and no P2 page under 300 once the interviews are in.

## What I need from you

1. A yes or no on the glossary page.
2. Names for the three interviews on PMG's side, and whether you or I run them.
3. A go-ahead on step 1 of the order of work, which I can start now.
