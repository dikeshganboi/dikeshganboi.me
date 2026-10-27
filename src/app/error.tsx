"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return (
    <main className="flex min-h-screen items-center justify-center px-5 text-center">
      <div>
        <p className="font-heading text-5xl text-ink">Something went wrong</p>
        <p className="mt-3 text-ink-soft">Please try again or return home.</p>
        <div className="mt-7 flex justify-center gap-3">
          <button onClick={reset} className="button-editorial px-5 py-3 font-mono text-xs uppercase">Try again</button>
          <Link href="/" className="button-editorial bg-accent px-5 py-3 font-mono text-xs uppercase text-accent-ink">Back home</Link>
        </div>
      </div>
    </main>
  );
}
