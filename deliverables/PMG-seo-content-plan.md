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

65 of the 70 pages need something from PMG, but almost all of it comes from the same
handful of conversations. Proposal: three one-hour recorded interviews, transcribed, which
I turn into drafts PMG reviews. Each maps to a group of pages.

**Interview 1: the partnership and the money** (CEO or COO, and finance)
Feeds `/partnership/`, `/partnership/financial-model/`, `/partnership/questions/`, Home.

- How a partnership is structured legally, who owns what, who decides what.
- What a hospital invests to start, and what PMG brings.
- How services are billed, how revenue is shared, how PMG is paid.
- Typical time to first patient and to break-even, and what moves those numbers.
- The number of partnerships today and how PMG counts one; the first partnership year.
- What happens when a partnership ends.

**Interview 2: how a program is built and run** (operations lead)
Feeds `/partnership/how-it-works/`, `/providers/*`, state pages.

- What each of the four phases involves, who does what, how long each takes.
- Who recruits, employs and credentials physicians and APPs; how the care team is trained.
- What PMG reports to partners, how often, in what meeting.
- Per-hospital detail for the directory: services at each center, when it opened, who
  refers into it, hours.
- How PMG sizes a program for a smaller hospital.
- The provider practice model: autonomy, procedure support, schedules, compensation approach.

**Interview 3: clinical approach and results** (clinical lead, and whoever owns the data)
Feeds `/partnership/balanced-pain-treatment/`, `/results/*`, Pain Education framing.

- What a balanced treatment plan includes; how medication, including opioids, is managed.
- The prescribing and monitoring protocols behind "responsible."
- Which measures PMG tracks, current values, sources and periods.
- Review of the disclaimer and of the framing sections added around the articles.
- Whether a named medical reviewer will stand behind the articles.

Everything in these lists is already an item on `deliverables/PMG-items-to-confirm.md`;
the interviews are the efficient way to close it.

## 5. Order of work

1. **Now, no PMG needed:** FAQ blocks and schema on every P1 page using existing copy;
   Pain Education framing and schema upgrade; state-page FAQs on appointments and
   referrals; condition-to-procedure links; the glossary if approved.
2. **After Interview 1:** Partnership pages to full depth; Home figures confirmed.
3. **After Interview 2:** How It Works, Providers, state pages with per-hospital paragraphs.
4. **After Interview 3:** Balanced Pain Treatment, Results and Dashboard, article review.
5. **Ongoing:** one News post per new partner, award or milestone.

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
