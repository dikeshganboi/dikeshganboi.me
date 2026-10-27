"use client";

import Image from "next/image";
import { Hammer, ShieldCheck, Sparkles } from "lucide-react";
import { m } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";

const principleIcons = { Build: Hammer, Test: ShieldCheck, Learn: Sparkles };

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-24 overflow-x-clip border-b-2 border-ink/20 py-24 sm:py-32"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden border-2 border-ink bg-paper-2 p-2 hard-shadow">
              <Image
                src={portfolio.images.photo}
                alt={`${portfolio.name} profile photo`}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 90vw, 35vw"
                className="object-cover object-top"
              />
            </div>
            <div className="relative -mt-8 grid grid-cols-2 gap-3 px-2 sm:-mt-10 sm:grid-cols-4 sm:px-3">
              {portfolio.about.quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="border border-ink/30 bg-paper p-3"
                >
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                    {fact.label}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs font-medium leading-4 text-ink">
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
                  className="button-editorial inline-flex items-center bg-ink px-5 py-3 font-mono text-xs uppercase text-paper"
                >
                  Download Resume
                </a>
                <a
                  href={portfolio.socials.ieeePaper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-editorial inline-flex items-center bg-transparent px-5 py-3 font-mono text-xs uppercase"
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
                <m.div
                  whileHover={{ y: -5 }}
                  className="group relative h-full border-2 border-ink bg-paper-2 p-6"
                >
                  <div className="relative h-full">
                    <Icon className="text-accent" size={22} />
                    <h3 className="mt-5 font-heading text-xl text-ink">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">
                      {principle.text}
                    </p>
                  </div>
                </m.div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
