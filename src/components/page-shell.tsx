import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { EndCta } from "@/components/cta";
import { RichText } from "@/components/rich-text";
import type { Media } from "@/content/pages/partnership";
import { breadcrumbTrail, getRoute, type SiteRoute } from "@/lib/routes";
import { breadcrumbJsonLd } from "@/lib/seo";
import { scheduleCallHref } from "@/lib/site";

export function Breadcrumbs({
  path,
  current,
  tone = "light",
}: {
  path: string;
  current?: SiteRoute;
  tone?: "light" | "dark";
}) {
  const trail = breadcrumbTrail(path, current);
  const dark = tone === "dark";
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(path, current)} />
      <nav
        aria-label="Breadcrumb"
        className={
          dark
            ? "mb-12 text-xs text-[#b9c8d4]"
            : "container-shell pt-6 text-xs text-muted"
        }
      >
        <ol className="flex flex-wrap gap-x-2 gap-y-1">
          {trail.map((r, i) => (
            <li key={r.path} className="flex gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === trail.length - 1 ? (
                <span aria-current="page">{r.navLabel ?? r.title}</span>
              ) : (
                <Link
                  href={r.path}
                  className={dark ? "hover:text-white" : "hover:text-brand"}
                >
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

const primaryAction = {
  hospital: { label: "Schedule a Call", href: scheduleCallHref },
  provider: { label: "View Opportunities", href: "/providers/opportunities/" },
  patient: { label: "Find a Clinic", href: "/our-partners/" },
} as const;

// Interior page, following the layout of the review build: a navy hero with breadcrumbs,
// one H1, and an optional photo; then the page content, related links, and the closing
// CTA for the page's audience.
export function PageShell({
  path,
  route: routeOverride,
  eyebrow,
  lede,
  media,
  contentId,
  related = [],
  children,
}: {
  path: string;
  // For pages built from CMS records, which are not in the route registry.
  route?: SiteRoute;
  eyebrow?: string;
  lede?: string;
  media?: Media;
  // When set, the hero offers a jump link to the element with this id.
  contentId?: string;
  related?: string[];
  children?: React.ReactNode;
}) {
  const route = routeOverride ?? getRoute(path);
  const action =
    route.audience === "utility" ? undefined : primaryAction[route.audience];
  return (
    <>
      <section className="bg-navy text-white">
        <div className="container-shell pt-6 pb-16 md:pb-20">
          <Breadcrumbs path={path} current={routeOverride} tone="dark" />
          <div
            className={`grid items-center gap-10 ${media ? "lg:grid-cols-[1.1fr_.9fr]" : ""}`}
          >
            <div>
              <p className="eyebrow text-sky">
                {eyebrow ??
                  breadcrumbTrail(path, routeOverride).at(-2)?.navLabel ??
                  "PMG"}
              </p>
              <h1 className="max-w-4xl text-4xl leading-[1.15] font-bold tracking-tight md:text-5xl">
                {route.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base text-[#c4d3df] md:text-lg">
                <RichText text={lede ?? route.description} />
              </p>
              {(action || contentId) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {action && (
                    <Link href={action.href} className="button button-primary">
                      {action.label}
                    </Link>
                  )}
                  {contentId && (
                    <a
                      href={`#${contentId}`}
                      className="button button-dark-outline"
                    >
                      Explore this page ↓
                    </a>
                  )}
                </div>
              )}
            </div>
            {media && (
              <figure className="overflow-hidden rounded-[22px] bg-[#e8f0f5] text-navy">
                <div className="relative aspect-[1.3]">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    priority
                    sizes="(max-width:1023px) 100vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-5 py-3 text-xs leading-relaxed text-[#415b70]">
                  {media.caption}
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>
      {children}
      {related.length > 0 && <RelatedLinks paths={related} />}
      <EndCta audience={route.audience} />
    </>
  );
}

export function RelatedLinks({ paths }: { paths: string[] }) {
  return (
    <section className="bg-mist">
      <div className="container-shell section-space">
        <p className="eyebrow">Continue exploring</p>
        <h2 className="mb-8">Your next question, answered.</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {paths.map((p) => {
            const r = getRoute(p);
            return (
              <Link className="card group" href={r.path} key={r.path}>
                <h3 className="group-hover:text-brand">{r.title}</h3>
                <p className="mt-4 text-sm text-muted">{r.description}</p>
                <span
                  className="mt-6 inline-block text-brand"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
