import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/vi/**", // Allow images from any video path
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
