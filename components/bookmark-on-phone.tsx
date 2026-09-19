import { Bookmark } from "lucide-react";

export function BookmarkOnPhone() {
  return (
    <aside className="mt-6 rounded-xl bg-card/95 p-4 text-left ring-1 ring-primary/15 backdrop-blur-md md:hidden">
      <p className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-primary uppercase">
        <Bookmark className="size-3.5" />
        Bookmark on your phone
      </p>
      <p className="mt-2 text-sm leading-relaxed text-foreground">
        Save this page to your Home Screen. Each tap opens a new verse.
      </p>
      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
        <li>
          <span className="font-medium text-foreground">iPhone:</span> tap Share,
          then Add to Home Screen.
        </li>
        <li>
          <span className="font-medium text-foreground">Android:</span> open the
          browser menu, then Add to Home screen.
        </li>
      </ul>
    </aside>
  );
}
