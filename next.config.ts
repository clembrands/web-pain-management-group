import type { NextConfig } from "next";
const config: NextConfig = {
  turbopack: { root: process.cwd() },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  poweredByHeader: false,
};
export default config;
