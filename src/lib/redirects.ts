// Every permanent redirect and retired URL. next.config.ts serves the redirects and
// src/proxy.ts serves the 410s. tests/legacy-urls.test.ts checks both lists against the
// Phase 1 crawl (inventory/) so no indexed URL is left without a destination.
//
// Paths are written with trailing slashes, the way the live WordPress site served them.
import { legacyNewsPosts } from "../content/legacy/news.ts";
import { legacyPartnerPages } from "../content/legacy/partner-urls.ts";

export type Redirect = { source: string; destination: string; reason: string };

const legacySite: Redirect[] = [
  {
    source: "/why-choose-us/",
    destination: "/partnership/how-it-works/",
    reason: "Rev 2.0",
  },
  {
    source: "/service/",
    destination: "/providers/",
    reason: "Rev 2.0: old Careers page",
  },
  {
    source: "/provider-opportunities/",
    destination: "/providers/",
    reason: "Rev 2.0",
  },
  {
    source: "/internal-team-opportunities/",
    destination: "/about-us/careers/",
    reason: "Rev 2.0",
  },
  {
    source: "/about/",
    destination: "/about-us/",
    reason: "existing live redirect",
  },
  {
    source: "/pain-education/genicular-nerve-ablation/",
    destination: "/pain-education/genicular-nerve-ablation-rf-neurotomy/",
    reason: "existing live redirect; the hub still links the old slug",
  },

  // News. WordPress served posts at root-level slugs; archives were linked from every post.
  { source: "/blog/", destination: "/news/", reason: "Rev 2.0" },
  {
    source: "/blog-left-sidebar/",
    destination: "/news/",
    reason: "live nav's Blog link",
  },
  { source: "/blog/:slug+/", destination: "/news/:slug+/", reason: "Rev 2.0" },
  {
    source: "/category/:slug/",
    destination: "/news/",
    reason: "blog category archive",
  },
  {
    source: "/author/:slug/",
    destination: "/news/",
    reason: "blog author archive",
  },
  {
    source: "/:year(\\d{4})/:month(\\d{2})/",
    destination: "/news/",
    reason: "blog month archive",
  },
  {
    source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/",
    destination: "/news/",
    reason: "blog day archive",
  },
  ...legacyNewsPosts.map((post) => ({
    source: `/${post.slug}/`,
    destination: `/news/${post.slug}/`,
    reason: `news post ${post.date}`,
  })),

  // Theme post types that carried real PMG content.
  {
    source: "/our-clients/",
    destination: "/results/testimonials/",
    reason: "the 3 named testimonials",
  },
  {
    source: "/em_testimonial/:slug/",
    destination: "/results/testimonials/",
    reason: "testimonial record",
  },
  ...legacyPartnerPages.map((page) => ({
    source: `/em_portfolios/${page.slug}/`,
    destination: `/our-partners/${page.state}/`,
    reason: "partner page to its state page",
  })),
];

// Routes from the September 2026 client review build (web-pain-management-group.vercel.app).
const reviewBuild: Redirect[] = [
  {
    source: "/partnership/operating-model/",
    destination: "/partnership/how-it-works/",
    reason: "review build",
  },
  {
    source: "/partnership/quality-and-compliance/",
    destination: "/partnership/balanced-pain-treatment/",
    reason: "review build",
  },
  {
    source: "/our-partners/stories/:slug*/",
    destination: "/results/case-studies/",
    reason: "review build",
  },
  {
    source: "/locations/:path*/",
    destination: "/our-partners/",
    reason: "review build",
  },
  {
    source: "/for-providers/",
    destination: "/providers/",
    reason: "review build",
  },
  {
    source: "/for-providers/practice-model/",
    destination: "/providers/why-pmg/",
    reason: "review build",
  },
  {
    source: "/careers/:path*/",
    destination: "/providers/opportunities/",
    reason: "review build",
  },
  {
    source: "/resources/:path*/",
    destination: "/news/",
    reason: "review build",
  },
  {
    source: "/about-us/leadership/sample-clinical-leader/",
    destination: "/about-us/leadership/",
    reason: "review build sample",
  },
  {
    source: "/review/",
    destination: "/sitemap/",
    reason: "review build page inventory",
  },
  // Provisional education slugs the review build derived from titles.
  ...Object.entries({
    "bursitis-of-the-hip": "bursitis-of-the-hip-trochanteric-bursitis",
    "complex-regional-pain-syndrome": "complex-regional-pain-syndrome-crps",
    "lumbar-radiculopathy": "lumbar-radiculopathy-sciatica",
    "basivertebral-nerve-ablation": "basivertebral-nerve-ablation-bvn",
    "hip-joint-injection": "joint-injection",
    "mild-procedure": "mild-procedure-vertos-medical",
    "steroid-injection-for-shoulder-bursitis": "soft-tissue-injection",
    "spinal-cord-stimulator-trial":
      "spinal-cord-stimulator-implant-trial-procedure",
  }).map(([from, to]) => ({
    source: `/pain-education/${from}/`,
    destination: `/pain-education/${to}/`,
    reason: "review build provisional slug",
  })),
];

export const redirects: Redirect[] = [...legacySite, ...reviewBuild];

// Stock theme demo pages, approved for 410 Gone on 2026-09-24. If a Search Console
// export shows real clicks on one before launch, move it to a 301 above instead.
export const gonePaths = [
  "/blog-left-2column/",
  "/blog-right-2column/",
  "/blog-right-sidebar/",
  "/em_team/cristian-escobar/",
  "/em_team/mr-miller/",
  "/em_team/patrick-tomasso/",
  "/em_team/stephen-miller/",
  "/home-one-page/",
  "/home-video-page-2/",
  "/portfolio/",
  "/portfolio-3column/",
  "/portfolio-full-3column/",
  "/pricing-plan/",
  "/sample-page/",
  "/slider/slider/",
  "/slider/slider2-2/",
  "/slider/slider3-2/",
  "/type/gallery/",
];

// Pagination of the two portfolio grids, e.g. /portfolio-3column/page/2/.
export const gonePattern = /^\/portfolio(?:-full)?-3column\/page\/\d+\/$/;

export const isGone = (pathname: string) =>
  gonePaths.includes(pathname) || gonePattern.test(pathname);
