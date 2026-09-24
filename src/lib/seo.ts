import type { Metadata } from "next";
import {
  breadcrumbTrail,
  getRoute,
  isHidden,
  type SiteRoute,
} from "@/lib/routes";
import { organization } from "@/lib/site";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

// Indexing is opt-in: only the production deployment with NEXT_PUBLIC_INDEXABLE=true.
export const isIndexable =
  process.env.NEXT_PUBLIC_INDEXABLE === "true" &&
  process.env.VERCEL_ENV !== "preview" &&
  process.env.NODE_ENV === "production";

// Search and AI retrieval crawlers named in the build brief. Each gets an explicit allow so
// a future blanket rule can't silently block them.
export const allowedCrawlers = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Claude-SearchBot",
  "Google-Extended",
  "Applebot-Extended",
];

export const absoluteUrl = (path: string) => `${siteUrl}${path}`;

export function routeMetadata(route: SiteRoute | string): Metadata {
  const r = typeof route === "string" ? getRoute(route) : route;
  // The home page title stands alone; every other page gets the " | Pain Management Group" suffix.
  const title =
    r.path === "/"
      ? { absolute: `${organization.name} | ${r.title}` }
      : r.title;
  const socialTitle =
    r.path === "/"
      ? `${organization.name} | ${r.title}`
      : `${r.title} | ${organization.name}`;
  return {
    title,
    description: r.description,
    alternates: { canonical: r.path },
    openGraph: {
      title: socialTitle,
      description: r.description,
      url: r.path,
      siteName: organization.name,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: r.description,
    },
    // Placeholders and pending pages stay out of search even after launch indexing is on.
    ...(isHidden(r.status) ? { robots: { index: false, follow: true } } : {}),
  };
}

const orgId = () => absoluteUrl("/#organization");

export function organizationJsonLd() {
  const a = organization.address;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId(),
    name: organization.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl(organization.logo),
    email: organization.email,
    telephone: organization.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    sameAs: [...organization.sameAs],
  };
}

export function breadcrumbJsonLd(path: string, current?: SiteRoute) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbTrail(path, current).map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.path === "/" ? "Home" : (r.navLabel ?? r.title),
      item: absoluteUrl(r.path),
    })),
  };
}

// Reference to the site-wide Organization node, for author/publisher fields.
export const organizationRef = () => ({
  "@type": "Organization",
  "@id": orgId(),
  name: organization.name,
});
