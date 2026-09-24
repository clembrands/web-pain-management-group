import "server-only";
import type { Inquiry } from "@/lib/inquiry-validation";
import {
  getSubmissionsClient,
  submissionsReady,
} from "@/sanity/lib/submissions";

// Where Hospital Inquiry Form submissions go. This is the one handler to change if PMG
// picks a different destination (brief §10, question 2). Default, both of:
//   1. Save to the private Sanity "submissions" dataset (read in Studio at /studio/submissions/).
//      Needs SANITY_API_WRITE_TOKEN and a private dataset; the handler refuses a public one.
//   2. Email a notification through Resend. Needs RESEND_API_KEY, INQUIRY_NOTIFY_TO (the
//      recipient; several addresses may be comma-separated), and INQUIRY_NOTIFY_FROM (a
//      sender on a domain verified in Resend).
// A submission counts as delivered if at least one destination accepts it.

const notifyTo = () =>
  (process.env.INQUIRY_NOTIFY_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const emailConfigured = () =>
  Boolean(
    process.env.RESEND_API_KEY &&
    process.env.INQUIRY_NOTIFY_FROM &&
    notifyTo().length,
  );

// When the form was served, for the minimum fill-time spam check. The contact page is
// rendered per request, so this is the time of that request.
export const formServedAt = () => Date.now();

// The form is offered only when at least one destination can accept a submission.
export async function inquiryDeliveryAvailable() {
  if (emailConfigured()) return true;
  return submissionsReady().catch(() => false);
}

export type DeliveryResult = { saved: boolean; emailed: boolean };

export async function deliverInquiry(
  inquiry: Inquiry,
): Promise<DeliveryResult> {
  const [saved, emailed] = await Promise.all([
    saveToSanity(inquiry),
    sendNotification(inquiry),
  ]);
  return { saved, emailed };
}

async function saveToSanity(inquiry: Inquiry) {
  try {
    const client = getSubmissionsClient();
    // Fail closed: never write inquiries to a dataset that is not private.
    if (!client || !(await submissionsReady())) return false;
    await client.create({
      _type: "inquiry",
      ...inquiry,
      createdAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error("Inquiry could not be saved to Sanity", error);
    return false;
  }
}

async function sendNotification(inquiry: Inquiry) {
  if (!emailConfigured()) return false;
  const lines = [
    `Name: ${inquiry.name}`,
    `Title: ${inquiry.title}`,
    `Hospital or health system: ${inquiry.organization}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone ?? "(not given)"}`,
    `State: ${inquiry.state}`,
    "",
    inquiry.message,
  ];
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.INQUIRY_NOTIFY_FROM,
        to: notifyTo(),
        reply_to: inquiry.email,
        subject: `Hospital inquiry: ${inquiry.organization} (${inquiry.state})`,
        text: lines.join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok)
      console.error("Inquiry email failed", res.status, await res.text());
    return res.ok;
  } catch (error) {
    console.error("Inquiry email failed", error);
    return false;
  }
}
