import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { isIndexable, siteUrl } from "@/lib/seo";
import "./globals.css";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pain Management Group | Hospital-based pain programs",
    template: "%s | Pain Management Group",
  },
  description:
    "Hospital-based pain management. PMG partners with hospitals to build and run sustainable pain programs.",
  robots: { index: isIndexable, follow: isIndexable },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
