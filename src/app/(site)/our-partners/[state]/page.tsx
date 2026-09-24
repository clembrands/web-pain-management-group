import { PlaceholderPage } from "@/components/placeholder-page";
import { partnerStates } from "@/content/legacy/states";
import { routeMetadata } from "@/lib/seo";

type Props = { params: Promise<{ state: string }> };

// One statically generated page per state in the live /our-partners/ filter.
export const dynamicParams = false;
export const generateStaticParams = () =>
  partnerStates.map((s) => ({ state: s.slug }));

export async function generateMetadata({ params }: Props) {
  return routeMetadata(`/our-partners/${(await params).state}/`);
}

export default async function Page({ params }: Props) {
  return <PlaceholderPage path={`/our-partners/${(await params).state}/`} />;
}
