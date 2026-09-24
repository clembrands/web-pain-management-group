"use client";
import { useActionState } from "react";
import {
  signUpForNewsletter,
  type NewsletterState,
} from "@/app/(site)/news/actions";

const initial: NewsletterState = { status: "idle", message: "" };

export function NewsletterForm({ ready }: { ready: boolean }) {
  const [state, action, pending] = useActionState(signUpForNewsletter, initial);
  return (
    <form
      action={action}
      className="rounded-[22px] border border-line bg-mist p-7"
    >
      <h2 className="text-2xl">Get PMG news by email</h2>
      <p className="mt-3 text-sm text-muted">
        {ready
          ? "Awards, partner news, and updates from Pain Management Group."
          : "Newsletter signup is coming soon."}
      </p>
      <fieldset
        disabled={!ready || pending}
        className="mt-5 flex flex-col gap-3 disabled:opacity-60 sm:flex-row"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="you@hospital.org"
          className="field mt-0 flex-1"
        />
        <div className="hidden" aria-hidden="true">
          <label htmlFor="company_site">Company website</label>
          <input
            id="company_site"
            name="company_site"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <button type="submit" className="button button-primary">
          {pending ? "Subscribing…" : "Subscribe"}
        </button>
      </fieldset>
      <p role="status" aria-live="polite" className="mt-3 text-sm">
        {state.message}
      </p>
    </form>
  );
}
