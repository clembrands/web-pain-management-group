import Image from "next/image";
import Link from "next/link";
import { primaryNav } from "@/lib/navigation";
import { contact, utilityPages } from "@/lib/routes";
import { organization, scheduleCallHref } from "@/lib/site";

export function SiteFooter() {
  const a = organization.address;
  return (
    <footer className="border-t border-line bg-mist">
      <div className="container-shell py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_3fr]">
          <div>
            <Link href="/" aria-label="Pain Management Group home">
              <Image
                src="/assets/pmg-logo.png"
                alt="Pain Management Group"
                width={210}
                height={42}
                className="h-auto w-48"
              />
            </Link>
            <p className="mt-4 text-sm text-muted">{organization.tagline}</p>
            <address className="mt-5 text-sm leading-relaxed not-italic text-muted">
              {a.street}
              <br />
              {a.city}, {a.region} {a.postalCode}
              <br />
              <a
                className="hover:text-brand"
                href={`tel:${organization.phone.replace(/[^\d]/g, "")}`}
              >
                {organization.phone}
              </a>
              <br />
              <a
                className="hover:text-brand"
                href={`mailto:${organization.email}`}
              >
                {organization.email}
              </a>
            </address>
            <Link
              href={scheduleCallHref}
              className="button button-primary mt-6"
            >
              Schedule a Call
            </Link>
          </div>
          <nav
            aria-label="Footer"
            className="grid gap-8 sm:grid-cols-2 md:grid-cols-4"
          >
            {primaryNav.map((section) => (
              <div key={section.href}>
                <Link
                  href={section.href}
                  className="text-sm font-semibold text-navy hover:text-brand"
                >
                  {section.label}
                </Link>
                {/* State pages are listed on the Our Partners hub and the site map; ten links would crowd the footer. */}
                {section.href !== "/our-partners/" &&
                  section.children.length > 0 && (
                    <ul className="mt-3 space-y-2 text-sm text-muted">
                      {section.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className="hover:text-brand">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            ))}
            <div>
              <Link
                href={contact.path}
                className="text-sm font-semibold text-navy hover:text-brand"
              >
                Contact
              </Link>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>
                  <Link href="/our-partners/" className="hover:text-brand">
                    Find a Clinic
                  </Link>
                </li>
                <li>
                  <a href={organization.sameAs[0]} className="hover:text-brand">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} {organization.name}. {a.city}, Ohio.
          </p>
          <nav aria-label="Legal and utility" className="flex flex-wrap gap-5">
            {utilityPages.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="hover:text-brand"
              >
                {page.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
