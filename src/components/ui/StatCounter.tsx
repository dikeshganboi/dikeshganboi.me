"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/data/portfolio";

interface StatCounterProps {
  stat: Stat;
  reducedMotion?: boolean;
}

export default function StatCounter({
  stat,
  reducedMotion = false,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(reducedMotion);
  const isNumeric = typeof stat.value === "number";
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setHasEntered(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!hasEntered || !isNumeric || reducedMotion) {
      if (hasEntered && isNumeric) setCount(stat.value as number);
      return;
    }

    const target = stat.value as number;
    const start = performance.now();
    const duration = 1100;
    let animationFrame = 0;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasEntered, isNumeric, reducedMotion, stat.value]);

  return (
    <div ref={ref} className="min-w-0">
      <p className="font-heading text-2xl font-bold text-white sm:text-3xl">
        {isNumeric ? count : stat.value}
        {stat.label === "Projects Built" && "+"}
      </p>
      <p className="mt-1 text-xs leading-tight text-[var(--muted)] sm:text-sm">
        {stat.label}
      </p>
    </div>
  );
}
