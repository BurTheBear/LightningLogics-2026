import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: builds plain files into `out/` for Cloudflare Pages (.pages.dev)
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
