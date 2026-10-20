"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FloatingBadgeProps {
  children: string;
  className?: string;
  delay?: number;
}

export default function FloatingBadge({
  children,
  className = "",
  delay = 0,
}: FloatingBadgeProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white shadow-lg shadow-black/20 backdrop-blur-md sm:px-4 sm:text-sm ${className}`}
      animate={reducedMotion ? undefined : { y: [0, -9, 0] }}
      transition={
        reducedMotion
          ? undefined
          : { duration: 4, delay, repeat: Infinity, ease: "easeInOut" }
      }
    >
      {children}
    </motion.div>
  );
}
