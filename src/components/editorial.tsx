import { RichText } from "@/components/rich-text";
import { TestimonialQuote } from "@/components/testimonial";
import { PageShell } from "@/components/page-shell";
import type { EditorialContent, Section } from "@/content/pages/partnership";

// Page body from the review build: a sticky "On this page" list beside the sections.
export function SectionsWithNav({
  items,
  children,
}: {
  items: { id: string; title: string }[];
  children: React.ReactNode;
}) {
  return (
    <div
      id="page-content"
      className="container-shell section-space grid scroll-mt-4 items-start gap-10 lg:grid-cols-[240px_1fr]"
    >
      <aside className="rounded-2xl border border-line bg-mist p-6 lg:sticky lg:top-6">
        <p className="eyebrow">On this page</p>
        <nav aria-label="On this page" className="space-y-4">
          {items.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="block text-sm leading-relaxed text-muted hover:text-brand"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </aside>
      <div className="max-w-3xl space-y-12">{children}</div>
    </div>
  );
}

export function EditorialSection({ section }: { section: Section }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-8 border-b border-line pb-10 last:border-0 last:pb-0"
    >
      <h2 className="text-2xl md:text-[30px]">{section.title}</h2>
      {section.paragraphs?.map((p) => (
        <p key={p} className="mt-5 text-muted">
          <RichText text={p} />
        </p>
      ))}
      {section.points && (
        <ul className="mt-6 grid gap-3">
          {section.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 rounded-xl bg-mist p-4 text-sm"
            >
              <span aria-hidden="true" className="font-bold text-brand">
                ✓
              </span>
              <span>
                <RichText text={point} />
              </span>
            </li>
          ))}
        </ul>
      )}
      {section.steps && (
        <ol className="mt-6 grid gap-4">
          {section.steps.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-[40px_1fr] gap-4 rounded-2xl border border-line bg-white p-5 shadow-[0_10px_26px_rgba(30,42,50,.05)]"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-brand font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg">{step.title}</h3>
                <p className="mt-2 text-[15px] text-muted">
                  <RichText text={step.body} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
      {section.quote && (
        <div className="mt-8">
          <TestimonialQuote name={section.quote} />
        </div>
      )}
    </section>
  );
}

export function EditorialPage({
  path,
  content,
}: {
  path: string;
  content: EditorialContent;
}) {
  return (
    <PageShell
      path={path}
      eyebrow={content.eyebrow}
      lede={content.lede}
      media={content.media}
      related={content.related}
    >
      <SectionsWithNav items={content.sections}>
        {content.sections.map((s) => (
          <EditorialSection key={s.id} section={s} />
        ))}
      </SectionsWithNav>
    </PageShell>
  );
}
