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
      }
    ]
  }
};

export default nextConfig;
