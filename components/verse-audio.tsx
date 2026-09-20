"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Square, Volume2 } from "lucide-react";

import { useLocale } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import {
  CHANT_GAP_MS,
  CHANT_PITCH,
  CHANT_RATE,
  pickChantVoice,
  prepareSanskritForSpeech,
} from "@/lib/speak-verse";

type PlayStatus = "idle" | "playing" | "paused" | "unsupported";

function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function VerseAudio({ sanskrit }: { sanskrit: string }) {
  const { copy } = useLocale();
  const [status, setStatus] = useState<PlayStatus>("idle");
  const [error, setError] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const chunksRef = useRef<string[]>([]);
  const indexRef = useRef(0);
  const runIdRef = useRef(0);
  const gapTimerRef = useRef<number | null>(null);
  const sanskritRef = useRef(sanskrit);
  sanskritRef.current = sanskrit;

  function clearGap() {
    if (gapTimerRef.current != null) {
      window.clearTimeout(gapTimerRef.current);
      gapTimerRef.current = null;
    }
  }

  function loadChunks() {
    chunksRef.current = prepareSanskritForSpeech(sanskritRef.current);
  }

  useEffect(() => {
    if (!canSpeak()) {
      return;
    }

    function readVoices() {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        voiceRef.current = pickChantVoice(voices);
        loadChunks();
      }
    }

    readVoices();
    window.speechSynthesis.addEventListener("voiceschanged", readVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", readVoices);
      clearGap();
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    runIdRef.current += 1;
    clearGap();
    if (canSpeak()) {
      window.speechSynthesis.cancel();
    }
    loadChunks();
    indexRef.current = 0;
  }, [sanskrit]);

  function speakFrom(index: number, runId: number) {
    if (runId !== runIdRef.current) {
      return;
    }
    const next = chunksRef.current[index];
    if (!next) {
      setStatus("idle");
      indexRef.current = 0;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(next);
    const voice = voiceRef.current;
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang || "hi-IN";
    } else {
      utterance.lang = "hi-IN";
    }
    utterance.rate = CHANT_RATE;
    utterance.pitch = CHANT_PITCH;
    utterance.volume = 1;
    utterance.onend = () => {
      if (runId !== runIdRef.current) {
        return;
      }
      indexRef.current = index + 1;
      if (!chunksRef.current[index + 1]) {
        setStatus("idle");
        indexRef.current = 0;
        return;
      }
      gapTimerRef.current = window.setTimeout(() => {
        gapTimerRef.current = null;
        speakFrom(index + 1, runId);
      }, CHANT_GAP_MS);
    };
    utterance.onerror = () => {
      if (runId !== runIdRef.current) {
        return;
      }
      setStatus("idle");
      setError(true);
    };
    window.speechSynthesis.speak(utterance);
    setStatus("playing");
    setError(false);
  }

  function play() {
    if (!canSpeak()) {
      setStatus("unsupported");
      return;
    }
    if (status === "paused") {
      setStatus("playing");
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        return;
      }
      speakFrom(indexRef.current, runIdRef.current);
      return;
    }
    clearGap();
    window.speechSynthesis.cancel();
    runIdRef.current += 1;
    loadChunks();
    indexRef.current = 0;
    speakFrom(0, runIdRef.current);
  }

  function pause() {
    clearGap();
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
    setStatus("paused");
  }

  function stop() {
    runIdRef.current += 1;
    clearGap();
    window.speechSynthesis.cancel();
    indexRef.current = 0;
    setStatus("idle");
  }

  if (status === "unsupported") {
    return <p className="text-sm text-muted-foreground">{copy.listenUnsupported}</p>;
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {status === "playing" ? (
          <Button type="button" variant="outline" size="lg" onClick={pause}>
            <Pause data-icon="inline-start" />
            {copy.pause}
          </Button>
        ) : (
          <Button type="button" variant="outline" size="lg" onClick={play}>
            {status === "paused" ? (
              <Play data-icon="inline-start" />
            ) : (
              <Volume2 data-icon="inline-start" />
            )}
            {status === "paused" ? copy.resume : copy.listen}
          </Button>
        )}
        {status !== "idle" ? (
          <Button type="button" variant="ghost" size="lg" onClick={stop}>
            <Square data-icon="inline-start" />
            {copy.stop}
          </Button>
        ) : null}
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {status === "playing" ? copy.listening : copy.listenHint}
      </p>
      {error ? <p className="text-sm text-destructive">{copy.listenError}</p> : null}
    </div>
  );
}
