import { TodayVerse } from "@/components/today-verse";

export default function Home() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-16">
        <TodayVerse />
      </main>
      <footer className="px-4 pb-8 text-center text-xs leading-relaxed text-muted-foreground drop-shadow-[0_1px_10px_oklch(0.98_0.01_88)] sm:px-6">
        All 700 verses of the Gita. Sanskrit is public-domain
        text. English is this app’s own notes, or the 1935 public-domain
        translation of Shri Purohit Swami.
      </footer>
    </>
  );
}
