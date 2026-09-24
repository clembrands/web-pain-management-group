import { PlaceholderPage } from "@/components/placeholder-page";
import { legacyNewsPosts } from "@/content/legacy/news";
import { routeMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Migrated WordPress posts. New posts will come from Sanity in Phase 8.
export const dynamicParams = false;
export const generateStaticParams = () =>
  legacyNewsPosts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props) {
  return routeMetadata(`/news/${(await params).slug}/`);
}

export default async function Page({ params }: Props) {
  return <PlaceholderPage path={`/news/${(await params).slug}/`} />;
}
