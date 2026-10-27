"use client";

import { ExternalLink } from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";

export default function Achievements() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="achievements"
      className="scroll-mt-24 border-b-2 border-ink/20 py-24 sm:py-32"
    >
      <Container>
        <Reveal>
          <SectionHeading label="Achievements" title="Recognition and research" />
        </Reveal>
        <div className="mt-14 border-t-2 border-ink">
          {portfolio.achievements.map((achievement, index) => (
            <m.article
              key={achievement.title}
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.1 }}
              className="grid gap-6 border-b-2 border-ink py-7 md:grid-cols-12 md:gap-4"
            >
              <div className="flex gap-5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent md:col-span-2 md:block">
                <span>ACH-{String(index + 1).padStart(3, "0")}</span>
                <span>{achievement.year}</span>
              </div>
              <div className="md:col-span-7">
                <h3 className="text-2xl font-semibold text-ink sm:text-3xl">
                  {achievement.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-soft sm:text-base">
                  {achievement.description}
                </p>
                <span className="mt-5 inline-flex border border-ink px-3 py-1 font-mono text-xs font-bold uppercase text-ink">
                  {achievement.ieeeUrl ? "IEEE Xplore" : "1st - Institute Level"}
                </span>
              </div>
              <div className="flex items-start md:col-span-3 md:justify-end">
                {achievement.ieeeUrl ? (
                  <a
                    href={achievement.ieeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs font-bold uppercase text-ink underline underline-offset-4 hover:text-accent"
                  >
                    Read the paper <ExternalLink size={13} />
                  </a>
                ) : null}
              </div>
            </m.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
