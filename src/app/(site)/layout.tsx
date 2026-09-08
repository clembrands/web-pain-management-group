import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSettings } from "@/sanity/lib/content";
import Link from "next/link";
import { reviewMode } from "@/content/review/pages";
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  return (
    <>
      {reviewMode && (
        <div className="border-b border-[#e7d6ac] bg-[#fbf6ea] text-[#735716]">
          <div className="container-shell flex flex-wrap items-center justify-between gap-2 py-2 text-xs">
            <p>
              Client review · Draft copy and sample records · Not for patient
              use
            </p>
            <Link
              href="/review"
              className="font-semibold underline underline-offset-4"
            >
              Explore the full sitemap →
            </Link>
          </div>
        </div>
      )}
      <SiteHeader schedulingUrl={settings.schedulingUrl} />
      <main id="main">{children}</main>
      <SiteFooter settings={settings} />
      {process.env.VERCEL_ENV === "production" && <Analytics />}
    </>
  );
}
