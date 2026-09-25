import type { SiteRoute } from "./routes.ts";
import { organization } from "./site.ts";

// Search titles stay at 60 characters or less: "<title> | Pain Management Group" when it
// fits, then "<title> | PMG", then the title alone. seoTitle overrides all three.
export function pageTitle(r: SiteRoute): string {
  if (r.seoTitle) return r.seoTitle;
  const options = [
    `${r.title} | ${organization.name}`,
    `${r.title} | PMG`,
    r.title,
  ];
  return options.find((t) => t.length <= 60) ?? r.title;
}
