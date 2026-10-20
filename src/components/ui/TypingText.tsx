"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  phrases: string[];
  reducedMotion?: boolean;
}

export default function TypingText({
  phrases,
  reducedMotion = false,
}: TypingTextProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState(phrases[0] ?? "");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion || phrases.length < 2) {
      setText(phrases[0] ?? "");
      return;
    }

    const phrase = phrases[phraseIndex] ?? "";
    const isComplete = text === phrase;
    const delay = isComplete && !isDeleting ? 1700 : isDeleting ? 45 : 85;
    const timeout = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true);
      } else if (!isDeleting && text.length < phrase.length) {
        setText(phrase.slice(0, text.length + 1));
      } else if (isDeleting && text.length > 0) {
        setText(text.slice(0, -1));
      } else {
        setPhraseIndex((current) => (current + 1) % phrases.length);
        setIsDeleting(false);
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [isDeleting, phraseIndex, phrases, reducedMotion, text]);

  return (
    <span className="inline-flex min-h-[1.5em] items-center text-cyan-300">
      {text}
      {!reducedMotion && (
        <span className="ml-1 inline-block h-[1.1em] w-px animate-pulse bg-cyan-300" />
      )}
    </span>
  );
}
