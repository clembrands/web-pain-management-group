"use server";
import { reviewMode } from "@/content/review/pages";
import { inquirySchema, type InquiryState } from "@/lib/inquiry-validation";
import {
  getSubmissionsClient,
  submissionsReady,
} from "@/sanity/lib/submissions";
export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  if (reviewMode)
    return {
      status: "error",
      message: "This is a review site. Inquiries are not sent or saved.",
    };
  if (formData.get("website"))
    return {
      status: "error",
      message: "We couldn't send your inquiry. Please try again.",
    };
  const result = inquirySchema.safeParse(Object.fromEntries(formData));
  if (!result.success)
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      errors: result.error.flatten().fieldErrors,
    };
  try {
    const client = getSubmissionsClient();
    if (!client || !(await submissionsReady()))
      return {
        status: "error",
        message:
          "Online inquiries are temporarily unavailable. Please use the contact details on this page.",
      };
    await client.create({
      _type: "inquiry",
      ...result.data,
      createdAt: new Date().toISOString(),
    });
    return {
      status: "success",
      message:
        "Thank you. Your inquiry has been received by Pain Management Group.",
    };
  } catch {
    return {
      status: "error",
      message:
        "Your inquiry couldn't be saved. Please try again or use the contact details on this page.",
    };
  }
}
