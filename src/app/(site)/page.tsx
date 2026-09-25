import { HomeNarrative } from "@/components/home/narrative";
import { routeMetadata } from "@/lib/seo";

export const metadata = routeMetadata("/");

export default function HomePage() {
  return <HomeNarrative />;
}
