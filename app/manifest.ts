import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tone Chan's Adventures",
    short_name: "Tone Chan",
    description:
      "A retro Game Boy Advance-inspired action adventure and browser demo.",
    start_url: "/",
    scope: "/",
    id: "/",
    display: "standalone",
    background_color: "#0f1022",
    theme_color: "#f6d76a",
    orientation: "portrait-primary",
    categories: ["games", "entertainment", "music"],
    prefer_related_applications: false,
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}