import { EditorialPage } from "@/components/editorial";
import { providerPages } from "@/content/pages/providers";
import { routeMetadata } from "@/lib/seo";

const path = "/providers/why-pmg/";
export const metadata = routeMetadata(path);

export default function Page() {
  return <EditorialPage path={path} content={providerPages[path]} />;
}
