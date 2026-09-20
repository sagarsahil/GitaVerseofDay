"use client";

import { useLocale } from "@/components/locale-provider";

export function SiteFooter() {
  const { copy } = useLocale();

  return (
    <footer className="px-4 pb-8 text-center text-xs leading-relaxed text-muted-foreground drop-shadow-[0_1px_10px_oklch(0.98_0.01_88)] sm:px-6">
      {copy.siteFooter}
    </footer>
  );
}
