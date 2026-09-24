"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { headerNav, utilityNav } from "@/lib/navigation";
import { scheduleCallHref } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);
  const isCurrent = (href: string) =>
    pathname === href || pathname.startsWith(href);
  return (
    <header className="bg-navy text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4 focus:text-navy"
      >
        Skip to content
      </a>
      <div className="container-shell flex min-h-28 items-center justify-between gap-6">
        <Link
          href="/"
          onClick={close}
          aria-label="Pain Management Group home"
          className="shrink-0"
        >
          <Image
            src="/assets/pmg-logo.png"
            alt="Pain Management Group"
            width={330}
            height={38}
            className="h-auto w-56 brightness-0 invert md:w-72"
            priority
          />
        </Link>
        <nav
          aria-label="Main"
          className="hidden items-center gap-6 min-[1440px]:flex"
        >
          {headerNav.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`py-4 text-sm hover:text-white ${isCurrent(item.href) ? "text-white" : "text-[#c4d3df]"}`}
              >
                {item.label}
              </Link>
              {item.children.length > 0 && (
                <div className="invisible absolute top-full left-0 z-30 w-64 rounded-xl border border-line bg-white p-3 text-navy opacity-0 shadow-xl group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-3 py-2.5 text-sm hover:bg-mist"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href={scheduleCallHref}
            className="button button-primary px-5 text-xs"
          >
            Schedule a Call
          </Link>
        </nav>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-[#587186] px-4 py-2 min-[1440px]:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile"
          className="container-shell space-y-3 pb-7 min-[1440px]:hidden"
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
          }}
        >
          {headerNav.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                className="block py-3 font-medium"
              >
                {item.label}
              </Link>
              {/* The ten state pages are listed on the Our Partners hub; they would triple the
                  length of the collapsed menu. */}
              {(item.href === "/our-partners/" ? [] : item.children).map(
                (child) => (
                  <Link
                    href={child.href}
                    key={child.href}
                    onClick={close}
                    className="block border-l border-white/20 py-2 pl-4 text-sm text-[#c4d3df]"
                  >
                    {child.label}
                  </Link>
                ),
              )}
            </div>
          ))}
          <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/20 pt-4 text-sm text-[#c4d3df]">
            {utilityNav.map((i) => (
              <Link
                href={i.href}
                key={i.href}
                onClick={close}
                className="hover:text-white"
              >
                {i.label}
              </Link>
            ))}
          </div>
          <Link
            href={scheduleCallHref}
            onClick={close}
            className="button button-primary"
          >
            Schedule a Call
          </Link>
        </nav>
      )}
    </header>
  );
}
