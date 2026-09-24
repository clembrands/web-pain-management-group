import "server-only";
import { cache } from "react";
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "../env";
import seed from "@/content/site.json";
import type { PortableTextBlock } from "next-sanity";
import type { Partner } from "@/content/types";
import {
  partnerHospitals,
  type PartnerHospital,
} from "@/content/legacy/partners";
import {
  legacyNewsBodies,
  type LegacyNewsPost,
} from "@/content/legacy/news-posts";

const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
    })
  : null;
async function fetchContent<T>(query: string, fallback: T): Promise<T> {
  if (!client) return fallback;
  // Configured CMS errors surface instead of silently hiding broken credentials.
  return (
    (await client.fetch<T | null>(
      query,
      {},
      { next: { revalidate: 60, tags: ["site-content"] } },
    )) ?? fallback
  );
}
const image = (name: string) => `"${name}": ${name}{"url": asset->url, alt}`;
export const getPartners = cache(() =>
  fetchContent<Partner[]>(
    `*[_type == "partner"] | order(name asc){_id,name,description,website,${image("logo")}}`,
    seed.partners,
  ),
);

// Partner hospitals. Falls back to the list migrated from the live site until the
// partner records are imported into Sanity (scripts/import-partners.ts).
export const getPartnerHospitals = cache(
  async (): Promise<PartnerHospital[]> => {
    if (!client) return partnerHospitals;
    const records = await client.fetch<PartnerHospital[]>(
      `*[_type == "partner" && defined(state)] | order(name asc){name, state, city, phone, website, legacyUrl}`,
      {},
      { next: { revalidate: 60, tags: ["site-content"] } },
    );
    return records.length ? records : partnerHospitals;
  },
);

export type CaseStudySummary = {
  title: string;
  slug: string;
  summary: string;
  partner?: { name: string; state: string };
};

export type CaseStudy = CaseStudySummary & {
  // Only figures PMG has confirmed are returned.
  figures: { label: string; value: string; source: string }[];
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
};

const caseStudyFields = `title, "slug": slug, summary, "partner": partner->{name, state}`;

// Published case studies only. None exist yet; the index shows an empty state.
export const getCaseStudies = cache(async (): Promise<CaseStudySummary[]> => {
  if (!client) return [];
  return client.fetch<CaseStudySummary[]>(
    `*[_type == "caseStudy" && defined(slug)] | order(title asc){${caseStudyFields}}`,
    {},
    { next: { revalidate: 60, tags: ["site-content"] } },
  );
});

export const getCaseStudy = cache(
  async (slug: string): Promise<CaseStudy | null> => {
    if (!client) return null;
    return client.fetch<CaseStudy | null>(
      `*[_type == "caseStudy" && slug == $slug][0]{${caseStudyFields}, "figures": figures[confirmedByPmg == true]{label, value, source}, body, seoTitle, seoDescription}`,
      { slug },
      { next: { revalidate: 60, tags: ["site-content"] } },
    );
  },
);

export type NewsPost = {
  slug: string;
  title: string;
  date: string;
  body: LegacyNewsPost["body"];
};

const newsFields = `"slug": slug, title, "date": publishedAt, body[]{..., _type == "image" => {..., "src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height}}`;

// News posts, newest first. Falls back to the 4 posts migrated from WordPress until news
// is imported into Sanity (scripts/import-content.ts).
export const getNewsPosts = cache(async (): Promise<NewsPost[]> => {
  const legacy = [...legacyNewsBodies].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
  if (!client) return legacy;
  const posts = await client.fetch<NewsPost[]>(
    `*[_type == "newsPost" && defined(slug)] | order(publishedAt desc){${newsFields}}`,
    {},
    { next: { revalidate: 60, tags: ["site-content"] } },
  );
  return posts.length ? posts : legacy;
});

export const getNewsPost = cache(
  async (slug: string): Promise<NewsPost | null> =>
    (await getNewsPosts()).find((p) => p.slug === slug) ?? null,
);
