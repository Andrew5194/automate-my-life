import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  output: 'standalone',

  // Optimize for production
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
