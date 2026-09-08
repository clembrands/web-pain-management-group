"use client";
import { useActionState } from "react";
import { submitInquiry } from "@/app/(site)/contact/actions";
import type { InquiryState } from "@/lib/inquiry-validation";
const initialState: InquiryState = { status: "idle", message: "" };
export function ContactForm({ enabled }: { enabled: boolean }) {
  const [state, action, pending] = useActionState(submitInquiry, initialState);
  if (!enabled)
    return (
      <div className="rounded-2xl border border-line bg-mist p-8">
        <h2 className="text-xl">Online inquiries are opening soon.</h2>
        <p className="mt-4 text-sm text-muted">
          Please check back for our online inquiry form and current contact
          options.
        </p>
      </div>
    );
  if (state.status === "success")
    return (
      <div role="status" className="rounded-2xl border border-line bg-mist p-8">
        <h2 className="text-2xl">Inquiry received</h2>
        <p className="mt-4">{state.message}</p>
      </div>
    );
  return (
    <form action={action} className="card space-y-5">
      <h2 className="text-2xl">Start a conversation</h2>
      <p className="text-sm text-muted">
        For hospital partnerships and provider opportunities. Please do not
        include patient or medical information.
      </p>
      <fieldset disabled={pending} className="space-y-5 disabled:opacity-60">
        <legend className="sr-only">Your inquiry</legend>
        {[
          {
            name: "name",
            label: "Your name",
            type: "text",
            autoComplete: "name",
            max: 100,
          },
          {
            name: "email",
            label: "Work email",
            type: "email",
            autoComplete: "email",
            max: 254,
          },
          {
            name: "organization",
            label: "Organization",
            type: "text",
            autoComplete: "organization",
            max: 200,
          },
        ].map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              maxLength={field.max}
              required
              className="field"
              aria-invalid={Boolean(state.errors?.[field.name])}
              aria-describedby={
                state.errors?.[field.name] ? `${field.name}-error` : undefined
              }
            />
            {state.errors?.[field.name] && (
              <p
                id={`${field.name}-error`}
                className="mt-2 text-sm text-red-800"
              >
                {state.errors[field.name]?.join(" ")}
              </p>
            )}
          </div>
        ))}
        <div>
          <label htmlFor="interest" className="text-sm font-medium">
            I&apos;m interested in
          </label>
          <select name="interest" id="interest" required className="field">
            <option>Hospital partnership</option>
            <option>Provider opportunities</option>
            <option>General inquiry</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium">
            How can we help?
          </label>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={3000}
            rows={5}
            className="field"
            aria-invalid={Boolean(state.errors?.message)}
            aria-describedby={
              state.errors?.message ? "message-error" : undefined
            }
          />
          {state.errors?.message && (
            <p id="message-error" className="mt-2 text-sm text-red-800">
              {state.errors.message.join(" ")}
            </p>
          )}
        </div>
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <p className="text-xs text-muted">
          We use the information you provide to respond to this inquiry.
        </p>
        <button
          disabled={pending}
          className="button button-primary"
          type="submit"
        >
          {pending ? "Sending…" : "Send inquiry"}
        </button>
      </fieldset>
      <p role="status" aria-live="polite" className="text-sm text-red-800">
        {state.message}
      </p>
    </form>
  );
}
