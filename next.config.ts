import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  ...(process.env.PAGES_BUILD === "1" ? { output: "export" as const, trailingSlash: true, basePath: process.env.NEXT_PUBLIC_BASE_PATH || "" } : {}),
  turbopack: { root: process.cwd() },
};
export default config;
