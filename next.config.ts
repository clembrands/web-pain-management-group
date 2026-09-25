import type { NextConfig } from "next";
import { redirects } from "./src/lib/redirects";

const config: NextConfig = {
  turbopack: { root: process.cwd() },
  // The live WordPress site serves every URL with a trailing slash. Keep that format.
  trailingSlash: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  poweredByHeader: false,
  async redirects() {
    return redirects.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};
export default config;
