import { EditorialPage } from "@/components/editorial";
import { aboutPages } from "@/content/pages/about";
import { routeMetadata } from "@/lib/seo";

const path = "/about-us/careers/";
export const metadata = routeMetadata(path);

export default function Page() {
  return <EditorialPage path={path} content={aboutPages[path]} />;
}
