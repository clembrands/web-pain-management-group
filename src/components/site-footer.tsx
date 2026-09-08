import Image from "next/image";
import Link from "next/link";
import type { Settings } from "@/content/types";
import { navigation, utilityNavigation } from "@/lib/navigation";
import { reviewMode } from "@/content/review/pages";
export function SiteFooter({ settings }: { settings: Settings }) {
  return (
    <footer className="border-t border-line">
      <div className="container-shell py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <Link href="/">
              <Image
                src="/assets/pmg-logo.png"
                alt={settings.title}
                width={210}
                height={42}
                className="h-auto w-48"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted">
              Balanced Pain Treatment Centers.
              <br />
              Responsible pain care that lasts.
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-7 gap-y-4 text-sm"
          >
            {[
              ...navigation,
              ...utilityNavigation,
              { href: "/careers", label: "Careers" },
              { href: "/privacy", label: "Privacy" },
              { href: "/accessibility", label: "Accessibility" },
              ...(reviewMode
                ? [{ href: "/review", label: "Review all pages" }]
                : []),
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} {settings.title}
          </p>
          <div className="flex flex-wrap gap-5">
            {settings.phone && (
              <a href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}>
                {settings.phone}
              </a>
            )}
            {settings.email && (
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
