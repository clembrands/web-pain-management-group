import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { EndCta } from "@/components/cta";
import { breadcrumbTrail, getRoute } from "@/lib/routes";
import { breadcrumbJsonLd } from "@/lib/seo";

export function Breadcrumbs({ path }: { path: string }) {
  const trail = breadcrumbTrail(path);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(path)} />
      <nav
        aria-label="Breadcrumb"
        className="container-shell pt-6 text-xs text-muted"
      >
        <ol className="flex flex-wrap gap-x-2 gap-y-1">
          {trail.map((r, i) => (
            <li key={r.path} className="flex gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === trail.length - 1 ? (
                <span aria-current="page">{r.navLabel ?? r.title}</span>
              ) : (
                <Link href={r.path} className="hover:text-brand">
                  {r.path === "/" ? "Home" : (r.navLabel ?? r.title)}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

// Standard interior page: breadcrumbs, one H1, content, and the audience's closing CTA.
export function PageShell({
  path,
  eyebrow,
  lede,
  children,
}: {
  path: string;
  eyebrow?: string;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  const route = getRoute(path);
  return (
    <>
      <Breadcrumbs path={path} />
      <header className="container-shell pt-8 pb-10 md:pt-12">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="max-w-4xl text-4xl leading-tight font-bold tracking-tight text-navy md:text-5xl">
          {route.title}
        </h1>
        {lede && (
          <div className="mt-5 max-w-3xl text-lg text-muted">{lede}</div>
        )}
      </header>
      {children}
      <EndCta audience={route.audience} />
    </>
  );
}
