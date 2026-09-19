import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono, Noto_Serif_Devanagari } from "next/font/google";

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
    "A daily Bhagavad Gita verse with Sanskrit, English translation, citation, and a short context.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${verse.variable} ${devanagari.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_-10%,oklch(0.86_0.06_70/0.55),transparent_58%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[radial-gradient(800px_circle_at_50%_120%,oklch(0.72_0.08_48/0.18),transparent_70%)]"
        />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
