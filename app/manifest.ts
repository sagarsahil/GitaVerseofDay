import type { MetadataRoute } from "next";

import { basePath, withBasePath } from "@/lib/base-path";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gita Verse of the Day",
    short_name: "Gita Verse",
    description: "A Bhagavad Gita verse with a short reading for this moment.",
    start_url: `${basePath || ""}/`,
    scope: `${basePath || ""}/`,
    display: "standalone",
    background_color: "#F6EFE2",
    theme_color: "#7A3E1D",
    icons: [
      {
        src: withBasePath("/icon.svg"),
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
