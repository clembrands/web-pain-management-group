import { plainText } from "@/components/rich-text";
import type { Question } from "@/content/pages/partnership";

// FAQPage JSON-LD for a set of questions. Answers are plain text; placeholders stay
// visible so a draft can never pass for a confirmed answer.
export const faqJsonLd = (questions: Question[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: q.answer.map(plainText).join(" "),
    },
  })),
});

// Question and answer pairs from an article body: each question-style heading and the
// paragraphs that follow it, until the next heading.
type Block = {
  _type: string;
  style?: string;
  children?: { text: string }[];
};
export function questionsFromBody(body: Block[]): Question[] {
  const out: Question[] = [];
  let current: Question | null = null;
  for (const b of body) {
    if (b._type !== "block") continue;
    const text = (b.children ?? [])
      .map((c) => c.text)
      .join("")
      .trim();
    if (/^h[2-4]$/.test(b.style ?? "")) {
      if (current && current.answer.length) out.push(current);
      current = /\?$/.test(text)
        ? {
            id: text.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            question: text,
            answer: [],
          }
        : null;
    } else if (current && text) current.answer.push(text);
  }
  if (current && current.answer.length) out.push(current);
  return out;
}
