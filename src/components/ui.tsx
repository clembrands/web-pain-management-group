import Link from "next/link";
import type { Card, Faq } from "@/content/types";
export function Cards({ items }: { items: Card[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <article className="card" key={item.title}>
          <h3>{item.title}</h3>
          <p className="mt-4 text-sm text-muted">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
export function Faqs({ items }: { items: Faq[] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <details
          key={item.question}
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
          <p className="pb-6 text-sm text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
export function CtaBand({ schedulingUrl }: { schedulingUrl?: string }) {
  return (
    <section className="bg-navy text-white">
      <div className="container-shell section-space flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-3xl">
          <h2 className="md:text-[40px]">
            Thinking about pain services? Talk to the experts first.
          </h2>
          <p className="mt-4 text-[#b9c8d4]">
            A 30-minute call. No commitments — just the model, the data, and the
            economics.
          </p>
        </div>
        <Link
          href={schedulingUrl || "/contact"}
          className="button shrink-0 bg-white text-navy hover:bg-[#dce6ee]"
        >
          Schedule a Call
        </Link>
      </div>
    </section>
  );
}
