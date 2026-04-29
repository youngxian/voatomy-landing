import type { NextConfig } from "next";

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3000";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: `${DASHBOARD_URL}/dashboard`,
        permanent: false,
      },
      {
        source: "/dashboard/:path*",
        destination: `${DASHBOARD_URL}/dashboard/:path*`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
