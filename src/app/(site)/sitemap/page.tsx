import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import {
  educationArticles,
  educationCategories,
} from "@/content/legacy/education";
import {
  contact,
  home,
  sections,
  utilityPages,
  type SiteRoute,
} from "@/lib/routes";
import { routeMetadata } from "@/lib/seo";

const path = "/sitemap/";
export const metadata = routeMetadata(path);

const label = (r: SiteRoute) => r.navLabel ?? r.title;

function Section({ route }: { route: SiteRoute }) {
  const isEducation = route.path === "/pain-education/";
  return (
    <section>
      <h2 className="text-xl">
        <Link href={route.path} className="hover:text-brand">
          {label(route)}
        </Link>
      </h2>
      {isEducation ? (
        // Pain Education is listed by category, the way the hub organizes it.
        educationCategories.map((category) => (
          <div key={category} className="mt-4">
            <h3 className="text-base">{category}</h3>
            <ul className="mt-2 space-y-1.5 text-sm">
              {educationArticles
                .filter((a) => a.category === category)
                .map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/pain-education/${a.slug}/`}
                      className="text-muted hover:text-brand"
                    >
                      {a.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))
      ) : (
        <ul className="mt-3 space-y-1.5 text-sm">
          {route.children?.map((child) => (
            <li key={child.path}>
              <Link href={child.path} className="text-muted hover:text-brand">
                {label(child)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// Human-readable site map, generated from the same route tree as sitemap.xml.
export default function SitemapPage() {
  return (
    <PageShell path={path}>
      <div className="container-shell grid gap-10 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        <section>
          <h2 className="text-xl">
            <Link href={home.path} className="hover:text-brand">
              Home
            </Link>
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm">
            {[contact, ...utilityPages].map((r) => (
              <li key={r.path}>
                <Link href={r.path} className="text-muted hover:text-brand">
                  {label(r)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        {sections.map((s) => (
          <Section key={s.path} route={s} />
        ))}
      </div>
    </PageShell>
  );
}
