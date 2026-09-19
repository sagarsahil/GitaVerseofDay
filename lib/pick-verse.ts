import type { GitaVerse } from "@/data/verses";

/** 0-based day of year in the local calendar (Jan 1 = 0). */
export function localDayOfYear(date: Date): number {
  const start = Date.UTC(date.getFullYear(), 0, 1);
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((today - start) / 86_400_000);
}

export function pickVerseForDate(verses: readonly GitaVerse[], date: Date): GitaVerse {
  if (verses.length === 0) {
    throw new Error("The verse collection is empty.");
  }

  const index = localDayOfYear(date) % verses.length;
  const verse = verses[index];
  if (!verse) {
    throw new Error("Today's verse could not be resolved.");
  }
  return verse;
}

export function formatDisplayDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function citation(verse: GitaVerse): string {
  return `Bhagavad Gita ${verse.chapter}.${verse.verse}`;
}

export function getLocalIsoDate(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseLocalIsoDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

/** Re-render after local midnight so a long-lived tab can move to the next verse. */
export function subscribeToLocalDate(onStoreChange: () => void): () => void {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const id = window.setTimeout(onStoreChange, nextMidnight.getTime() - now.getTime() + 50);
  return () => window.clearTimeout(id);
}
