"use client";
import { useActionState } from "react";
import { submitInquiry } from "@/app/(site)/contact/actions";
import type { InquiryState } from "@/lib/inquiry-validation";
import { usStates } from "@/lib/us-states";

const initialState: InquiryState = { status: "idle", message: "" };

const fields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    autoComplete: "name",
    max: 100,
    required: true,
  },
  {
    name: "title",
    label: "Title",
    type: "text",
    autoComplete: "organization-title",
    max: 120,
    required: true,
  },
  {
    name: "organization",
    label: "Hospital or health system",
    type: "text",
    autoComplete: "organization",
    max: 200,
    required: true,
  },
  {
    name: "email",
    label: "Work email",
    type: "email",
    autoComplete: "email",
    max: 254,
    required: true,
  },
  {
    name: "phone",
    label: "Phone (optional)",
    type: "tel",
    autoComplete: "tel",
    max: 40,
    required: false,
  },
] as const;

// The Hospital Inquiry Form behind every Schedule a Call button.
export function ContactForm({
  enabled,
  startedAt,
  fallbackEmail,
}: {
  enabled: boolean;
  startedAt: number;
  fallbackEmail: string;
}) {
  const [state, action, pending] = useActionState(submitInquiry, initialState);
  if (!enabled)
    return (
      <div className="border-t border-line pt-8">
        <h2 className="text-xl">Online inquiries are opening soon.</h2>
        <p className="mt-4 text-sm text-muted">
          In the meantime, email{" "}
          <a className="text-brand underline" href={`mailto:${fallbackEmail}`}>
            {fallbackEmail}
          </a>{" "}
          to schedule a call.
        </p>
      </div>
    );
  if (state.status === "success")
    return (
      <div role="status" className="border-t border-line pt-8">
        <h2 className="text-2xl">Inquiry received</h2>
        <p className="mt-4">{state.message}</p>
      </div>
    );
  const error = (name: string) => state.errors?.[name]?.join(" ");
  const described = (name: string) =>
    error(name) ? `${name}-error` : undefined;
  return (
    <form action={action} className="card space-y-5">
      <h2 className="text-2xl">Schedule a call</h2>
      <p className="text-sm text-muted">
        Tell us about your hospital and we will set up a time to talk.
      </p>
      <p className="border-l-2 border-[#e7d6ac] bg-[#fbf6ea] px-4 py-3 text-sm text-[#6b4f10]">
        Please don&apos;t include patient or medical information in this form.
      </p>
      <fieldset disabled={pending} className="space-y-5 disabled:opacity-60">
        <legend className="sr-only">Your inquiry</legend>
        {fields.map((field) => (
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
              required={field.required}
              className="field"
              aria-invalid={Boolean(error(field.name))}
              aria-describedby={described(field.name)}
            />
            {error(field.name) && (
              <p
                id={`${field.name}-error`}
                className="mt-2 text-sm text-red-800"
              >
                {error(field.name)}
              </p>
            )}
          </div>
        ))}
        <div>
          <label htmlFor="state" className="text-sm font-medium">
            State
          </label>
          <select
            name="state"
            id="state"
            required
            defaultValue=""
            className="field"
            aria-invalid={Boolean(error("state"))}
            aria-describedby={described("state")}
          >
            <option value="" disabled>
              Choose a state
            </option>
            {usStates.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          {error("state") && (
            <p id="state-error" className="mt-2 text-sm text-red-800">
              {error("state")}
            </p>
          )}
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
            aria-invalid={Boolean(error("message"))}
            aria-describedby={described("message")}
          />
          {error("message") && (
            <p id="message-error" className="mt-2 text-sm text-red-800">
              {error("message")}
            </p>
          )}
        </div>
        {/* Spam protection: a field people never see, and when the form was served. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <input type="hidden" name="started_at" value={startedAt} />
        <button
          disabled={pending}
          className="button button-primary"
          type="submit"
        >
          {pending ? "Sending…" : "Send inquiry"}
        </button>
      </fieldset>
      <p role="status" aria-live="polite" className="text-sm text-red-800">
        {state.status === "error" ? state.message : ""}
      </p>
    </form>
  );
}
