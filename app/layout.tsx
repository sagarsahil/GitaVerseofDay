import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono, Noto_Serif_Devanagari } from "next/font/google";

import { SceneBackdrop } from "@/components/scene-backdrop";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const verse = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const devanagari = Noto_Serif_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari", "latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "Gita Verse of the Day",
  description:
    "A Bhagavad Gita verse with Sanskrit, English translation, and a short reading for this moment.",
  appleWebApp: {
    capable: true,
    title: "Gita Verse",
    statusBarStyle: "default",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${verse.variable} ${devanagari.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col">
        <SceneBackdrop />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
