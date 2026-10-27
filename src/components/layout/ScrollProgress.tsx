"use client";

import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
      style={{ scaleX: reducedMotion ? scrollYProgress : progress }}
    />
  );
}
