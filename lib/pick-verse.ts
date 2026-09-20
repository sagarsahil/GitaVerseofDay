import type { GitaVerse } from "@/data/verses";

export const LAST_VERSE_STORAGE_KEY = "gita-verse-last-id";

export function verseId(verse: GitaVerse): string {
  return `${verse.chapter}.${verse.verse}`;
}

export function pickFreshVerse(
  verses: readonly GitaVerse[],
  lastId: string | null,
): GitaVerse {
  if (verses.length === 0) {
    throw new Error("The verse collection is empty.");
  }

  const pool =
    lastId && verses.length > 1
      ? verses.filter((verse) => verseId(verse) !== lastId)
      : verses;
  const choice = pool[Math.floor(Math.random() * pool.length)];
  if (!choice) {
    throw new Error("A verse could not be resolved.");
  }
  return choice;
}

export function readLastVerseId(): string | null {
  try {
    return window.localStorage.getItem(LAST_VERSE_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function writeLastVerseId(id: string): void {
  try {
    window.localStorage.setItem(LAST_VERSE_STORAGE_KEY, id);
  } catch {
    // Private mode or blocked storage should not break the page.
  }
}

export function formatDisplayDate(date: Date, locale: "en" | "hi" = "en"): string {
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function citation(verse: GitaVerse, locale: "en" | "hi" = "en"): string {
  if (locale === "hi") {
    return `भगवद्गीता ${verse.chapter}.${verse.verse}`;
  }
  return `Bhagavad Gita ${verse.chapter}.${verse.verse}`;
}
