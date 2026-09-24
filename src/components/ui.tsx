import { RichText } from "@/components/rich-text";
import type { Question } from "@/content/pages/partnership";

// Accordion used for the Home preview of What Hospital Leaders Ask.
export function Faqs({ items }: { items: Question[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={item.id}
          className="group rounded-2xl border border-line bg-white px-6 shadow-sm"
          open={i === 0}
        >
          <summary className="flex list-none items-center justify-between gap-4 py-6 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="text-xl text-brand group-open:rotate-180"
            >
              ⌄
            </span>
          </summary>
          <div className="space-y-3 pb-6 text-sm text-muted">
            {item.answer.map((paragraph) => (
              <p key={paragraph}>
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
