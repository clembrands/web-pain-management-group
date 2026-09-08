import { notFound } from "next/navigation";
import { EditorialPage } from "@/components/review-page";
import { reviewPages, reviewMode } from "@/content/review/pages";
import { getEditorialPage } from "@/sanity/lib/content";
import { pageMetadata } from "@/lib/seo";
export function generateStaticParams() {
  return reviewMode
    ? reviewPages.map((p) => ({ slug: p.slug.split("/") }))
    : [];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const page = await getEditorialPage((await params).slug.join("/"));
  return page
    ? {
        ...pageMetadata(page.title, page.description, `/${page.slug}`),
        ...(reviewMode ? { robots: { index: false, follow: false } } : {}),
      }
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const page = await getEditorialPage((await params).slug.join("/"));
  if (!page) notFound();
  return <EditorialPage page={page} preview={reviewMode} />;
}
