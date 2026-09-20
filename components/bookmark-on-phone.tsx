"use client";

import { Bookmark } from "lucide-react";

import { useLocale } from "@/components/locale-provider";

export function BookmarkOnPhone() {
  const { copy } = useLocale();

  return (
    <aside className="mt-6 rounded-xl bg-card/95 p-4 text-left ring-1 ring-primary/15 backdrop-blur-md md:hidden">
      <p className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-primary uppercase">
        <Bookmark className="size-3.5" />
        {copy.bookmarkTitle}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground">{copy.bookmarkBody}</p>
      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <span className="font-medium text-foreground">iPhone:</span> {copy.bookmarkIphone}
        </li>
        <li>
          <span className="font-medium text-foreground">Android:</span> {copy.bookmarkAndroid}
        </li>
      </ul>
    </aside>
  );
}
