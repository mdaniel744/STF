import {
  buildLegacyPermalinkRedirects,
} from "./src/lib/i18n/permalinks.js";

const appBaseUrl = process.env.NEXT_PUBLIC_BASE44_APP_BASE_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.base44.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return buildLegacyPermalinkRedirects();
  },
  async rewrites() {
    if (!appBaseUrl) return [];
    return [
      {
        source: "/api/:path*",
        destination: `${appBaseUrl}/api/:path*`,
      },
      {
        source: "/functions/:path*",
        destination: `${appBaseUrl}/functions/:path*`,
      },
    ];
  },
};

export default nextConfig;
