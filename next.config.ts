import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Dis à Next.js que toutes les URLs doivent commencer par /maelstrom
  basePath: '/maelstrom',
};

export default nextConfig;

