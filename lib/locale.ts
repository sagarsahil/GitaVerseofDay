export type Locale = "en" | "hi";

export const LOCALE_STORAGE_KEY = "gita-verse-locale";

export type UiCopy = {
  kicker: string;
  title: string;
  intro: string;
  forToday: string;
  deeperMeaning: string;
  context: string;
  copyVerse: string;
  copied: string;
  copyError: string;
  listen: string;
  pause: string;
  resume: string;
  stop: string;
  listening: string;
  listenHint: string;
  listenUnsupported: string;
  listenError: string;
  chapterVerse: (chapter: number, verse: number) => string;
  citation: (chapter: number, verse: number) => string;
  cardFooter: (count: number) => string;
  siteFooter: string;
  bookmarkTitle: string;
  bookmarkBody: string;
  bookmarkIphone: string;
  bookmarkAndroid: string;
  emptyTitle: string;
  emptyDescription: string;
  emptyHint: string;
  errorTitle: string;
  errorDescription: string;
  tryAgain: string;
  languageGroup: string;
  english: string;
  hindi: string;
};

export const uiCopy: Record<Locale, UiCopy> = {
  en: {
    kicker: "Gita Verse of the Day",
    title: "A verse from the Bhagavad Gita",
    intro:
      "Refresh for another of all 700 verses. Each one includes a note for today and a deeper meaning for ordinary life.",
    forToday: "For today",
    deeperMeaning: "Deeper meaning",
    context: "Context",
    copyVerse: "Copy verse",
    copied: "Copied",
    copyError: "The verse could not be copied. You can select the text instead.",
    listen: "Listen",
    pause: "Pause",
    resume: "Resume",
    stop: "Stop",
    listening: "Listening",
    listenHint:
      "Spoken slowly from the Sanskrit, using a Hindi or Sanskrit voice on this device.",
    listenUnsupported: "This browser cannot speak the verse aloud.",
    listenError: "The verse could not be spoken. Try again, or check your sound.",
    chapterVerse: (chapter, verse) => `Chapter ${chapter}, verse ${verse}`,
    citation: (chapter, verse) => `Bhagavad Gita ${chapter}.${verse}`,
    cardFooter: (count) =>
      `A new verse on each refresh, from all ${count} verses of the Gita.`,
    siteFooter:
      "All 700 verses of the Gita. Sanskrit is public-domain text. English is this app’s own notes, or the 1935 public-domain translation of Shri Purohit Swami. Hindi is this app’s own rendering.",
    bookmarkTitle: "Bookmark on your phone",
    bookmarkBody: "Save this page to your Home Screen. Each tap opens a new verse.",
    bookmarkIphone: "tap Share, then Add to Home Screen.",
    bookmarkAndroid: "open the browser menu, then Add to Home screen.",
    emptyTitle: "No verses yet",
    emptyDescription: "The collection is empty, so there is nothing to show.",
    emptyHint: "Add verses to data/verses.ts and reload the page.",
    errorTitle: "A verse could not be loaded",
    errorDescription: "Something went wrong while choosing a verse.",
    tryAgain: "Try again",
    languageGroup: "Language",
    english: "English",
    hindi: "हिन्दी",
  },
  hi: {
    kicker: "आज का गीता श्लोक",
    title: "भगवद्गीता का एक श्लोक",
    intro:
      "पेज ताज़ा करें, और सातों सौ श्लोकों में से एक नया श्लोक आएगा। हर श्लोक के साथ आज के लिए एक छोटी बात और साधारण जीवन का अर्थ है।",
    forToday: "आज के लिए",
    deeperMeaning: "गहरा अर्थ",
    context: "संदर्भ",
    copyVerse: "श्लोक कॉपी करें",
    copied: "कॉपी हो गया",
    copyError: "श्लोक कॉपी नहीं हो सका। आप खुद चुनकर कॉपी कर सकते हैं।",
    listen: "सुनें",
    pause: "रोकें",
    resume: "जारी रखें",
    stop: "बंद करें",
    listening: "सुन रहे हैं",
    listenHint:
      "श्लोक संस्कृत में धीरे बोला जाता है। इस उपकरण की हिन्दी या संस्कृत आवाज़ चुनी जाती है।",
    listenUnsupported: "यह ब्राउज़र श्लोक को आवाज़ में नहीं पढ़ सकता।",
    listenError: "श्लोक बोला नहीं जा सका। फिर कोशिश करें, या आवाज़ जाँचें।",
    chapterVerse: (chapter, verse) => `अध्याय ${chapter}, श्लोक ${verse}`,
    citation: (chapter, verse) => `भगवद्गीता ${chapter}.${verse}`,
    cardFooter: (count) =>
      `हर बार ताज़ा करने पर नया श्लोक, गीता के सभी ${count} श्लोकों में से।`,
    siteFooter:
      "गीता के सभी ७०० श्लोक। संस्कृत सार्वजनिक संपत्ति है। अंग्रेज़ी इस ऐप की टिप्पणियाँ हैं, या श्री पुरोहित स्वामी का १९३५ का अनुवाद। हिन्दी इस ऐप का अपना रूपांतर है।",
    bookmarkTitle: "फ़ोन पर सहेजें",
    bookmarkBody: "इस पेज को होम स्क्रीन पर लगाएँ। हर बार खोलने पर नया श्लोक आएगा।",
    bookmarkIphone: "शेयर दबाएँ, फिर Add to Home Screen।",
    bookmarkAndroid: "ब्राउज़र मेनू खोलें, फिर Add to Home screen।",
    emptyTitle: "अभी कोई श्लोक नहीं",
    emptyDescription: "संग्रह खाली है, इसलिए दिखाने को कुछ नहीं है।",
    emptyHint: "data/verses.ts में श्लोक जोड़ें और पेज फिर से खोलें।",
    errorTitle: "श्लोक लोड नहीं हो सका",
    errorDescription: "श्लोक चुनते समय कुछ गड़बड़ हुई।",
    tryAgain: "फिर कोशिश करें",
    languageGroup: "भाषा",
    english: "English",
    hindi: "हिन्दी",
  },
};

export function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "hi";
}
