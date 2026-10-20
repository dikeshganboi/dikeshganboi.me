"use client";

import { BookOpenCheck, ExternalLink, Trophy } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCounter from "@/components/ui/StatCounter";

export default function Achievements() {
  const reducedMotion = useReducedMotion() ?? false;
  return (
    <section
      id="achievements"
      className="scroll-mt-24 overflow-x-clip border-b border-white/5 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading label="Achievements" title="Recognition and research" />
        </Reveal>
        <div className="relative mt-14 space-y-8 before:absolute before:bottom-0 before:left-3 before:top-0 before:w-px before:bg-gradient-to-b before:from-violet-400 before:via-cyan-300/50 before:to-transparent md:before:left-1/2">
          {portfolio.achievements.map((achievement, index) => {
            const Icon = index === 0 ? BookOpenCheck : Trophy;
            return (
              <Reveal key={achievement.title} delay={index * 0.12}>
                <motion.article
                  initial={reducedMotion ? false : { opacity: 0, x: index % 2 ? 35 : -35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  className={`relative pl-10 md:w-[calc(50%-2rem)] md:pl-0 ${
                    index % 2 ? "md:ml-auto md:pl-8" : "md:pr-8 md:text-right"
                  }`}
                >
                  <span className="absolute left-0 top-5 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-200/50 bg-[#11111a] text-cyan-200 shadow-[0_0_18px_rgba(34,211,238,0.35)] md:left-1/2">
                    <Icon size={14} />
                  </span>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 text-left backdrop-blur-sm sm:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                      {achievement.year}
                    </p>
                    <h3 className="mt-2 font-heading text-xl font-semibold text-white sm:text-2xl">
                      {achievement.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                      {achievement.description}
                    </p>
                    {achievement.ieeeUrl ? (
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-violet-300/30 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-200">
                          IEEE Xplore
                        </span>
                        <a
                          href={achievement.ieeeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-200 hover:text-cyan-100"
                        >
                          Read the paper <ExternalLink size={13} />
                        </a>
                      </div>
                    ) : null}
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-14 grid grid-cols-2 gap-5 border-t border-white/10 pt-7 sm:grid-cols-4">
          {portfolio.stats.map((stat) => (
            <StatCounter key={stat.label} stat={stat} reducedMotion={reducedMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}
