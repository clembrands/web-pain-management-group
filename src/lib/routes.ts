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
          "The four phases of a PMG hospital partnership: assess, design, build and launch, then manage and grow.",
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
          "Direct answers to the questions hospital executives ask before starting a pain management partnership with PMG.",
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
      "PMG partnership results: partnerships, patient encounters, and retention, sourced and on the record.",
    audience: "hospital",
    phase: 4,
    status: "draft",
    children: [
      route({
        path: "/results/dashboard/",
        title: "Program Dashboard",
        description:
          "Pain Management Group program outcomes, tracked in the open.",
        audience: "hospital",
        phase: 4,
        status: "draft",
        inMenu: true,
      }),
      route({
        path: "/results/case-studies/",
        title: "Case Studies",
        description:
          "Hospital pain management partnership case studies from PMG partner programs.",
        audience: "hospital",
        phase: 4,
        status: "draft",
        inMenu: true,
      }),
      route({
        path: "/results/testimonials/",
        title: "Testimonials",
        description:
          "What hospital leaders say about partnering with Pain Management Group.",
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
        description: `Pain Management Group's hospital pain management partners in ${state.name}.`,
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
          "Current pain management physician and APP openings with Pain Management Group.",
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
      "Patient education on pain conditions, interventional procedures, and pain medications from Pain Management Group.",
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
    navLabel: "About",
    description:
      "Pain Management Group builds and manages hospital-based pain management programs. Based in Findlay, Ohio.",
    audience: "hospital",
    phase: 8,
    status: "draft",
    children: [
      route({
        path: "/about-us/mission/",
        title: "Our Mission and Story",
        description: "Pain Management Group's mission and history.",
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
          "Non-clinical careers on Pain Management Group's internal team.",
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
    description: "Pain Management Group news, awards, and press.",
    audience: "hospital",
    phase: 8,
    status: "draft",
    children: legacyNewsPosts.map((post) =>
      route({
        path: `/news/${post.slug}/`,
        title: post.title,
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
  navLabel: "Contact",
  description:
    "Schedule a call with Pain Management Group about a hospital pain management partnership, or find a partner clinic.",
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
    description: "Every page on the Pain Management Group website.",
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
