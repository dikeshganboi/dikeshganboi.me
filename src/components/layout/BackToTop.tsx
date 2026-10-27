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
      className="button-editorial fixed bottom-6 right-5 z-40 inline-flex h-11 w-11 items-center justify-center bg-paper text-ink hover:bg-paper-2"
    >
      <ArrowUp size={18} />
    </button>
  );
}
