import { PlaceholderPage } from "@/components/placeholder-page";
import { routeMetadata } from "@/lib/seo";

const path = "/results/case-studies/";
export const metadata = routeMetadata(path);

export default function Page() {
  return <PlaceholderPage path={path} />;
}
