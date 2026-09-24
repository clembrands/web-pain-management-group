import "server-only";
import { cache } from "react";
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "../env";
import seed from "@/content/site.json";
import type {
  HomeContent,
  Settings,
  PageContent,
  Partner,
} from "@/content/types";

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
export const getSettings = cache(() =>
  fetchContent<Settings>('*[_id == "siteSettings"][0]', seed.settings),
);
export const getHome = cache(async () => {
  const home = await fetchContent<Partial<HomeContent>>(
    `*[_id == "homePage"][0]{...,${image("heroImage")},${image("storyImage")},${image("mapImage")}}`,
    {},
  );
  const result = {
    ...seed.home,
    ...Object.fromEntries(
      Object.entries(home).filter(([, value]) => value != null),
    ),
  } as HomeContent;
  for (const key of ["heroImage", "storyImage", "mapImage"] as const)
    if (!result[key]?.url) result[key] = seed.home[key];
  return result;
});
export const getPage = cache(async (slug: string) => {
  const fallback = seed.pages.find((page) => page.slug === slug);
  if (!fallback) return null;
  const content = await fetchContent<Partial<PageContent>>(
    `*[_type == "page" && slug == ${JSON.stringify(slug)}] | order(_updatedAt desc)[0]`,
    {},
  );
  return {
    ...fallback,
    ...Object.fromEntries(
      Object.entries(content).filter(([, value]) => value != null),
    ),
  } as PageContent;
});
export const getPartners = cache(() =>
  fetchContent<Partner[]>(
    `*[_type == "partner"] | order(name asc){_id,name,description,website,${image("logo")}}`,
    seed.partners,
  ),
);
