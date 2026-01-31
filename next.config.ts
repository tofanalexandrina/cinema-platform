import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // :TOFIX - Temporarily allowing all hostnames. Restrict to specific domains in production
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dud0oiww7/**',
      },
    ],
  },
};

export default nextConfig;
