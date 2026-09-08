import Link from "next/link";
export default function NotFound() {
  return (
    <main className="container-shell py-24">
      <p className="eyebrow">404 · Page not found</p>
      <h1 className="text-4xl font-bold text-navy">
        Let&apos;s get you back on track.
      </h1>
      <p className="my-6 text-muted">
        This page may have moved, or the address may be incorrect.
      </p>
      <Link href="/" className="button button-primary">
        Return to the homepage
      </Link>
    </main>
  );
}
