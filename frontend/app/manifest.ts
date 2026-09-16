import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ChunkDoc",
    short_name: "ChunkDoc",
    description: "AI document analysis for medical students",
    start_url: "/",
    display: "standalone",
    background_color: "#12030A",
    theme_color: "#12030A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
