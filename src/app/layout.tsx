import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { home } from "@/lib/routes";
import { organization } from "@/lib/site";
import { isIndexable, organizationJsonLd, pageTitle, siteUrl } from "@/lib/seo";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Display face: the light weights, loaded separately so only large headings pay for them.
const poppinsLight = Poppins({
  subsets: ["latin"],
  weight: ["200", "300"],
  style: ["normal", "italic"],
  variable: "--font-poppins-light",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageTitle(home),
    template: `%s | ${organization.name}`,
  },
  description: home.description,
  robots: { index: isIndexable, follow: isIndexable },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${poppinsLight.variable}`}>
      <Analytics />
      <body className="font-sans">
        <JsonLd data={organizationJsonLd()} />
        {children}
      </body>
    </html>
  );
}
