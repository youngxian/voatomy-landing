import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Voatomy — The AI Product Operating System",
    short_name: "Voatomy",
    description:
      "Replace gut-feel sprint estimation with AI that analyzes code complexity, team capacity, and business priority.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#12FF80",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
