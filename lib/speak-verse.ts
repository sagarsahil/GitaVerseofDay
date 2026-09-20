function normalizeLang(lang: string): string {
  return lang.replace("_", "-").toLowerCase();
}

/** Slow enough to sound like a recitation, not a notification. */
export const CHANT_RATE = 0.68;
/** Slightly low, without forcing an English male voice. */
export const CHANT_PITCH = 0.92;
/** Breath between halves of a verse. */
export const CHANT_GAP_MS = 400;

const MALE_HINDI =
  /\b(hemant|hemanth|hindi male|हिन्दी पुरुष)\b|hi-in.*\b(standard-[bc]|wavenet-[bc]|neural2-[bc])\b/;

const NOVELTY_NAME =
  /\b(bad news|bahh|bells|boing|bubbles|cellos|good news|jester|junior|organ|superstar|trinoids|whisper|wobble|zarvox|grandma|grandpa|eddy|flo|sandy|shelley|rocko|reed)\b/;

export function pickChantVoice(
  voices: readonly SpeechSynthesisVoice[],
): SpeechSynthesisVoice | null {
  if (voices.length === 0) {
    return null;
  }

  const scored = voices.map((voice) => {
    const lang = normalizeLang(voice.lang);
    const name = voice.name.toLowerCase();
    let score = 0;

    if (NOVELTY_NAME.test(name)) {
      score -= 250;
    }
    if (lang.startsWith("sa")) {
      score += 120;
    }
    if (name.includes("sanskrit") || name.includes("संस्कृत")) {
      score += 110;
    }
    if (lang.startsWith("hi")) {
      score += 80;
    }
    if (name.includes("hindi") || name.includes("हिन्दी") || name.includes("हिंदी")) {
      score += 20;
    }
    if (lang.startsWith("hi") && (name.includes("google") || name.includes("neural"))) {
      score += 25;
    }
    if (lang.startsWith("hi") && MALE_HINDI.test(name)) {
      score += 40;
    }
    if (lang.startsWith("en-in")) {
      score += 8;
    }

    return { voice, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];
  return best && best.score > 0 ? best.voice : scored[0]?.voice ?? null;
}

export function prepareSanskritForSpeech(sanskrit: string): string[] {
  const prepared = sanskrit
    .replace(/श्रीभगवानुवाच/g, "श्री भगवान् उवाच। ")
    .replace(/श्री भगवानुवाच/g, "श्री भगवान् उवाच। ")
    .replace(/अर्जुनउवाच/g, "अर्जुन उवाच। ")
    .replace(/सञ्जयउवाच/g, "सञ्जय उवाच। ")
    .replace(/धृतराष्ट्रउवाच/g, "धृतराष्ट्र उवाच। ")
    .replace(/\s*\n+\s*/g, "। ")
    .replace(/\s+/g, " ")
    .trim();

  const chunks = prepared
    .split(/[।॥]+/)
    .map((part) => part.replace(/[.]/g, "").replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return chunks.length > 0 ? chunks : [prepared.replace(/[।॥.]/g, "").trim()].filter(Boolean);
}
