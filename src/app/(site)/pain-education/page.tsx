import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import {
  educationArticles,
  educationCategories,
} from "@/content/legacy/education";
import { hubIntro } from "@/content/pages/education";
import { routeMetadata } from "@/lib/seo";

const path = "/pain-education/";
export const metadata = routeMetadata(path);

const intro = {
  Conditions: "Pain conditions, explained for patients and families.",
  Procedures:
    "Interventional pain procedures, explained for patients and families.",
  Medications: "Opioids and chronic pain, explained for patients and families.",
};

// The live library, grouped the way its hub groups it. Superion, live but missing from
// the old hub, is listed under Procedures.
export default function PainEducationPage() {
  return (
    <PageShell path={path} eyebrow="For patients and families" lede={hubIntro}>
      <nav aria-label="Categories" className="container-shell pt-12">
        <ul className="flex flex-wrap gap-8 border-t border-line pt-6">
          {educationCategories.map((c) => (
            <li key={c}>
              <a
                href={`#${c.toLowerCase()}`}
                className="label block border-b border-transparent pb-1 text-navy hover:border-brand hover:text-brand"
              >
                {c}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {educationCategories.map((category) => (
        <section
          key={category}
          id={category.toLowerCase()}
          className="container-shell scroll-mt-4 pt-12"
        >
          <h2>{category}</h2>
          <p className="mt-3 text-muted">{intro[category]}</p>
          <ul className="mt-8 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {educationArticles
              .filter((a) => a.category === category)
              .map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/pain-education/${a.slug}/`}
                    className="block h-full border-b border-line py-4 pr-6 font-medium text-navy hover:text-brand"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
      <div className="pb-20" />
    </PageShell>
  );
}
