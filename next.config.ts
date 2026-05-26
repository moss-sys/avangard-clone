import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/avangard-clone",
  env: { NEXT_PUBLIC_BASE_PATH: "/avangard-clone" },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
