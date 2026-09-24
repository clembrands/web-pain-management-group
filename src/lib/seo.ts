import type { Metadata } from "next";
import {
  breadcrumbTrail,
  getRoute,
  isHidden,
  type SiteRoute,
} from "@/lib/routes";
import { organization } from "@/lib/site";
import { pageTitle } from "@/lib/page-title";
export { pageTitle };
export { allowedCrawlers } from "@/lib/crawlers";

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

export const absoluteUrl = (path: string) => `${siteUrl}${path}`;

// Shared by every page that has no image of its own (1200 by 630, public/og-default.png).
export const defaultSocialImage = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: organization.name,
};

export function routeMetadata(route: SiteRoute | string): Metadata {
  const r = typeof route === "string" ? getRoute(route) : route;
  const title = pageTitle(r);
  return {
    title: { absolute: title },
    description: r.description,
    alternates: { canonical: r.path },
    openGraph: {
      title,
      description: r.description,
      url: r.path,
      siteName: organization.name,
      type: "website",
      locale: "en_US",
      images: [defaultSocialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: r.description,
      images: [defaultSocialImage.url],
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
  url: absoluteUrl("/"),
});
