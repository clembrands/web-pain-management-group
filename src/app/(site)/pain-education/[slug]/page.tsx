import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageShell, RelatedLinks } from "@/components/page-shell";
import { PortableBody } from "@/components/portable-body";
import { educationArticles } from "@/content/legacy/education";
import { educationDisclaimer } from "@/content/pages/education";
import { relatedArticles } from "@/lib/related";
import { getRoute } from "@/lib/routes";
import { absoluteUrl, organizationRef, routeMetadata } from "@/lib/seo";
import { getArticle } from "@/sanity/lib/content";

type Props = { params: Promise<{ slug: string }> };

// Every live article slug, preserved exactly. Category is navigation only, never in the URL.
export const dynamicParams = false;
export const generateStaticParams = () =>
  educationArticles.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props) {
  const slug = (await params).slug;
  const article = await getArticle(slug);
  const route = getRoute(`/pain-education/${slug}/`);
  return routeMetadata({
    ...route,
    ...(article?.seoTitle ? { seoTitle: article.seoTitle } : {}),
    ...(article?.seoDescription ? { description: article.seoDescription } : {}),
  });
}

const aboutType = {
  Conditions: "MedicalCondition",
  Procedures: "MedicalProcedure",
} as Record<string, string>;

export default async function ArticlePage({ params }: Props) {
  const slug = (await params).slug;
  const article = await getArticle(slug);
  if (!article) notFound();
  const path = `/pain-education/${slug}/`;
  const route = getRoute(path);

  // PMG is author and publisher. The live articles carry no dates, so none are given; a
  // reviewer appears only once PMG names one in Sanity.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: article.title,
    headline: article.title,
    description: route.description,
    url: absoluteUrl(path),
    inLanguage: "en-US",
    audience: { "@type": "PeopleAudience", audienceType: "Patient" },
    ...(aboutType[article.category]
      ? { about: { "@type": aboutType[article.category], name: article.title } }
      : {}),
    author: organizationRef(),
    publisher: organizationRef(),
    ...(article.medicalReviewer
      ? {
          reviewedBy: {
            "@type": "Person",
            name: [
              article.medicalReviewer.name,
              article.medicalReviewer.credentials,
            ]
              .filter(Boolean)
              .join(", "),
          },
          lastReviewed: article.medicalReviewer.reviewedAt,
        }
      : {}),
  };

  return (
    <PageShell
      path={path}
      eyebrow={`Pain Education · ${article.category}`}
      lede="Patient education from Pain Management Group."
    >
      <JsonLd data={jsonLd} />
      <article className="container-shell section-space max-w-3xl">
        <PortableBody value={article.body} title={article.title} />
        <aside className="mt-12 rounded-2xl border border-line bg-mist p-6 text-sm text-muted">
          {educationDisclaimer}
        </aside>
      </article>
      <RelatedLinks
        eyebrow={`More ${article.category.toLowerCase()}`}
        title="Related articles"
        paths={relatedArticles(slug).map((a) => `/pain-education/${a.slug}/`)}
      />
    </PageShell>
  );
}
