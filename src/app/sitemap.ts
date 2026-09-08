import type { MetadataRoute } from "next";
import { getPublishedPageSlugs } from "@/sanity/lib/content";
import { siteUrl, isIndexable } from "@/lib/seo";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return isIndexable
    ? ["", "contact", ...(await getPublishedPageSlugs())].map((slug) => ({
        url: `${siteUrl}/${slug}`,
      }))
    : [];
}
