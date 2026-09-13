import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  headers: async () => [
    {
      // EmulatorJS needs this only on the actual play route, not on the whole app.
      source: "/play",
      headers: [
        { key: "Cross-Origin-Opener-Policy",   value: "same-origin" },
        { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
      ],
    },
    {
      source: "/play/:path*",
      headers: [
        { key: "Cross-Origin-Opener-Policy",   value: "same-origin" },
        { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
      ],
    },
    {
      // Allow the ROM files to be fetched by the emulator runtime.
      source: "/roms/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
      ],
    },
  ],
};

export default nextConfig;
