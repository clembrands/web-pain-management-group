import { SectionsWithNav } from "@/components/editorial";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { plainText, RichText } from "@/components/rich-text";
import { hospitalLeaderQuestions } from "@/content/pages/partnership";
import { routeMetadata } from "@/lib/seo";

const path = "/partnership/questions/";
export const metadata = routeMetadata(path);

// Objections library. Each question is an H2 in the words a hospital executive would use,
// and the first sentence under it answers directly, so answer engines can quote it.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: hospitalLeaderQuestions.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: q.answer.map(plainText).join(" "),
    },
  })),
};

export default function QuestionsPage() {
  return (
    <PageShell
      path={path}
      eyebrow="Partnership Model"
      lede="Direct answers to the questions hospital CEOs and CFOs ask before starting a pain management partnership with PMG."
      contentId="page-content"
      related={[
        "/partnership/financial-model/",
        "/partnership/how-it-works/",
        "/results/",
      ]}
    >
      <JsonLd data={faqJsonLd} />
      <SectionsWithNav
        items={hospitalLeaderQuestions.map((q) => ({
          id: q.id,
          title: q.question,
        }))}
      >
        {hospitalLeaderQuestions.map((q) => (
          <section
            key={q.id}
            id={q.id}
            className="scroll-mt-8 border-b border-line pb-10 last:border-0 last:pb-0"
          >
            <h2 className="text-2xl md:text-[28px]">{q.question}</h2>
            {q.answer.map((paragraph, i) => (
              <p
                key={paragraph}
                className={`mt-5 ${i === 0 ? "text-lg text-ink" : "text-muted"}`}
              >
                <RichText text={paragraph} />
              </p>
            ))}
          </section>
        ))}
      </SectionsWithNav>
    </PageShell>
  );
}
