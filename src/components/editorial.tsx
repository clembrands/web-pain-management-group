import { Timeline } from "@/components/design/sections";
import { RichText } from "@/components/rich-text";
import { TestimonialQuote } from "@/components/testimonial";
import { PageShell } from "@/components/page-shell";
import type { EditorialContent, Section } from "@/content/pages/partnership";

// Page body: a sticky "On this page" list beside the sections, as plain type with a
// hairline, no box.
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
      className="container-shell section-space grid scroll-mt-4 items-start gap-12 lg:grid-cols-[240px_1fr] lg:gap-20"
    >
      <aside className="border-t border-line pt-5 lg:sticky lg:top-8">
        <p className="label text-brand">On this page</p>
        <nav aria-label="On this page" className="mt-5 space-y-3">
          {items.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="block text-sm leading-snug text-muted hover:text-brand"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </aside>
      <div className="max-w-3xl space-y-16">{children}</div>
    </div>
  );
}

export function EditorialSection({ section }: { section: Section }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-8 border-t border-line pt-10 first:border-0 first:pt-0"
    >
      <h2>{section.title}</h2>
      {section.paragraphs?.map((p) => (
        <p key={p} className="mt-5 text-muted">
          <RichText text={p} />
        </p>
      ))}
      {section.points && (
        <ol className="mt-8">
          {section.points.map((point, i) => (
            <li
              key={point}
              className="grid grid-cols-[3rem_1fr] items-baseline border-t border-line py-4 text-[15px] text-ink"
            >
              <span className="label text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <RichText text={point} />
              </span>
            </li>
          ))}
        </ol>
      )}
      {section.steps && (
        <div className="mt-10">
          <Timeline steps={section.steps} />
        </div>
      )}
      {section.quote && (
        <div className="mt-10">
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
