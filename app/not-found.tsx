import Link from "next/link";

import { LotusMark } from "@/components/lotus-mark";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md rounded-2xl bg-card/95 px-6 py-10 ring-1 ring-primary/15 backdrop-blur-md sm:px-10">
        <LotusMark className="mb-4 h-10 w-16" />
        <p className="text-xs font-medium tracking-[0.28em] text-primary uppercase">
          Gita Verse of the Day
        </p>
        <h1 className="font-heading mt-3 text-3xl text-balance">This path is not on the field</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          The page you asked for is not part of this site. Today&apos;s verse is
          waiting on the home page.
        </p>
        <Link href="/" className={buttonVariants({ size: "lg", className: "mt-8" })}>
          Return to today&apos;s verse
        </Link>
      </div>
    </div>
  );
}
