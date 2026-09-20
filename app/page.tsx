import { LocaleProvider } from "@/components/locale-provider";
import { SiteFooter } from "@/components/site-footer";
import { TodayVerse } from "@/components/today-verse";

export default function Home() {
  return (
    <LocaleProvider>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-16">
        <TodayVerse />
      </main>
      <SiteFooter />
    </LocaleProvider>
  );
}
