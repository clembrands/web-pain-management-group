import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { getRoute } from "@/lib/routes";

// Stand-in for a Rev 2.0 page whose content arrives in a later build phase. It keeps every
// link in the navigation resolving and lists child pages, so nothing is more than two
// clicks from Home. Placeholders are noindex and excluded from sitemap.xml.
export function PlaceholderPage({ path }: { path: string }) {
  const route = getRoute(path);
  return (
    <PageShell path={path} lede={<p>{route.description}</p>}>
      <section className="container-shell pb-16">
        <p className="rounded-2xl border border-dashed border-[#aabcc9] bg-mist p-6 text-sm text-muted">
          Page content is scheduled for build phase {route.phase}.
        </p>
        {route.children && route.children.length > 0 && (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {route.children.map((child) => (
              <li key={child.path}>
                <Link
                  href={child.path}
                  className="card block h-full hover:border-brand"
                >
                  <span className="text-lg font-semibold text-navy">
                    {child.navLabel ?? child.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageShell>
  );
}
