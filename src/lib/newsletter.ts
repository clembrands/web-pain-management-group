import "server-only";

export type NewsletterResult =
  { ok: true } | { ok: false; reason: "not-configured" | "failed" };

// The newsletter provider is not chosen yet (brief §10, question 4). This is the only
// function to change when it is: subscribe the address with the provider's API, and set
// newsletterReady to true so the signup form turns on.
export const newsletterReady = false;

export async function subscribeToNewsletter(
  email: string,
): Promise<NewsletterResult> {
  void email;
  return { ok: false, reason: "not-configured" };
}
