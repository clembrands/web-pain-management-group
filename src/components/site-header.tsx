"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  navigation,
  utilityNavigation,
  navigationChildren,
} from "@/lib/navigation";
export function SiteHeader({ schedulingUrl }: { schedulingUrl?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="bg-navy text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4 focus:text-navy"
      >
        Skip to content
      </a>
      <div className="border-b border-white/10">
        <nav
          aria-label="Utility navigation"
          className="container-shell flex flex-wrap justify-end gap-x-6 gap-y-2 py-3 text-xs text-[#c4d3df]"
        >
          {utilityNavigation.map((i) => (
            <Link
              href={i.href}
              key={i.href}
              onClick={() => setOpen(false)}
              className="hover:text-white"
            >
              {i.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="container-shell flex min-h-24 items-center justify-between gap-5">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="Pain Management Group home"
        >
          <Image
            src="/assets/pmg-logo.png"
            alt="Pain Management Group"
            width={220}
            height={44}
            className="h-auto w-44 brightness-0 invert"
            priority
          />
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 xl:flex"
        >
          {navigation.map((i) => (
            <div key={i.href} className="group relative">
              <Link
                href={i.href}
                aria-current={pathname === i.href ? "page" : undefined}
                className="py-4 text-[13px] text-[#c4d3df] hover:text-white aria-[current=page]:text-white"
              >
                {i.label}
              </Link>
              {navigationChildren[i.href] && (
                <div className="invisible absolute top-full left-0 z-30 w-64 rounded-xl border border-line bg-white p-3 text-navy opacity-0 shadow-xl group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {navigationChildren[i.href].map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-lg px-3 py-3 text-sm hover:bg-mist"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href={schedulingUrl || "/contact"}
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
          className="rounded-lg border border-[#587186] px-4 py-2 xl:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="container-shell space-y-3 pb-7 xl:hidden"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {navigation.map((i) => (
            <div key={i.href}>
              <Link
                href={i.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-medium"
              >
                {i.label}
              </Link>
              {navigationChildren[i.href]?.map((child) => (
                <Link
                  href={child.href}
                  key={child.href}
                  onClick={() => setOpen(false)}
                  className="block border-l border-white/20 py-2 pl-4 text-sm text-[#c4d3df]"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <Link
            href={schedulingUrl || "/contact"}
            onClick={() => setOpen(false)}
            className="button button-primary"
          >
            Schedule a Call
          </Link>
        </nav>
      )}
    </header>
  );
}
