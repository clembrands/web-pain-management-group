import type { Metadata } from "next";
import { reviewMode } from "@/content/review/pages";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");
export const isIndexable =
  !reviewMode &&
  process.env.NEXT_PUBLIC_INDEXABLE === "true" &&
  process.env.VERCEL_ENV !== "preview" &&
  process.env.NODE_ENV === "production";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Pain Management Group",
      type: "website",
    },
  };
}
