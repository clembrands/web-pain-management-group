import { PlaceholderPage } from "@/components/placeholder-page";
import { educationArticles } from "@/content/legacy/education";
import { routeMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Every live article slug, preserved exactly. Category is navigation only, never in the URL.
export const dynamicParams = false;
export const generateStaticParams = () =>
  educationArticles.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props) {
  return routeMetadata(`/pain-education/${(await params).slug}/`);
}

export default async function Page({ params }: Props) {
  return <PlaceholderPage path={`/pain-education/${(await params).slug}/`} />;
}
