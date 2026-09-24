import { LegalPending } from "@/components/legal-pending";
import { routeMetadata } from "@/lib/seo";

const path = "/terms/";
export const metadata = routeMetadata(path);

export default function Page() {
  return <LegalPending path={path} />;
}
