import Image from "next/image";
import { reviewMedia } from "@/content/review/media";
import { ReviewMediaFigure } from "./review-media";
import Link from "next/link";
import { reviewPages, type ReviewPage } from "@/content/review/pages";
import { ReviewCollection } from "./review-collection";
import { PartnerLogos } from "./home/proof";
import seed from "@/content/site.json";
const collectionTypes: Record<
  string,
  { kind: ReviewPage["kind"]; label: string }
> = {
  locations: { kind: "location", label: "Care locations" },
  careers: { kind: "job", label: "Opportunities" },
  resources: { kind: "resource", label: "Insights and resources" },
  "pain-education": { kind: "education", label: "Education library" },
  "about-us/leadership": { kind: "person", label: "Leadership profiles" },
  "our-partners": { kind: "story", label: "Partner stories" },
};
export function EditorialPage({
  page,
  preview,
}: {
  page: ReviewPage;
  preview: boolean;
}) {
  const parent = page.slug.includes("/")
    ? page.slug.split("/").slice(0, -1).join("/")
    : "";
  const parentPage = reviewPages.find((p) => p.slug === parent);
  const related = page.links.map(
    (slug) =>
      reviewPages.find((p) => p.slug === slug) || {
        slug,
        title: slug === "contact" ? "Start a conversation" : "Explore",
        description: "Connect with Pain Management Group.",
      },
  );
  const collection = preview ? collectionTypes[page.slug] : undefined;
  const patient =
    ["education", "location"].includes(page.kind) ||
    ["locations", "pain-education"].includes(page.slug);
  const utility = page.kind === "legal";
  const media = preview ? reviewMedia(page.slug, page.kind) : undefined;
  const visual = Boolean(media || page.image);
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-shell pt-6 pb-16 md:pb-20">
          <nav
            aria-label="Breadcrumb"
            className="mb-12 flex flex-wrap gap-2 text-xs text-[#b9c8d4]"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            {parentPage && (
              <>
                <span aria-hidden="true">/</span>
                <Link href={`/${parent}`} className="hover:text-white">
                  {parentPage.eyebrow}
                </Link>
              </>
            )}
            <span aria-hidden="true">/</span>
            <span aria-current="page">{page.eyebrow}</span>
          </nav>
          <div
            className={`grid items-center gap-10 ${visual ? "lg:grid-cols-[1.1fr_.9fr]" : ""}`}
          >
            <div>
              <p className="eyebrow text-sky">{page.eyebrow}</p>
              <h1 className="max-w-4xl text-4xl leading-[1.15] font-bold tracking-tight md:text-5xl">
                {page.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base text-[#c4d3df] md:text-lg">
                {page.description}
              </p>
              {!utility && (
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={patient ? "/locations" : "/contact"}
                    className="button button-primary"
                  >
                    {patient ? "Find a care location" : "Start a conversation"}
                  </Link>
                  {page.sections.length > 0 && (
                    <a
                      href="#page-content"
                      className="button button-dark-outline"
                    >
                      Explore this page ↓
                    </a>
                  )}
                </div>
              )}
            </div>
            {media ? (
              <ReviewMediaFigure media={media} priority />
            ) : (
              page.image && (
                <div className="relative aspect-[1.3] overflow-hidden rounded-[22px]">
                  <Image
                    src={page.image}
                    alt={
                      page.slug === "locations"
                        ? "Concept map awaiting verification"
                        : "PMG concept photography"
                    }
                    fill
                    priority
                    sizes="(max-width:1023px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>
      {page.sample && (
        <div className="border-b border-[#e7d6ac] bg-[#fbf6ea]">
          <p className="container-shell py-4 text-sm text-[#735716]">
            <strong>Illustrative content.</strong>{" "}
            {page.kind === "job"
              ? "This is not an open position."
              : page.kind === "location"
                ? "This is not a real clinic listing."
                : page.kind === "education"
                  ? "Clinical content and reviewer approval are pending."
                  : "Details are placeholders for client review."}
          </p>
        </div>
      )}
      {page.sections.length > 0 && (
        <div
          id="page-content"
          className="container-shell section-space grid items-start gap-10 lg:grid-cols-[240px_1fr]"
        >
          <aside className="rounded-2xl border border-line bg-mist p-6 lg:sticky lg:top-6">
            <p className="eyebrow">On this page</p>
            <nav aria-label="On this page" className="space-y-4">
              {page.sections.map((s, i) => (
                <a
                  key={s.title}
                  href={`#section-${i}`}
                  className="block text-sm leading-relaxed text-muted hover:text-brand"
                >
                  {s.title}
                </a>
              ))}
            </nav>
            {preview && (
              <p className="mt-6 border-t border-line pt-5 text-xs leading-relaxed text-muted">
                Draft copy for discussion. Facts and final wording remain
                subject to PMG approval.
              </p>
            )}
          </aside>
          <div className="max-w-3xl space-y-12">
            {page.sections.map((s, i) => (
              <section
                id={`section-${i}`}
                key={s.title}
                className="scroll-mt-8 border-b border-line pb-10 last:border-0 last:pb-0"
              >
                <h2 className="text-2xl md:text-[30px]">{s.title}</h2>
                <p className="mt-5 text-muted">{s.body}</p>
                {s.points && (
                  <ul className="mt-6 grid gap-3">
                    {s.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 rounded-xl bg-mist p-4 text-sm"
                      >
                        <span
                          aria-hidden="true"
                          className="font-bold text-brand"
                        >
                          ✓
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      )}
      {preview &&
        page.kind === "page" &&
        !["locations", "pain-education", "about-us/leadership"].includes(
          page.slug,
        ) && (
          <section className="container-shell pb-16 md:pb-20">
            <div className="grid overflow-hidden rounded-[24px] bg-mist lg:grid-cols-2">
              <div className="relative min-h-72 lg:min-h-96">
                <Image
                  src="/assets/1chero.png"
                  alt="Concept photograph of a clinician listening to a patient"
                  fill
                  sizes="(max-width:1023px) 100vw, 50vw"
                  className="object-cover"
                />
                <p className="absolute right-4 bottom-4 left-4 rounded-lg bg-white/95 px-4 py-2 text-xs text-navy">
                  Concept photography · final PMG imagery to follow
                </p>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="eyebrow">People at the center</p>
                <h2>Strong programs begin with human connections.</h2>
                <p className="mt-5 text-muted">
                  A hospital, a care team, and a community. The story of a pain
                  program is the relationship between all three.
                </p>
                <Link
                  href="/for-providers/practice-model"
                  className="mt-7 font-semibold text-brand"
                >
                  Explore the care-team approach →
                </Link>
              </div>
            </div>
          </section>
        )}
      {page.slug === "our-partners" && preview && (
        <section className="container-shell pb-16">
          <p className="eyebrow mb-7 text-center">
            Partner logos from the approved concept · permissions to confirm
          </p>
          <PartnerLogos partners={seed.partners} />
        </section>
      )}
      {collection && (
        <ReviewCollection
          label={collection.label}
          items={reviewPages.filter((p) => p.kind === collection.kind)}
        />
      )}
      {related.length > 0 && (
        <section className="bg-mist">
          <div className="container-shell section-space">
            <p className="eyebrow">Continue exploring</p>
            <h2 className="mb-8">Your next question, answered.</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link className="card group" href={`/${p.slug}`} key={p.slug}>
                  <h3 className="group-hover:text-brand">{p.title}</h3>
                  <p className="mt-4 text-sm text-muted">{p.description}</p>
                  <span
                    className="mt-6 inline-block text-brand"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      {!utility && (
        <section className="bg-navy text-white">
          <div className="container-shell section-space flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2>
                {patient
                  ? "Find care close to your community."
                  : "Let’s talk about what comes next."}
              </h2>
              <p className="mt-4 text-[#c4d3df]">
                {patient
                  ? "Connect directly with a local clinic for appointments and care information."
                  : "Bring your questions. Start with a conversation about your goals."}
              </p>
            </div>
            <Link
              href={patient ? "/locations" : "/contact"}
              className="button shrink-0 bg-white text-navy"
            >
              {patient ? "Explore locations" : "Contact PMG"}
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
