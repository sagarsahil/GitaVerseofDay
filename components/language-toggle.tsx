"use client";

import { useLocale } from "@/components/locale-provider";
import type { Locale } from "@/lib/locale";

export function LanguageToggle() {
  const { locale, setLocale, copy } = useLocale();

  return (
    <div
      role="radiogroup"
      aria-label={copy.languageGroup}
      className="inline-flex rounded-full bg-card/90 p-1 ring-1 ring-primary/20 backdrop-blur-md"
    >
      <LanguageOption
        label={copy.english}
        value="en"
        selected={locale === "en"}
        onSelect={setLocale}
      />
      <LanguageOption
        label={copy.hindi}
        value="hi"
        selected={locale === "hi"}
        onSelect={setLocale}
      />
    </div>
  );
}

function LanguageOption({
  label,
  value,
  selected,
  onSelect,
}: {
  label: string;
  value: Locale;
  selected: boolean;
  onSelect: (locale: Locale) => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(value)}
      className={
        selected
          ? "rounded-full bg-primary px-3.5 py-1.5 text-sm font-medium text-primary-foreground"
          : "rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      }
    >
      {label}
    </button>
  );
}
