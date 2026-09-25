import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { EndCta } from "@/components/cta";
import { RichText } from "@/components/rich-text";
import { heroImageFor } from "@/content/hero-images";
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
            ? "mb-14 text-xs text-[#8fa4b6]"
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

export type HeroLink = { label: string; href: string };

// The hero's second button: the next most useful page for the audience, skipping the page
// the reader is already on.
const secondaryOptions: Record<
  "hospital" | "provider" | "patient",
  HeroLink[]
> = {
  hospital: [
    { label: "What Hospital Leaders Ask", href: "/partnership/questions/" },
    { label: "See Results", href: "/results/" },
  ],
  provider: [
    { label: "Why Practice With PMG", href: "/providers/why-pmg/" },
    { label: "About PMG", href: "/about-us/" },
  ],
  patient: [{ label: "All Pain Education", href: "/pain-education/" }],
};

// Interior page in the site's design system: a deep navy hero with breadcrumbs, a small
// tracked label, one light display H1, the lede and two buttons, and an optional photograph
// in navy duotone dissolving into the background; then the page content, related links as
// a hairline grid, and the closing CTA for the page's audience.
export function PageShell({
  path,
  route: routeOverride,
  eyebrow,
  lede,
  media: mediaOverride,
  secondary: secondaryOverride,
  related = [],
  children,
}: {
  path: string;
  // For pages built from CMS records, which are not in the route registry.
  route?: SiteRoute;
  eyebrow?: string;
  lede?: string;
  media?: Media;
  // The hero's second button. Defaults to the audience's next page; null hides it.
  secondary?: HeroLink | null;
  related?: string[];
  children?: React.ReactNode;
}) {
  const route = routeOverride ?? getRoute(path);
  const media = mediaOverride ?? heroImageFor(path);
  const action =
    route.audience === "utility" ? undefined : primaryAction[route.audience];
  const secondary =
    secondaryOverride !== undefined
      ? secondaryOverride
      : route.audience === "utility"
        ? null
        : (secondaryOptions[route.audience].find((o) => o.href !== path) ??
          null);
  return (
    <>
      <section className="relative overflow-hidden bg-deep text-white">
        {media && (
          <figure className="duotone-wrap pointer-events-none absolute inset-0 md:left-[40%]">
            <Image
              src={media.src}
              alt=""
              fill
              priority
              sizes="(max-width: 767px) 100vw, 60vw"
              className="duotone object-cover object-[70%_center] opacity-40 md:opacity-80"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-r from-deep from-5% via-deep/60 via-40% to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-deep via-transparent to-transparent"
            />
            {/* Concept imagery is named for the launch check, not shown. */}
            <figcaption className="sr-only">{media.caption}</figcaption>
          </figure>
        )}
        <div className="container-shell relative pt-6 pb-16 md:pb-24">
          <Breadcrumbs path={path} current={routeOverride} tone="dark" />
          <div className="max-w-3xl">
            <p className="label text-sky">
              {eyebrow ??
                breadcrumbTrail(path, routeOverride).at(-2)?.navLabel ??
                "PMG"}
            </p>
            <h1 className="display-md display-sans mt-6">{route.title}</h1>
            <p className="mt-8 max-w-xl text-base text-[#c4d3df] md:text-lg">
              <RichText text={lede ?? route.description} />
            </p>
            {(action || secondary) && (
              <div className="mt-10 flex flex-wrap gap-3">
                {action && (
                  <Link href={action.href} className="button button-primary">
                    {action.label}
                  </Link>
                )}
                {secondary && (
                  <Link
                    href={secondary.href}
                    className="button button-dark-outline"
                  >
                    {secondary.label}
                  </Link>
                )}
              </div>
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

// Related pages as a hairline grid: label, light heading, description, arrow.
export function RelatedLinks({
  paths,
  eyebrow = "Continue exploring",
  title = "Your next question, answered.",
}: {
  paths: string[];
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="bg-mist">
      <div className="container-shell section-space">
        <p className="label text-brand">{eyebrow}</p>
        <h2 className="mt-4 mb-10">{title}</h2>
        <div className="grid divide-y divide-line border-t border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {paths.map((p) => {
            const r = getRoute(p);
            return (
              <Link
                className="group flex flex-col py-8 md:px-8 md:first:pl-0 md:last:pr-0"
                href={r.path}
                key={r.path}
              >
                <h3 className="text-xl font-medium text-navy group-hover:text-brand">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm text-muted">{r.description}</p>
                <span className="mt-auto pt-6 text-brand" aria-hidden="true">
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
