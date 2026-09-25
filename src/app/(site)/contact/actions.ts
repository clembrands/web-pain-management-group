"use server";
import { inquirySchema, type InquiryState } from "@/lib/inquiry-validation";
import { deliverInquiry } from "@/lib/inquiry-delivery";
import { rateLimited } from "@/lib/rate-limit";

// People take more than a few seconds to fill in seven fields; scripts usually don't.
const MIN_FILL_MS = 3000;

export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  // Honeypot: hidden from people, so a value means a bot. Answer as if it worked.
  const startedAt = Number(formData.get("started_at"));
  if (
    formData.get("website") ||
    !startedAt ||
    Date.now() - startedAt < MIN_FILL_MS
  )
    return {
      status: "success",
      message:
        "Thank you. Your inquiry has been received by Pain Management Group.",
    };
  if (await rateLimited("inquiry", { limit: 5, windowMs: 10 * 60_000 }))
    return {
      status: "error",
      message:
        "Too many submissions from this connection. Please try again in a few minutes, or email us instead.",
    };
  const result = inquirySchema.safeParse(Object.fromEntries(formData));
  if (!result.success)
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: result.error.flatten().fieldErrors,
    };
  const delivery = await deliverInquiry(result.data);
  if (!delivery.saved && !delivery.emailed)
    return {
      status: "error",
      message:
        "Your inquiry couldn't be sent. Please try again, or email us at the address on this page.",
    };
  return {
    status: "success",
    message:
      "Thank you. Your inquiry has been received by Pain Management Group.",
  };
}
