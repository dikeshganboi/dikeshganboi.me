"use client";

import { useEffect, useState } from "react";

export default function IntroCurtain() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("portfolio-intro-seen")) return;
    setVisible(true);
    sessionStorage.setItem("portfolio-intro-seen", "true");
    const timer = window.setTimeout(() => setVisible(false), 650);
    return () => window.clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return <div aria-hidden="true" className="intro-curtain fixed inset-0 z-[70] bg-[#0a0a0f]" />;
}
