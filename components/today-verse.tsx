"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";

import { verses, type GitaVerse } from "@/data/verses";
import {
  citation,
  formatDisplayDate,
  pickFreshVerse,
  readLastVerseId,
  verseId,
  writeLastVerseId,
} from "@/lib/pick-verse";
import { BookmarkOnPhone } from "@/components/bookmark-on-phone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { LotusMark } from "@/components/lotus-mark";

type Status = "loading" | "ready" | "empty" | "error";

export function TodayVerse() {
  const [status, setStatus] = useState<Status>("loading");
  const [verse, setVerse] = useState<GitaVerse | null>(null);
  const [openedAt, setOpenedAt] = useState<Date | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        if (verses.length === 0) {
          setVerse(null);
          setStatus("empty");
          return;
        }
        const next = pickFreshVerse(verses, readLastVerseId());
        writeLastVerseId(verseId(next));
        setVerse(next);
        setOpenedAt(new Date());
        setStatus("ready");
      } catch {
        setVerse(null);
        setStatus("error");
      }
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (status === "loading") {
    return (
      <PageFrame>
        <VerseSkeleton />
      </PageFrame>
    );
  }

  if (status === "empty") {
    return (
      <PageFrame>
        <EmptyState />
      </PageFrame>
    );
  }

  if (status === "error" || !verse || !openedAt) {
    return (
      <PageFrame>
        <ErrorState />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <LoadedVerse verse={verse} openedAt={openedAt} />
    </PageFrame>
  );
}

function PageFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
      <header className="mb-8 flex flex-col items-center text-center sm:mb-10">
        <LotusMark className="mb-4 h-10 w-16" />
        <p className="text-xs font-medium tracking-[0.28em] text-primary uppercase">
          Gita Verse of the Day
        </p>
        <h1 className="font-heading mt-3 max-w-md text-3xl leading-tight text-balance text-foreground drop-shadow-[0_1px_18px_oklch(0.98_0.01_88)] sm:text-4xl">
          A verse from the Bhagavad Gita
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          Refresh for another of all 700 verses. Each one includes a note for
          today and a deeper meaning for ordinary life.
        </p>
      </header>
      {children}
      <BookmarkOnPhone />
    </div>
  );
}

function LoadedVerse({ verse, openedAt }: { verse: GitaVerse; openedAt: Date }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  async function copyVerse() {
    const text = [
      verse.sanskrit,
      "",
      verse.translation,
      "",
      `— ${citation(verse)}`,
      "",
      "For today",
      verse.relevance,
      "",
      "Deeper meaning",
      verse.meaning,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  }

  return (
    <Card className="border-none bg-card/95 shadow-[0_24px_60px_-28px_oklch(0.35_0.06_50/0.5)] ring-1 ring-primary/15 backdrop-blur-md">
      <CardHeader className="gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
              {formatDisplayDate(openedAt)}
            </p>
            <CardTitle className="mt-2 font-heading text-2xl">
              {citation(verse)}
            </CardTitle>
            <CardDescription>
              Chapter {verse.chapter}, verse {verse.verse}
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={copyVerse}
            className="self-start"
          >
            {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
            {copied ? "Copied" : "Copy verse"}
          </Button>
        </div>
        {copyError ? (
          <p className="text-sm text-destructive">
            The verse could not be copied. You can select the text instead.
          </p>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-xl bg-muted/70 px-4 py-6 sm:px-8">
          <p className="font-devanagari text-center text-xl leading-[1.9] text-foreground sm:text-2xl">
            {verse.sanskrit}
          </p>
        </div>
        <p className="font-verse text-xl leading-relaxed text-pretty text-foreground sm:text-2xl">
          {verse.translation}
        </p>
        <Separator />
        <VerseNote title="For today" body={verse.relevance} />
        <Separator />
        <VerseNote title="Deeper meaning" body={verse.meaning} />
        <Separator />
        <div>
          <h2 className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
            Context
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {verse.context}
          </p>
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground">
        A new verse on each refresh, from all {verses.length} verses of the
        Gita.
      </CardFooter>
    </Card>
  );
}

function VerseNote({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="text-xs font-medium tracking-[0.2em] text-primary uppercase">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-pretty text-foreground sm:text-base">
        {body}
      </p>
    </div>
  );
}

function VerseSkeleton() {
  return (
    <Card className="border-none bg-card/95 ring-1 ring-primary/15 backdrop-blur-md">
      <CardHeader className="gap-3">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-36" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 rounded-xl bg-muted/70 px-4 py-6">
          <Skeleton className="mx-auto h-6 w-11/12" />
          <Skeleton className="mx-auto h-6 w-10/12" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
        </div>
        <Skeleton className="h-px w-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-full" />
        </div>
        <Skeleton className="h-px w-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <Card className="border-none bg-card/95 ring-1 ring-primary/15 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="font-heading text-2xl">No verses yet</CardTitle>
        <CardDescription>
          The collection is empty, so there is nothing to show.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Add verses to <code className="font-mono text-foreground">data/verses.ts</code>{" "}
          and reload the page.
        </p>
      </CardContent>
    </Card>
  );
}

function ErrorState() {
  return (
    <Card className="border-none bg-card/95 ring-1 ring-primary/15 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="font-heading text-2xl">
          A verse could not be loaded
        </CardTitle>
        <CardDescription>
          Something went wrong while choosing a verse.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button type="button" size="lg" onClick={() => window.location.reload()}>
          <RotateCcw data-icon="inline-start" />
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}
