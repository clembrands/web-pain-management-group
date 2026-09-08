import Link from "next/link";
import { notFound } from "next/navigation";
import { reviewPages, reviewMode } from "@/content/review/pages";
export const metadata = {
  title: "Client review sitemap",
  robots: { index: false, follow: false },
};
export default function Review() {
  if (!reviewMode) notFound();
  return (
    <div className="container-shell section-space">
      <p className="eyebrow">PMG website review</p>
      <h1 className="text-4xl font-bold text-navy">
        A place for every conversation.
      </h1>
      <p className="mt-5 max-w-2xl text-muted">
        Explore the full site structure. All copy is for review; sample records
        are explicitly identified. Education pages reserve clinical explanations
        for reviewed content.
      </p>
      <div className="my-8 flex flex-wrap gap-3">
        <Link href="/" className="button button-primary">
          Homepage
        </Link>
        <Link href="/contact" className="button button-outline">
          Contact experience
        </Link>
      </div>
      {[
        "page",
        "story",
        "location",
        "resource",
        "person",
        "job",
        "education",
        "legal",
      ].map((kind) => (
        <section key={kind} className="mt-12">
          <h2 className="mb-5 capitalize">
            {kind === "page" ? "Core pages" : `${kind} pages`}
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {reviewPages
              .filter((p) => p.kind === kind)
              .map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="flex items-center justify-between gap-4 rounded-xl border border-line p-5 hover:bg-mist"
                >
                  <div>
                    <p className="font-semibold">{page.title}</p>
                    <p className="mt-1 text-xs text-muted">/{page.slug}</p>
                  </div>
                  <span className="text-brand">→</span>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
