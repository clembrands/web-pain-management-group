"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="container-shell py-24">
      <h1 className="text-3xl font-bold">This page couldn&apos;t load.</h1>
      <p className="my-6 text-muted">Please try again in a moment.</p>
      <button onClick={reset} className="button button-primary">
        Try again
      </button>
    </div>
  );
}
