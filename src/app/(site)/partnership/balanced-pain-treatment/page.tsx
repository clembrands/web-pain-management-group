import { EditorialPage } from "@/components/editorial";
import { partnershipPages } from "@/content/pages/partnership";
import { routeMetadata } from "@/lib/seo";

const path = "/partnership/balanced-pain-treatment/";
export const metadata = routeMetadata(path);

export default function Page() {
  return <EditorialPage path={path} content={partnershipPages[path]} />;
}
