"use client";

import { m, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  className,
}: RevealProps) {
  const motionProps: MotionProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.55, delay, ease: "easeOut" },
  };

  return (
    <m.div className={className} {...motionProps}>
      {children}
    </m.div>
  );
}
