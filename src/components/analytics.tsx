import { GoogleTagManager } from "@next/third-parties/google";
import { isIndexable } from "@/lib/seo";

// PMG's existing container. GA4 (G-5JJ8KNE4RS) and Microsoft Clarity are configured as
// tags inside GTM, not in code. See docs/analytics.md for the container setup.
const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-KNQXQ7K";

// Only the indexable production site reports to PMG's analytics, so preview and review
// traffic never mixes into historical data. Set NEXT_PUBLIC_ANALYTICS_DEBUG=true to load
// the container elsewhere, e.g. to test tags with GTM Preview.
const enabled =
  isIndexable || process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";

export function Analytics() {
  return enabled ? <GoogleTagManager gtmId={gtmId} /> : null;
}
