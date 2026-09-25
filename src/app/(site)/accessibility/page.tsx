import { LegalPending } from "@/components/legal-pending";
import { routeMetadata } from "@/lib/seo";

const path = "/accessibility/";
export const metadata = routeMetadata(path);

export default function Page() {
  return <LegalPending path={path} />;
}
