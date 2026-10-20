"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -20, y: -20 });
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    const move = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setHovering(Boolean((event.target as HTMLElement).closest("a,button")));
    };
    window.addEventListener("mousemove", move);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
      window.removeEventListener("mousemove", move);
    };
  }, []);
  if (!enabled) return null;
  return (
    <>
      <span className={`custom-cursor-dot ${hovering ? "custom-cursor-dot-hover" : ""}`} style={{ left: position.x, top: position.y }} />
      <span className={`custom-cursor-ring ${hovering ? "custom-cursor-ring-hover" : ""}`} style={{ left: position.x, top: position.y }} />
    </>
  );
}
