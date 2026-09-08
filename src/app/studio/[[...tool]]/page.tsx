import type { Metadata } from "next";
import Link from "next/link";
import { isSanityConfigured } from "@/sanity/env";
import { Studio } from "./studio";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Content Studio",
  robots: { index: false, follow: false },
};
export default function StudioPage() {
  if (!isSanityConfigured)
    return (
      <main className="mx-auto max-w-2xl p-10">
        <h1 className="text-3xl font-bold">Connect the PMG content studio</h1>
        <p className="my-6">
          Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in
          .env.local, then restart the development server. See README.md for
          project, dataset, and seed instructions.
        </p>
        <Link href="/" className="underline">
          Return to the website
        </Link>
      </main>
    );
  return <Studio />;
}
