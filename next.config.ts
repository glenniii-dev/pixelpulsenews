import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dzoxjkfkahmyylvgiibw.supabase.co'
      },
      {
        protocol: 'https',
        hostname: 'cdn.glitch.global' 
      },
      {
        protocol: 'https',
        hostname: 'e6ff5a2326b3b7dc48a6037d926dabdc.r2.cloudflarestorage.com'
      }
    ]
  }
};

export default nextConfig;
