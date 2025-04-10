import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["letsenhance.io"], // Allow external domains like letsenhance.io
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost", // Allow loading images from localhost using HTTPS
      },
      {
        protocol: "http",
        hostname: "localhost", // Allow loading images from localhost using HTTP
        port: "4000", // Specific port for localhost:4000
      },
      {
        protocol: "http",
        hostname: "192.168.110.253", // Allow loading images from this IP address
        port: "4000", // On port 4000
      },
    ],
  },
};

export default nextConfig;
