import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { PortableBody } from "@/components/portable-body";
import { legacyNewsPosts } from "@/content/legacy/news";
import { formatDate } from "@/lib/dates";
import { excerpt } from "@/lib/excerpt";
import { allRoutes, type SiteRoute } from "@/lib/routes";
import {
  absoluteUrl,
  defaultSocialImage,
  organizationRef,
  routeMetadata,
} from "@/lib/seo";
import { getNewsPost, type NewsPost } from "@/sanity/lib/content";

type Props = { params: Promise<{ slug: string }> };

// Migrated posts are generated at build time. Posts added later in Sanity render on first
// request and refresh through the publishing webhook.
export const generateStaticParams = () =>
  legacyNewsPosts.map((p) => ({ slug: p.slug }));

const toRoute = (post: NewsPost): SiteRoute =>
  allRoutes.find((r) => r.path === `/news/${post.slug}/`) ?? {
    path: `/news/${post.slug}/`,
    title: post.title,
    description: excerpt(post.body),
    audience: "hospital",
    phase: 8,
    status: "live",
  };

export async function generateMetadata({ params }: Props) {
  const post = await getNewsPost((await params).slug);
  if (!post) return {};
  const metadata = routeMetadata(toRoute(post));
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function NewsPostPage({ params }: Props) {
  const post = await getNewsPost((await params).slug);
  if (!post) notFound();
  const route = toRoute(post);
  const image = post.body.find(
    (b): b is Extract<NewsPost["body"][number], { _type: "image" }> =>
      b._type === "image",
  );
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    datePublished: post.date,
    mainEntityOfPage: absoluteUrl(route.path),
    // Posts without a photo use the site's default sharing image.
    image: image
      ? image.src.startsWith("http")
        ? image.src
        : absoluteUrl(image.src)
      : absoluteUrl(defaultSocialImage.url),
    author: organizationRef(),
    publisher: organizationRef(),
  };
  return (
    <PageShell
      path={route.path}
      route={route}
      eyebrow="News"
      lede={`Published ${formatDate(post.date)}`}
      related={["/news/", "/about-us/", "/results/"]}
    >
      <JsonLd data={articleJsonLd} />
      <article className="container-shell section-space max-w-3xl">
        <PortableBody value={post.body} />
      </article>
    </PageShell>
  );
}
