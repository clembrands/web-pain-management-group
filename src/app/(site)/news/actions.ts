"use server";
import { z } from "zod";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { rateLimited } from "@/lib/rate-limit";

export type NewsletterState = {
  status: "idle" | "error" | "success";
  message: string;
};

const schema = z.object({ email: z.email().max(254) });

export async function signUpForNewsletter(
  _previous: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  // Honeypot: people never see this field, so anything in it came from a bot.
  if (formData.get("company_site"))
    return { status: "success", message: "Thank you for subscribing." };
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success)
    return { status: "error", message: "Enter a valid email address." };
  if (await rateLimited("newsletter", { limit: 5, windowMs: 10 * 60_000 }))
    return {
      status: "error",
      message: "Too many attempts. Please try again in a few minutes.",
    };
  const result = await subscribeToNewsletter(parsed.data.email);
  return result.ok
    ? { status: "success", message: "Thank you for subscribing." }
    : {
        status: "error",
        message:
          "Newsletter signup isn't available yet. Please check back soon.",
      };
}
