import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // One canonical host. Vercel serves both www and the apex; without this the
  // site exists twice and search engines split signals between the copies.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.evaratech.com" }],
        destination: "https://evaratech.com/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
