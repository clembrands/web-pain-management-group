import type { MetadataRoute } from "next";
import { sitemapPaths } from "@/lib/routes";
import { absoluteUrl, isIndexable } from "@/lib/seo";
import { getCaseStudies } from "@/sanity/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isIndexable) return [];
  // Case studies come from Sanity. The index is listed only once one is published.
  const studies = await getCaseStudies();
  const paths = [
    ...sitemapPaths().filter(
      (p) => studies.length || p !== "/results/case-studies/",
    ),
    ...studies.map((s) => `/results/case-studies/${s.slug}/`),
  ];
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
