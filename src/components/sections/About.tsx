"use client";

import Image from "next/image";
import { Hammer, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const principleIcons = { Build: Hammer, Test: ShieldCheck, Learn: Sparkles };

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 overflow-x-clip border-b border-white/5 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="absolute -inset-5 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.34),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.24),transparent_45%)] blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-2">
              <Image
                src={portfolio.images.avatar}
                alt={`${portfolio.name} profile photo`}
                fill
                sizes="(max-width: 1024px) 90vw, 35vw"
                className="rounded-[1.5rem] object-cover object-top"
              />
              <div className="absolute inset-2 rounded-[1.5rem] bg-gradient-to-t from-[#0a0a0f]/50 to-transparent" />
            </div>
            <div className="relative -mt-8 grid grid-cols-2 gap-3 px-2 sm:-mt-10 sm:grid-cols-4 sm:px-3">
              {portfolio.about.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-xl border border-white/10 bg-[#15151f]/85 p-3 shadow-xl backdrop-blur-md"
                >
                  <p className="text-[10px] uppercase tracking-wider text-white/40">
                    {fact.label}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs font-medium leading-4 text-white/85">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading
                label="About me"
                title="A builder who tests his own work"
              />
            </Reveal>
            <div className="mt-7 space-y-4">
              {portfolio.about.paragraphs.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 0.1}>
                  <p className="text-base leading-7 text-[var(--muted)] sm:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.25}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={portfolio.resumeUrl}
                  download
                  className="bg-accent-gradient inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  Download Resume
                </a>
                <a
                  href={portfolio.socials.ieeePaper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  IEEE Paper
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {portfolio.about.principles.map((principle, index) => {
            const Icon = principleIcons[principle.title as keyof typeof principleIcons];
            return (
              <Reveal key={principle.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-px"
                >
                  <div className="absolute inset-0 rounded-2xl bg-[var(--accent-gradient)] opacity-0 blur transition-opacity group-hover:opacity-30" />
                  <div className="relative h-full rounded-[calc(1rem-1px)] bg-[#11111a] p-6">
                    <Icon className="text-cyan-300" size={22} />
                    <h3 className="mt-5 font-heading text-xl font-semibold text-white">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      {principle.text}
                    </p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
