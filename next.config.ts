import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: Boolean(process.env.TYPED_ROUTES),
  images: {
    domains: ["images.ctfassets.net"],
    qualities: [80],
    // remotePatterns: [ new URL('https://images.ctfassets.net/**/**')]
  },
};

export default nextConfig;
