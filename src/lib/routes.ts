// The Rev 2.0 route tree (deliverables/PMG-Site-Map-Rev-2.0.pdf). Navigation, the footer,
// breadcrumbs, sitemap.xml, and the HTML site map all read from here, so a page only
// needs to be added once. Paths always carry a trailing slash, matching trailingSlash: true.
import { educationArticles } from "../content/legacy/education.ts";
import { legacyNewsPosts } from "../content/legacy/news.ts";
import { partnerStates } from "../content/legacy/states.ts";
import { partnerHospitals } from "../content/legacy/partners.ts";
import { directoryCounts } from "./partner-stats.ts";
import { legacyNewsBodies } from "../content/legacy/news-posts.ts";
import { legacyArticleBodies } from "../content/legacy/articles.ts";
import { excerpt } from "./excerpt.ts";

const directory = directoryCounts(partnerHospitals);

// Built from the directory count for the state, so each state page's description differs.
function stateDescription(name: string, slug: string) {
  const n = partnerHospitals.filter((p) => p.state === slug).length;
  const lead =
    n === 1
      ? `Pain Management Group's partner hospital in ${name}`
      : n === 2
        ? `Both Pain Management Group partner hospitals in ${name}`
        : `All ${n} Pain Management Group partner hospitals in ${name}`;
  return `${lead}, with city, phone number, and website for each hospital-based pain management center where available.`;
}

// Award post titles run long even without a suffix.
const newsSeoTitles: Record<string, string> = {
  "pain-management-group-receives-spirit-award-from-the-partnership-for-excellence":
    "PMG Receives Partnership For Excellence Spirit Award",
  "pain-management-group-receives-the-partnership-for-excellence-silver-award-2022":
    "PMG Receives 2022 Partnership For Excellence Silver Award",
};

export type Audience = "hospital" | "provider" | "patient" | "utility";

// placeholder: route exists so links resolve, content arrives in its build phase.
// pending: page is built but waits on content PMG must supply (legal text, leadership
// profiles, provider testimonials). Like a placeholder, it is noindex and out of sitemap.xml.
// draft: real content, still in review. live: approved and listed in sitemap.xml.
export type RouteStatus = "placeholder" | "pending" | "draft" | "live";

// Pages kept out of search until their content exists.
export const isHidden = (status: RouteStatus) =>
  status === "placeholder" || status === "pending";

export type SiteRoute = {
  path: string;
  title: string;
  // Search title when "<title> | Pain Management Group" and "<title> | PMG" both run past
  // 60 characters (see routeMetadata).
  seoTitle?: string;
  navLabel?: string;
  description: string;
  audience: Audience;
  phase: number;
  status: RouteStatus;
  // Shown in the header dropdown under its section.
  inMenu?: boolean;
  children?: SiteRoute[];
};

const route = (r: SiteRoute) => r;

export const home = route({
  path: "/",
  title: "Hospital Pain Management Partnerships",
  seoTitle: "Pain Management Group | Hospital Pain Management Partners",
  description:
    "Pain Management Group partners with hospitals to build and run physician-led pain management programs that are medically, socially, and financially responsible.",
  audience: "hospital",
  phase: 3,
  status: "draft",
});

export const sections: SiteRoute[] = [
  route({
    path: "/partnership/",
    title: "The PMG Partnership Model",
    navLabel: "Partnership Model",
    description:
      "How Pain Management Group partners with hospitals to build a pain management service line, from launch through long-term operation.",
    audience: "hospital",
    phase: 3,
    status: "draft",
    children: [
      route({
        path: "/partnership/how-it-works/",
        title: "How the Partnership Works",
        description:
          "The four phases of a PMG hospital partnership: assess, design, build and launch, then manage and grow, with what PMG and the hospital each own in every phase.",
        audience: "hospital",
        phase: 3,
        status: "draft",
        inMenu: true,
      }),
      route({
        path: "/partnership/balanced-pain-treatment/",
        title: "The Balanced Pain Treatment Model",
        description:
          "PMG's Balanced Pain Treatment model: pain care that is medically, socially, and financially responsible for patients, communities, and hospitals.",
        audience: "hospital",
        phase: 3,
        status: "draft",
        inMenu: true,
      }),
      route({
        path: "/partnership/financial-model/",
        title: "Partnership and Financial Model",
        description:
          "How PMG's joint-venture pain management partnerships are structured and funded, explained plainly for hospital CEOs and CFOs.",
        audience: "hospital",
        phase: 3,
        status: "draft",
        inMenu: true,
      }),
      route({
        path: "/partnership/questions/",
        title: "What Hospital Leaders Ask",
        description:
          "Direct answers to the questions hospital CEOs, CFOs, and boards ask before starting a pain management partnership with Pain Management Group.",
        audience: "hospital",
        phase: 3,
        status: "draft",
        inMenu: true,
      }),
    ],
  }),
  route({
    path: "/results/",
    title: "Results and Outcomes",
    navLabel: "Results",
    description:
      "Pain Management Group partnership results for hospital leaders: the program dashboard, partner case studies, and what hospital executives say about PMG.",
    audience: "hospital",
    phase: 4,
    status: "draft",
    children: [
      route({
        path: "/results/dashboard/",
        title: "Program Dashboard",
        description:
          "The Pain Management Group program dashboard: partner network size, patient encounters, and program retention across PMG hospital partner programs.",
        audience: "hospital",
        phase: 4,
        status: "draft",
        inMenu: true,
      }),
      route({
        path: "/results/case-studies/",
        title: "Case Studies",
        description:
          "Case studies from Pain Management Group partner hospitals: how each pain management program was planned, launched, and run, and what it delivered.",
        audience: "hospital",
        phase: 4,
        status: "draft",
        inMenu: true,
      }),
      route({
        path: "/results/testimonials/",
        title: "Testimonials",
        description:
          "What hospital CEOs and administrators say about partnering with Pain Management Group to build and run a hospital-based pain management program.",
        audience: "hospital",
        phase: 4,
        status: "draft",
        inMenu: true,
      }),
    ],
  }),
  route({
    path: "/our-partners/",
    title: "Our Hospital Partners",
    navLabel: "Our Partners",
    description: `Find a Pain Management Group partner near you: ${directory.hospitals} partner hospitals in ${directory.states} states, each with a hospital-based pain management center.`,
    audience: "hospital",
    phase: 5,
    status: "draft",
    children: partnerStates.map((state) =>
      route({
        path: `/our-partners/${state.slug}/`,
        title: `${state.name} Hospital Pain Management Partners`,
        navLabel: state.name,
        description: stateDescription(state.name, state.slug),
        audience: "hospital",
        phase: 5,
        status: "draft",
        inMenu: true,
      }),
    ),
  }),
  route({
    path: "/providers/",
    title: "For Providers and APPs",
    navLabel: "For Providers",
    description:
      "Pain management physician and advanced practice provider careers with Pain Management Group's hospital partner programs.",
    audience: "provider",
    phase: 6,
    status: "draft",
    children: [
      route({
        path: "/providers/why-pmg/",
        title: "Why Practice With PMG",
        description:
          "Practice autonomy, procedure support, and predictable schedules for pain management physicians and APPs at PMG partner hospitals.",
        audience: "provider",
        phase: 6,
        status: "draft",
        inMenu: true,
      }),
      route({
        path: "/providers/opportunities/",
        title: "Open Opportunities",
        description:
          "Current pain management physician and advanced practice provider openings with Pain Management Group, posted on Indeed and CareerMD.",
        audience: "provider",
        phase: 6,
        status: "draft",
        inMenu: true,
      }),
      route({
        path: "/providers/life-at-pmg/",
        title: "Life at PMG",
        description:
          "Culture and provider perspectives from Pain Management Group partner programs.",
        audience: "provider",
        phase: 6,
        status: "pending",
        inMenu: true,
      }),
    ],
  }),
  route({
    path: "/pain-education/",
    title: "Pain Education",
    description:
      "Patient education from Pain Management Group: pain conditions, interventional pain procedures, and pain medications, with videos for many procedures.",
    audience: "patient",
    phase: 7,
    status: "draft",
    children: educationArticles.map((article) =>
      route({
        path: `/pain-education/${article.slug}/`,
        title: article.title,
        description: excerpt(
          legacyArticleBodies.find((b) => b.slug === article.slug)?.body as {
            _type: string;
          }[],
        ),
        audience: "patient",
        phase: 7,
        status: "draft",
      }),
    ),
  }),
  route({
    path: "/about-us/",
    title: "About Pain Management Group",
    seoTitle: "About Pain Management Group",
    navLabel: "About",
    description:
      "Pain Management Group builds and manages hospital-based pain management programs with partner hospitals. Learn our mission, story, and team in Findlay, Ohio.",
    audience: "hospital",
    phase: 8,
    status: "draft",
    children: [
      route({
        path: "/about-us/mission/",
        title: "Our Mission and Story",
        description:
          "Pain Management Group's mission and story: why PMG partners with hospitals to deliver pain care that is medically, socially, and financially responsible.",
        audience: "hospital",
        phase: 8,
        status: "draft",
        inMenu: true,
      }),
      route({
        path: "/about-us/leadership/",
        title: "Leadership Team",
        description: "The people who lead Pain Management Group.",
        audience: "hospital",
        phase: 8,
        status: "pending",
        inMenu: true,
      }),
      route({
        path: "/about-us/careers/",
        title: "Internal Team Opportunities",
        description:
          "Non-clinical careers on Pain Management Group's internal team, supporting the hospital partner programs PMG builds and manages, and how to apply.",
        audience: "utility",
        phase: 8,
        status: "draft",
        inMenu: true,
      }),
    ],
  }),
  route({
    path: "/news/",
    title: "News",
    description:
      "Pain Management Group news: awards, community work, and announcements from PMG and the hospital partner programs it builds and manages.",
    audience: "hospital",
    phase: 8,
    status: "draft",
    children: legacyNewsPosts.map((post) =>
      route({
        path: `/news/${post.slug}/`,
        title: post.title,
        seoTitle: newsSeoTitles[post.slug],
        description: excerpt(
          legacyNewsBodies.find((b) => b.slug === post.slug)?.body ?? [],
        ),
        audience: "hospital",
        phase: 8,
        status: "draft",
      }),
    ),
  }),
];

export const contact = route({
  path: "/contact/",
  title: "Contact Pain Management Group",
  seoTitle: "Contact Pain Management Group",
  navLabel: "Contact",
  description:
    "Schedule a call with Pain Management Group about a hospital pain management partnership, or find a partner clinic near you. Offices in Findlay, Ohio.",
  audience: "hospital",
  phase: 8,
  status: "draft",
});

export const utilityPages: SiteRoute[] = [
  route({
    path: "/privacy/",
    title: "Privacy Policy",
    description:
      "How Pain Management Group handles information collected through this website.",
    audience: "utility",
    phase: 8,
    status: "pending",
  }),
  route({
    path: "/terms/",
    title: "Terms of Service",
    description: "Terms of use for the Pain Management Group website.",
    audience: "utility",
    phase: 8,
    status: "pending",
  }),
  route({
    path: "/accessibility/",
    title: "Accessibility",
    description:
      "Pain Management Group's commitment to an accessible website, and how to report a problem.",
    audience: "utility",
    phase: 8,
    status: "pending",
  }),
  route({
    path: "/sitemap/",
    title: "Site Map",
    description:
      "Every page on the Pain Management Group website: the partnership model, results, partner hospitals by state, provider careers, and pain education.",
    audience: "utility",
    phase: 2,
    status: "draft",
  }),
];

const flatten = (routes: SiteRoute[]): SiteRoute[] =>
  routes.flatMap((r) => [r, ...flatten(r.children ?? [])]);

export const allRoutes: SiteRoute[] = [
  home,
  ...flatten(sections),
  contact,
  ...utilityPages,
];

// sitemap.xml lists every route with real content. Placeholders join automatically when
// their phase sets them to draft or live. Paths keep their trailing slash.
export const sitemapPaths = () =>
  allRoutes.filter((r) => !isHidden(r.status)).map((r) => r.path);

const byPath = new Map(allRoutes.map((r) => [r.path, r]));

export function getRoute(path: string): SiteRoute {
  const found = byPath.get(path);
  if (!found) throw new Error(`No route registered for ${path}`);
  return found;
}

// Home, then each ancestor section, then the page itself. Pages built from CMS records
// (case studies) are not in the registry, so they pass themselves in as `current`.
export function breadcrumbTrail(
  path: string,
  current?: SiteRoute,
): SiteRoute[] {
  if (path === "/") return [home];
  const segments = path.split("/").filter(Boolean);
  const trail = segments
    .map((_, i) => byPath.get(`/${segments.slice(0, i + 1).join("/")}/`))
    .filter((r): r is SiteRoute => Boolean(r));
  if (current && trail.at(-1)?.path !== current.path) trail.push(current);
  return [home, ...trail];
}
