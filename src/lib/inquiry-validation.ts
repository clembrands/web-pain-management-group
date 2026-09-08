import { z } from "zod";
export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.email("Enter a valid email address.").max(254),
  organization: z.string().trim().min(2, "Enter your organization.").max(200),
  interest: z.enum([
    "Hospital partnership",
    "Provider opportunities",
    "General inquiry",
  ]),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail.")
    .max(3000),
});
export type InquiryState = {
  status: "idle" | "error" | "success";
  message: string;
  errors?: Record<string, string[] | undefined>;
};
