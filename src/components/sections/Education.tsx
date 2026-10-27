"use client";

import { m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { GraduationCap } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";

export default function Education() {
  const reducedMotion = useReducedMotion() ?? false;
  return (
    <section id="education" className="scroll-mt-24 border-b-2 border-ink/20 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading label="Education" title="Where I studied" />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <div className="grid gap-8 border-2 border-ink bg-paper-2 p-6 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <GraduationCap className="text-accent" size={28} />
              <h3 className="mt-5 text-2xl font-bold text-ink sm:text-3xl">
                B.Tech in Information Technology
              </h3>
              <p className="mt-3 text-base text-ink">
                {portfolio.education.institution}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {portfolio.education.period}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {portfolio.education.coreSubjects.map((subject) => (
                  <span key={subject} className="border border-ink bg-paper px-3 py-1.5 font-mono text-xs text-ink">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
            <CgpaRing reducedMotion={reducedMotion} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function CgpaRing({ reducedMotion }: { reducedMotion: boolean }) {
  const [progress, setProgress] = useState(reducedMotion ? 81.1 : 0);
  const circumference = 2 * Math.PI * 48;
  useEffect(() => {
    if (reducedMotion) {
      setProgress(81.1);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const animate = (time: number) => {
      const value = Math.min((time - start) / 1000, 1);
      setProgress(81.1 * (1 - Math.pow(1 - value, 3)));
      if (value < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);
  return (
    <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
      <svg className="-rotate-90" width="160" height="160" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="48" fill="none" stroke="currentColor" strokeWidth="8" className="text-ink/20" />
        <m.circle
          cx="60" cy="60" r="48" fill="none" stroke="var(--accent)" strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress / 100)}
        />
      </svg>
      <div className="absolute text-center">
        <p className="font-heading text-2xl text-ink">8.11</p>
        <p className="font-mono text-xs text-ink-soft">/ 10 CGPA</p>
      </div>
    </div>
  );
}
