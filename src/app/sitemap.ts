import type { MetadataRoute } from "next";
import { sitemapPaths } from "@/lib/routes";
import { absoluteUrl, isIndexable } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return isIndexable
    ? sitemapPaths().map((path) => ({ url: absoluteUrl(path) }))
    : [];
}
