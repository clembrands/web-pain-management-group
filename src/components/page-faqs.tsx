import { RuleFaqs } from "@/components/design/sections";
import { JsonLd } from "@/components/json-ld";
import type { Question } from "@/content/pages/partnership";
import { glossaryTerm } from "@/content/glossary";
import { faqJsonLd } from "@/lib/faq-schema";

// Page questions as a hairline list with FAQPage schema. Answer-first, so answer engines
// can quote them.
export function PageFaqs({
  questions,
  eyebrow = "Questions hospital leaders ask",
  title = "About this page",
}: {
  questions: Question[];
  eyebrow?: string;
  title?: string;
}) {
  if (!questions.length) return null;
  return (
    <section className="border-t border-line">
      <JsonLd data={faqJsonLd(questions)} />
      <div className="container-shell section-space grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-20">
        <div>
          <p className="label text-brand">{eyebrow}</p>
          <h2 className="mt-4 text-2xl md:text-[28px]">{title}</h2>
        </div>
        <div className="max-w-3xl">
          <RuleFaqs items={questions} />
        </div>
      </div>
    </section>
  );
}

// Plain-language definitions of the terms a page uses, with DefinedTermSet schema.
export function TermsBlock({ ids }: { ids: string[] }) {
  const terms = ids.map(glossaryTerm);
  if (!terms.length) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Terms used on this page",
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
    })),
  };
  return (
    <section className="bg-mist">
      <JsonLd data={jsonLd} />
      <div className="container-shell section-space grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-20">
        <div>
          <p className="label text-brand">Plain language</p>
          <h2 className="mt-4 text-2xl md:text-[28px]">
            Terms used on this page
          </h2>
        </div>
        <dl className="max-w-3xl divide-y divide-line border-t border-line">
          {terms.map((t) => (
            <div
              key={t.id}
              className="grid gap-2 py-5 md:grid-cols-[220px_1fr] md:gap-8"
            >
              <dt className="font-medium text-navy">{t.term}</dt>
              <dd className="text-[15px] text-muted">{t.definition}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
