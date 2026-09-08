import type { MetadataRoute } from "next";
import { siteUrl, isIndexable } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return isIndexable
    ? {
        rules: { userAgent: "*", allow: "/", disallow: ["/studio/", "/api/"] },
        sitemap: `${siteUrl}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
