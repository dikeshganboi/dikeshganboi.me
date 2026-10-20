"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="bg-accent-gradient fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
      style={{ scaleX: reducedMotion ? scrollYProgress : progress }}
    />
  );
}
