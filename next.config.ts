import type { NextConfig } from "next";

// Static export: `npm run build` writes a self-contained site to /out
// that can be hosted on Vercel, Netlify or any static host.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
