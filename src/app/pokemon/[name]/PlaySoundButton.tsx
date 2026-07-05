"use client";

import React from "react";

export default function PlaySoundButton({
  text,
  id,
  className,
}: {
  text: string;
  id?: number;
  className?: string;
}) {
  const playCry = async () => {
    if (typeof window === 'undefined') return;

    const name = text.toLowerCase();
    const proxyUrl = `/api/cry/${encodeURIComponent(name)}`;
    try {
      const audio = new Audio(proxyUrl);
      audio.crossOrigin = 'anonymous';
      await audio.play();
      return;
    } catch (e) {
      // fallback to TTS
    }

    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance();
      utter.text = text;
      utter.lang = 'en-US';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <button onClick={() => void playCry()} className={className}>
      Play Cry
    </button>
  );
}
