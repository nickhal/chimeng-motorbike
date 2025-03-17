import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com"],
    // Alternative approach:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: '*.public.blob.vercel-storage.com',
    //     port: '',
    //     pathname: '**',
    //   },
    // ],
  },
};

export default nextConfig;
