# Pain Management Group SEO and GEO sitemap

Proposed information architecture • September 7, 2026

## Recommendation

Build PMG around its hospital partnership business, with separate provider recruitment
and patient education/location journeys. Use the approved 1H design across the site.
The homework establishes an approximately 80% hospital executive / 20% physician
messaging priority; this is a positioning priority, not a requirement that 80% of URLs
serve executives. Existing patient education deserves a deliberate migration plan.

Start with 15 core editorial pages and two utility pages, plus reviewed existing
education content. Add location, case study, resource, biography, and job detail pages
only when their supporting records are ready. This is a proposed sitemap, not an
implementation change or a verified search-volume forecast.

## Evidence and implications

- **Homework:** hospital buyers need answers about building a program themselves,
  shared economics, governance, compliance, continuity, community reputation, and
  competing priorities. Give these questions substantial space in the partnership section.
- **Homework:** providers want practice autonomy, clinical and administrative support,
  schedules, compensation context, and credible opportunities. Avoid a careers page
  that only says PMG is hiring.
- **Current site:** the [partners page](https://painmgmtgroup.com/our-partners/) is
  organized around a state filter and logos in the retrieved content. The
  [contact page](https://painmgmtgroup.com/contact/) directs patients there for clinics.
  Separate evidence of business partnerships from finding a care location.
- **Current site:** the [education hub](https://painmgmtgroup.com/pain-education/)
  links to 35 topics: seven conditions, 24 procedures, and four medication topics.
  This is an inventory from the hub, not confirmation that all 35 pages currently
  work, rank, or should be retained unchanged.
- **Current site:** [careers](https://painmgmtgroup.com/service/) uses `/service/`;
  [news](https://painmgmtgroup.com/blog-left-sidebar/) uses `/blog-left-sidebar/`.
  Replace these unclear hub URLs with relevant permanent redirects.
- **Source discrepancy:** [About Us](https://painmgmtgroup.com/about-us/) says PMG
  has operated since 2009 and lists more than 50 locations. Homework reports 20 years,
  approximately 68 locations, and 40 partnerships. Confirm the dates and definitions
  before publishing a shared facts panel. A partnership and a care location are different entities.

Sources reviewed: supplied *PMG Website Onboarding Homework 7.1.26.docx* and the live
pages linked here, including Why Choose Us and a sample education article. Search
Console, analytics, backlinks, and a complete WordPress export were not available.
The web reader could not retrieve robots.txt or sitemap_index.xml; that does not
establish that these files are missing from the site.

## Navigation

Primary header: **Hospital Partnerships · Our Partners · For Providers · Resources · About PMG**

Utility links: **Find a Location · Patient Education · Contact**

Primary CTA: **Schedule a Call**, routed to the business inquiry page until an actual
booking tool is selected. In the mobile menu, keep the patient links clearly visible
rather than burying them beneath the business sections. Home remains accessible via the logo.

Dropdowns:

- Hospital Partnerships: overview, operating model, financial model, quality and compliance.
- For Providers: overview, practice model, current opportunities.
- Resources: hospital leadership resources, partner stories when available, company news.
- About PMG: organization and mission, leadership and clinical expertise.

The Resources hub can filter by content type; filters do not need separate indexable
URLs. Our Partners can link directly to its stories without requiring an empty story archive.

## Core launch pages

These 15 editorial pages each have a distinct job. Query themes below are intent
hypotheses derived from the business brief, not researched keyword volumes.

| URL | Page and primary audience | Search intent and required content | Main next step |
| --- | --- | --- | --- |
| `/` | Home; hospital decision-makers | Establish hospital-based pain management expertise; summarize model, evidence, and audience paths using 1H | Schedule a call |
| `/partnership` | Hospital pain management partnerships | Commercial overview: who PMG serves, problems solved, scope, alternatives, and when partnership fits | Discuss a program |
| `/partnership/operating-model` | How the partnership operates | Program setup, recruiting, training, clinical support, governance, responsibilities, and ongoing management; explain implementation sequence | Discuss operational fit |
| `/partnership/financial-model` | Partnership economics | Explain the approved JV structure, incentives, investment responsibilities, financial evaluation inputs, and how PMG assesses viability; do not promise ROI or time to profit | Request a financial discussion |
| `/partnership/quality-and-compliance` | Quality and responsible care | Describe outcome measurement, physician qualifications, oversight, documentation support, and compliance review processes with evidence; avoid blanket legal assurances | Discuss quality and oversight |
| `/our-partners` | Hospital partners and results | Verified partner identities, approved logos, dated metrics with definitions, and links to substantive partner stories | Read a story or discuss results |
| `/locations` | Find a pain management location | Searchable text directory and map; distinguish hospital partnerships from physical care locations | Contact a specific clinic |
| `/for-providers` | Careers with PMG for physicians and APPs | Why join PMG, physician-led practice, clinical philosophy, credible team facts, role-specific sections | View opportunities |
| `/for-providers/practice-model` | Practicing with PMG | Actual details on autonomy, procedure support, clinical and admin teams, schedules, call, onboarding, and compensation approach where approved | Discuss a role |
| `/careers` | Current opportunities | Current physician, APP, and corporate roles; links to the actual CareerMD, LinkedIn, or other confirmed postings | Apply through the designated platform |
| `/resources` | Insights and news | Original hospital leadership material, approved analyses, videos, and migrated news; distinguish evergreen resources from dated news | Read a relevant resource |
| `/pain-education` | Patient education | Organized condition, treatment, and medication education with a visible clinic-finder path | Learn and find care |
| `/about-us` | About PMG | Legal/business identity, mission, history, hospital focus, Balanced Pain Treatment Centers positioning, and verified company facts | Meet leadership or contact PMG |
| `/about-us/leadership` | Leadership and clinical expertise | Approved names, roles, credentials, real portraits, and authored/reviewed content relationships | Learn about PMG's expertise |
| `/contact` | Contact PMG | Separate hospital and provider inquiry choices; patients directed to clinics; actual contact and scheduling details | Submit a business inquiry or contact a clinic |

Two utility pages: `/privacy` and `/accessibility`, published with approved content
appropriate to the actual site. Do not invent a policy, certification, or privacy
practice. Confirmation pages such as `/contact/thank-you`, Studio, internal search,
drafts, and preview deployments stay out of the public XML sitemap and search index.

## Expandable page families

```text
Home /
├── Hospital Partnerships /partnership
│   ├── Operating model
│   ├── Financial model
│   └── Quality and compliance
├── Our Partners /our-partners
│   └── Partner story /our-partners/stories/[slug]            evidence required
├── Find a Location /locations
│   └── Care location /locations/[state]/[location-slug]     verified record required
├── For Providers /for-providers
│   └── Practice model
├── Careers /careers
│   └── Job /careers/[slug]                                 optional full job detail
├── Resources /resources
│   └── Resource /resources/[slug]                          original content
├── Patient Education /pain-education
│   └── Existing condition/treatment/medication slugs        preserve where suitable
├── About PMG /about-us
│   ├── Leadership
│   └── Biography /about-us/leadership/[slug]                substantial bio required
└── Contact /contact
```

### Care locations

Use one page per real clinic, not one page per town PMG would like to rank in.
Potential scope is approximately 68 records according to the homework, not a
commitment to publishing 68 pages immediately. The location slug should identify
the actual hospital/clinic, not merely repeat “pain management” plus a city name.

Required fields: approved clinic name, hospital relationship, physical address,
appointment phone, hospital appointment URL, verified hours, directions, and
services actually available there. Add provider relationships and referral instructions
where reliable. Location pages must clearly identify who provides and schedules care.
PMG's corporate phone and Findlay office must not appear as every clinic's contact.

The HTML directory and normal links must work independently of map interaction.
Start with verified manual records or a reviewed export from the Istats Clinic Summary
Grid. An automatic sync depends on API/export access and agreed update ownership.
An import must explicitly handle moves, closures, changed phones, and duplicate records.
Do not create state landing pages initially unless each can offer useful regional content.

### Partner stories

Publish a story only when PMG can supply an approved hospital identity, starting
situation, intervention, time period, attributable results, and permission to use
quotes/logos. Explain denominators and definitions for metrics. A logo alone is not
enough content for a story or a separate partner profile. Stories should link to
the relevant operating/financial page and, where appropriate, the clinic location.

### Patient education

Preserve useful existing `/pain-education/[slug]/` URLs; organizing the hub into
conditions and treatments does not require moving every child URL. Example retained
URL: `/pain-education/radiofrequency-ablation-rfa-for-pain/`.

Review all 35 linked topics for accuracy, distinct purpose, rights to embedded
video/materials, and medical review. Closely related regional procedure pages may
remain separate when they contain useful differences; merge only after content and
search-performance review. Medication content needs particular PMG review per the
homework. Avoid replacing the education library with a thin video-only page.

Template: direct explanation, who the information is for, what to discuss with a
clinician, what to expect, limitations, related topics, named medical reviewer,
review date, reputable sources, and clinic-finder CTA. Videos need accessible text
summaries and transcripts where rights permit. Do not imply all procedures are offered
at every location, and do not route patients into the hospital sales form.

### Resources and recruitment

Start the resource collection with migrated news and a small number of original,
expert-led pieces. Useful first subjects: evaluating community need for a hospital
pain program, recruiting a physician versus operating an entire program, how PMG
measures program performance, and coordinating referrals with existing service lines.
Keep central sales answers on their pillar pages and use articles for deeper
examples, methods, or interviews rather than duplicate explanations.

Role-specific physician and APP landing pages can follow when their copy materially
differs. At launch, use clear sections on `/for-providers` and filters on `/careers`.
Only publish `/careers/[slug]` when PMG maintains a full, current role description;
otherwise link to the external listing. Corporate careers remain discoverable from
the opportunities page and About/footer navigation.

## SEO and GEO content rules

GEO here means making PMG's expertise understandable and supportable in generative
search. It is not a separate set of guaranteed ranking tricks. Google's guidance
says existing SEO fundamentals apply and no special AI markup is required.
Our recommended implementation is concise answers, explicit entities, original
evidence, crawlable text, and useful internal connections; AI inclusion is not guaranteed.
[Google AI guidance](https://developers.google.com/search/docs/appearance/ai-features)

For each important page:

1. Own one clear intent. Define the audience, the question answered, the supporting
   evidence, and the next step before writing. Keep `/partnership` as the commercial
   overview and its children as genuinely deeper answers.
2. Put a short, self-contained answer near the start, followed by examples, qualifications,
   evidence, and deeper explanation. Use actual buyer questions as headings where natural.
3. Attribute claims. Store sources, measurement periods, approval status, and last review
   dates. Reuse company facts from one maintained source. Do not turn hypothetical
   provider benefits or financial results into universal promises.
4. Connect entities. Make the relationship between PMG, its leaders, partner hospitals,
   clinics, authors, and clinical reviewers explicit in visible content.
5. Link by purpose: resource → partnership pillar → inquiry; partner story → model/results;
   education → related education → clinic; provider content → real opportunities.
6. Keep meaningful content in server-rendered HTML. Give every approved indexable page
   a unique title, description, canonical URL, and accessible headings. Avoid generating
   indexable combinations of location filters, search terms, or content categories.

Structured data should describe the visible page: Organization on PMG identity pages,
BreadcrumbList on appropriate interior pages, Article with truthful author/reviewer
details on resources, and an appropriate MedicalClinic/Organization entity on verified
clinic pages. Add VideoObject only for eligible video pages with actual metadata.
FAQ sections are useful content without any promise of rich results.

JobPosting belongs only on a full, current job detail page with the required fields,
an application path, and expiration handling—not the general careers page or a link
to a job board. [Google job posting guidance](https://developers.google.com/search/docs/appearance/structured-data/job-posting)

No `llms.txt` dependency is needed to launch. Decide crawler permissions deliberately
and distinguish search discovery from training preferences. Do not claim a robots
setting guarantees citation by an AI platform.

## Initial migration map

This is a starting map from observed URLs, not a complete redirect manifest.

| Existing URL | Proposed treatment |
| --- | --- |
| `/` | Retain; replace content with approved 1H build |
| `/why-choose-us/` | Migrate useful content to `/partnership`; permanent redirect |
| `/about-us/` | Retain; expand mission into substantive organizational information |
| `/our-partners/` | Retain for business proof; add conspicuous link to `/locations` for returning patients |
| `/pain-education/` | Retain and improve the hub |
| `/pain-education/[existing-slug]/` | Preserve by default; reviewed merges get individual redirects |
| `/service/` | Permanent redirect to `/careers` after migrating relevant content |
| `/blog-left-sidebar/` | Permanent redirect to `/resources`; carry news into the new hub |
| Existing root-level news articles | Prefer retaining their URLs; if moved, map each individually to its new resource |
| `/contact/` | Retain and clarify audience routing |

Audit WordPress URLs, Search Console landing pages, inbound links, media, categories,
and archives before launch. Keep redirects single-hop to an equivalent page, not all
to Home. Implement one trailing-slash policy, update internal links and canonicals,
and include only canonical, published, indexable URLs in the generated sitemap.
Retired content without a relevant replacement should return an appropriate 404/410.
[Google migration guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)

## Build and CMS implications

The current six-page scaffold is a starting point; it does not yet implement this
architecture. The fixed page-slug dropdown and `[slug]` route will need expansion for
nested partnership pages and editorial collections. Retain the existing working routes
where they fit the plan; add `/careers`, `/resources`, `/pain-education`, and `/about-us`.

Extend Sanity with: partnerStory, resource, educationArticle, person, and full job
details where required. Expand location records with stable source IDs, verified
contact details, clinic URLs, and partner/provider references. Shared editorial fields:
slug, title, SEO overrides, excerpt/body, author/reviewer, factual review date, source
references, and related content. Publishing controls should prevent unfinished detail
pages entering navigation or the sitemap. Clinically sensitive material needs explicit
review status; no fabricated credentials or reviews.

The homework prefers email-driven edits managed by Justin. Sanity should support that
workflow; it does not require PMG to maintain the CMS themselves. HubSpot is a requested
hospital sales integration, not currently implemented. Keep core answers public and
indexable; optional document downloads can support lead follow-up. Scheduling remains
undecided. Evaluate tracking choices against the requested quiet, no-popup experience.

## Sequence and decisions

1. Confirm this architecture, authoritative company facts, leadership records, and
   content owners. Obtain WordPress/Search Console exports and the clinic grid.
2. Build the core templates and migrate reviewed existing URLs. Write the partnership
   pages from PMG interviews and approved supporting evidence.
3. Populate verified locations and at least the available substantive partner stories;
   defer unsupported pages rather than publish placeholders.
4. Validate redirects, canonicals, sitemap coverage, metadata, mobile navigation,
   clinic routing, and business inquiry tracking before enabling production indexing.

Measure hospital inquiries and qualified opportunities, provider application clicks,
clinic contact clicks, and education engagement separately. Track organic entrances
and conversions by page family. Use a consistent set of hospital-buyer questions to
observe AI citations over time, and report them as observations rather than rank
guarantees. Search Console and analytics are needed to prioritize improvements after launch.

Open inputs: verified location dataset/access, founding date and current metrics,
approved case studies, exact partnership/economic descriptions, leadership bios,
clinical reviewer, active job URLs, HubSpot requirements, and booking-tool choice.
