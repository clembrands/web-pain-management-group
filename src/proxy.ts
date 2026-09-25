import { type NextRequest } from "next/server";
import { isGone } from "@/lib/redirects";

// Retired theme demo pages answer 410 Gone so search engines drop them quickly.
export function proxy(request: NextRequest) {
  if (!isGone(request.nextUrl.pathname)) return;
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>Page removed | Pain Management Group</title></head><body style="font-family:system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem"><h1>This page has been removed.</h1><p>It is no longer part of the Pain Management Group website.</p><p><a href="/">Go to the homepage</a> or <a href="/sitemap/">view the site map</a>.</p></body></html>`,
    {
      status: 410,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "x-robots-tag": "noindex",
      },
    },
  );
}

export const config = {
  matcher: [
    "/(blog-left-2column|blog-right-2column|blog-right-sidebar|em_team|home-one-page|home-video-page-2|portfolio|portfolio-3column|portfolio-full-3column|pricing-plan|sample-page|slider|type)/:path*",
  ],
};
