import type { Metadata } from "next";
import { Cormorant_Garamond, Poppins } from "next/font/google";

// Working pages for design review only. Never indexed, not in the route registry or
// sitemap.xml; removed once a direction is applied to the site.
export const metadata: Metadata = {
  title: { absolute: "Design lab | Pain Management Group" },
  robots: { index: false, follow: false },
};

// Display faces for the two directions. Loaded here so the rest of the site does not
// download them; the chosen one moves to the root layout when its direction is applied.
// Cormorant Garamond echoes the serif wordmark in PMG's logo (Direction A); the light
// Poppins weight is Direction B's display face.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const poppinsLight = Poppins({
  subsets: ["latin"],
  weight: ["200", "300"],
  variable: "--font-poppins-light",
  display: "swap",
});

export default function DesignLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${cormorant.variable} ${poppinsLight.variable} contents`}>
      {children}
    </div>
  );
}
