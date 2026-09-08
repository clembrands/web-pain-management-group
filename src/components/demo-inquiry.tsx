"use client";
import { useState } from "react";
import { inquirySchema } from "@/lib/inquiry-validation";
export function DemoInquiry() {
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);
  if (done)
    return (
      <div className="card border-brand" role="status">
        <p className="eyebrow">Preview complete</p>
        <h2 className="text-2xl">This is how confirmation will appear.</h2>
        <p className="mt-5 text-muted">
          Your demo inquiry was not sent or saved. The live form will confirm
          receipt only after a successful submission.
        </p>
        <button
          className="button button-outline mt-7"
          onClick={() => {
            setDone(false);
            setMessage("");
          }}
        >
          Try the form again
        </button>
      </div>
    );
  return (
    <form
      className="card space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const parsed = inquirySchema.safeParse(data);
        if (!parsed.success) {
          setMessage(parsed.error.issues[0].message);
          return;
        }
        setDone(true);
      }}
    >
      <p className="eyebrow">Interactive preview · nothing is sent</p>
      <h2 className="text-2xl">Start a conversation</h2>
      <p className="text-sm text-muted">
        Try the inquiry experience using sample details. Do not enter patient or
        medical information.
      </p>
      {[
        { name: "name", label: "Your name", type: "text", max: 100 },
        { name: "email", label: "Work email", type: "email", max: 254 },
        { name: "organization", label: "Organization", type: "text", max: 200 },
      ].map((f) => (
        <div key={f.name}>
          <label htmlFor={`demo-${f.name}`} className="text-sm font-medium">
            {f.label}
          </label>
          <input
            id={`demo-${f.name}`}
            name={f.name}
            type={f.type}
            required
            maxLength={f.max}
            className="field"
          />
        </div>
      ))}
      <div>
        <label htmlFor="demo-interest" className="text-sm font-medium">
          I’m interested in
        </label>
        <select id="demo-interest" name="interest" className="field">
          <option>Hospital partnership</option>
          <option>Provider opportunities</option>
          <option>General inquiry</option>
        </select>
      </div>
      <div>
        <label htmlFor="demo-message" className="text-sm font-medium">
          How can we help?
        </label>
        <textarea
          id="demo-message"
          name="message"
          minLength={10}
          maxLength={3000}
          rows={4}
          required
          className="field"
        />
      </div>
      <button className="button button-primary" type="submit">
        Preview inquiry confirmation
      </button>
      <p role="status" className="text-sm text-red-800">
        {message}
      </p>
    </form>
  );
}
