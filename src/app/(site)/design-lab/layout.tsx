import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

// Working pages for design review only. Never indexed, not in the route registry or
// sitemap.xml; removed once a direction is applied to the site.
export const metadata: Metadata = {
  title: { absolute: "Design lab | Pain Management Group" },
  robots: { index: false, follow: false },
};

// Direction A's serif display face, loaded here so the rest of the site does not download
// it. Direction B's light Poppins now lives in the root layout.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export default function DesignLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${cormorant.variable} contents`}>{children}</div>;
}
