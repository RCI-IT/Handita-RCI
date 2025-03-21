import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["letsenhance.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
      },
    ],
  },
};

export default nextConfig;
