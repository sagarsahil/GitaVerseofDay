import { TodayVerse } from "@/components/today-verse";

export default function Home() {
  return (
    <>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-16">
        <TodayVerse />
      </main>
      <footer className="px-4 pb-8 text-center text-xs leading-relaxed text-muted-foreground sm:px-6">
        Sanskrit is the traditional public-domain text of the Bhagavad Gita.
        English renderings are original paraphrases for this app.
      </footer>
    </>
  );
}
