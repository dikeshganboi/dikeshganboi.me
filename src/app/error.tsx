"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => console.error(error), [error]);
  return (
    <main className="flex min-h-screen items-center justify-center px-5 text-center">
      <div>
        <p className="text-gradient font-heading text-5xl font-bold">Something went wrong</p>
        <p className="mt-3 text-white/55">Please try again or return home.</p>
        <div className="mt-7 flex justify-center gap-3">
          <button onClick={reset} className="rounded-full border border-white/15 px-5 py-3 text-sm text-white">Try again</button>
          <Link href="/" className="bg-accent-gradient rounded-full px-5 py-3 text-sm font-semibold text-white">Back home</Link>
        </div>
      </div>
    </main>
  );
}
