import { z } from "zod";
import { usStates } from "./us-states.ts";

// The Hospital Inquiry Form (Schedule a Call). Phone is optional; everything else is required.
export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  title: z.string().trim().min(2, "Enter your title.").max(120),
  organization: z
    .string()
    .trim()
    .min(2, "Enter your hospital or health system.")
    .max(200),
  email: z.email("Enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine(
      (v) => v === "" || /^[\d\s()+.-]{7,}$/.test(v),
      "Enter a valid phone number.",
    )
    .optional()
    .transform((v) => v || undefined),
  state: z.enum(usStates, { error: "Choose your state." }),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail.")
    .max(3000),
});

export type Inquiry = z.infer<typeof inquirySchema>;

export type InquiryState = {
  status: "idle" | "error" | "success";
  message: string;
  errors?: Record<string, string[] | undefined>;
};
