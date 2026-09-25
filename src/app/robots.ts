import type { MetadataRoute } from "next";
import { allowedCrawlers, isIndexable, siteUrl } from "@/lib/seo";

// Nothing public is disallowed. Studio and API routes are not pages.
const privatePaths = ["/studio/", "/api/"];

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      ...allowedCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: privatePaths,
      })),
      { userAgent: "*", allow: "/", disallow: privatePaths },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
