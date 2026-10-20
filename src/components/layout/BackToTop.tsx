"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useLenis } from "./SmoothScroll";

export default function BackToTop() {
  const lenis = useLenis();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className="fixed bottom-6 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#15151f]/85 text-white shadow-lg backdrop-blur-md transition hover:border-cyan-300/50 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
    >
      <ArrowUp size={18} />
    </button>
  );
}
