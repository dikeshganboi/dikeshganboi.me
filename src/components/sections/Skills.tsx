"use client";

import {
  BrainCircuit,
  Code2,
  Database,
  GitBranch,
  Layers3,
  Server,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { m, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaJava,
} from "react-icons/fa";
import {
  SiCss,
  SiDjango,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiPostman,
  SiReact,
  SiRender,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { portfolio, type Skill } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";

const skillIcons: Record<string, IconType> = {
  FaJava,
  SiCss,
  SiDjango,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiPostman,
  SiReact,
  SiRender,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
};

const groupIcons = {
  Languages: Code2,
  Frontend: Layers3,
  Backend: Server,
  Databases: Database,
  Testing: ShieldCheck,
  Tools: Wrench,
  Concepts: GitBranch,
  "AI / NLP": BrainCircuit,
};

export default function Skills() {
  const marqueeSkills = Object.values(portfolio.skills).flat();
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [marqueeVisible, setMarqueeVisible] = useState(false);

  useEffect(() => {
    const element = marqueeRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setMarqueeVisible(entry.isIntersecting);
    }, { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      className="scroll-mt-24 overflow-x-clip border-b-2 border-ink/20 py-24 sm:py-32"
    >
      <Container>
        <Reveal>
          <SectionHeading
            label="Skills"
            title="Tools I build and test with"
            subtitle="A practical toolkit spanning product development, quality checks, and problem-solving fundamentals."
          />
        </Reveal>

        <div ref={marqueeRef} className={`skills-marquee relative mt-12 ${marqueeVisible ? "is-visible" : ""}`}>
          <div className="skills-marquee-track space-y-3" aria-hidden="true">
            <SkillMarquee skills={marqueeSkills} reverse={false} />
            <SkillMarquee skills={[...marqueeSkills].reverse()} reverse />
          </div>
          <ul className="sr-only">
            {marqueeSkills.map((skill) => <li key={`accessible-${skill.name}`}>{skill.name}</li>)}
          </ul>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(portfolio.skills).map(([group, skills], index) => (
            <SkillGroupCard
              key={group}
              group={group}
              skills={skills}
              index={index}
              className={group === "AI / NLP" ? "lg:col-span-2" : undefined}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function SkillMarquee({
  skills,
  reverse,
}: {
  skills: Skill[];
  reverse: boolean;
}) {
  const items = [...skills, ...skills];
  return (
    <div className={`flex w-max gap-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
      {items.map((skill, index) => (
        <SkillChip key={`${skill.name}-${index}`} skill={skill} marquee />
      ))}
    </div>
  );
}

function SkillGroupCard({
  group,
  skills,
  index,
  className,
}: {
  group: string;
  skills: Skill[];
  index: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion() ?? false;
  const GroupIcon = groupIcons[group as keyof typeof groupIcons];

  return (
    <Reveal delay={index * 0.06} className={className}>
      <m.div
        whileHover={reducedMotion ? undefined : { y: -4 }}
        className="group relative h-full overflow-hidden border-2 border-ink bg-paper-2 p-6"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "var(--paper-2)" }}
        />
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="border border-ink bg-paper p-2 text-ink">
              <GroupIcon size={19} />
            </span>
            <h3 className="text-xl font-semibold text-ink">{group}</h3>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {skills.map((skill, skillIndex) => (
              <m.div
                key={skill.name}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: reducedMotion ? 0 : skillIndex * 0.04 }}
              >
                <SkillChip skill={skill} />
              </m.div>
            ))}
          </div>
        </div>
      </m.div>
    </Reveal>
  );
}

function SkillChip({ skill, marquee = false }: { skill: Skill; marquee?: boolean }) {
  const Icon = skill.icon ? skillIcons[skill.icon] : undefined;
  return (
    <span
      className={`inline-flex items-center gap-2 border border-ink bg-paper px-3 py-2 font-mono text-ink ${
        marquee ? "px-4 py-2 text-sm" : "text-xs"
      }`}
    >
      {Icon ? <Icon className="text-ink" size={marquee ? 16 : 14} /> : null}
      {skill.name}
    </span>
  );
}
