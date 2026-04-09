import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Dis à Next.js que toutes les URLs doivent commencer par /maelstrom
  basePath: '/maelstrom',

  // Optionnel mais conseillé si tu as des images dans /public
  assetPrefix: '/maelstrom',
};

export default nextConfig;

