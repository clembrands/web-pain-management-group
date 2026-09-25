import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageShell, RelatedLinks } from "@/components/page-shell";
import { PortableBody } from "@/components/portable-body";
import { educationArticles } from "@/content/legacy/education";
import { educationDisclaimer } from "@/content/pages/education";
import {
  proceduresMentioned,
  specialistNote,
  whereOffered,
} from "@/content/pages/education-links";
import { faqJsonLd, questionsFromBody } from "@/lib/faq-schema";
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
  // The article's own question headings and their answers, for FAQPage schema.
  const questions = questionsFromBody(
    article.body as Parameters<typeof questionsFromBody>[0],
  );
  const firstParagraph =
    questions[0]?.answer[0] ??
    (article.body as { _type: string; children?: { text: string }[] }[])
      .find((b) => b._type === "block")
      ?.children?.map((c) => c.text)
      .join("") ??
    route.description;
  const mentioned = (proceduresMentioned[slug] ?? [])
    .map((s) => educationArticles.find((a) => a.slug === s))
    .filter((a): a is (typeof educationArticles)[number] => Boolean(a));

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
    // The condition or procedure itself, described in the article's opening words.
    ...(aboutType[article.category]
      ? {
          about: { "@type": aboutType[article.category], name: article.title },
          mainEntity: {
            "@type": aboutType[article.category],
            name: article.title,
            description: firstParagraph,
            url: absoluteUrl(path),
          },
        }
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
      {questions.length > 0 && <JsonLd data={faqJsonLd(questions)} />}
      <article className="container-shell section-space max-w-3xl">
        <PortableBody value={article.body} title={article.title} />
        <aside className="mt-12 border-t border-line pt-6 text-sm text-muted">
          {educationDisclaimer}
        </aside>
      </article>
      {/* Framing around the article: links the article's own text supports, where care is
          offered, and the referral model. No medical advice. */}
      <section className="container-shell max-w-3xl pb-16">
        <div className="grid gap-10 border-t border-line pt-10 md:grid-cols-2">
          {mentioned.length > 0 && (
            <div>
              <p className="label text-brand">
                Procedures named in this article
              </p>
              <ul className="mt-4 divide-y divide-line border-t border-line">
                {mentioned.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/pain-education/${a.slug}/`}
                      className="block py-3 font-medium text-navy hover:text-brand"
                    >
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <p className="label text-brand">{whereOffered.title}</p>
            <p className="mt-4 text-[15px] text-muted">{whereOffered.body}</p>
            <Link
              href={whereOffered.link.href}
              className="mt-4 inline-block font-medium text-brand underline underline-offset-4"
            >
              {whereOffered.link.label}
            </Link>
          </div>
          <div className={mentioned.length > 0 ? "md:col-span-2" : ""}>
            <p className="label text-brand">{specialistNote.title}</p>
            <p className="mt-4 max-w-2xl text-[15px] text-muted">
              {specialistNote.body}
            </p>
          </div>
        </div>
      </section>
      <RelatedLinks
        eyebrow={`More ${article.category.toLowerCase()}`}
        title="Related articles"
        paths={relatedArticles(slug).map((a) => `/pain-education/${a.slug}/`)}
      />
    </PageShell>
  );
}
