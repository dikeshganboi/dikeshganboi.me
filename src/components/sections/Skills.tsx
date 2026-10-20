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
import { motion, useReducedMotion } from "framer-motion";
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
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { portfolio, type Skill } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

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
    const observer = new IntersectionObserver(
      ([entry]) => setMarqueeVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      id="skills"
      className="scroll-mt-24 overflow-x-clip border-b border-white/5 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeading
            label="Skills"
            title="Tools I build and test with"
            subtitle="A practical toolkit spanning product development, quality checks, and problem-solving fundamentals."
          />
        </Reveal>

        <div ref={marqueeRef} className={`relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${marqueeVisible ? "" : "marquee-paused"}`}>
          <div className="space-y-3">
            <SkillMarquee skills={marqueeSkills} reverse={false} />
            <SkillMarquee skills={[...marqueeSkills].reverse()} reverse />
          </div>
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
      </div>
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
  const [pointer, setPointer] = useState({ x: "50%", y: "50%" });
  const reducedMotion = useReducedMotion() ?? false;
  const GroupIcon = groupIcons[group as keyof typeof groupIcons];

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
      y: `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    });
  };

  return (
    <Reveal delay={index * 0.06} className={className}>
      <motion.div
        onPointerMove={handlePointerMove}
        whileHover={reducedMotion ? undefined : { y: -4 }}
        style={
          {
            "--spotlight-x": pointer.x,
            "--spotlight-y": pointer.y,
          } as CSSProperties
        }
        className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(280px circle at var(--spotlight-x) var(--spotlight-y), rgba(34,211,238,0.13), transparent 68%)",
          }}
        />
        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="rounded-xl border border-white/10 bg-white/5 p-2 text-cyan-300">
              <GroupIcon size={19} />
            </span>
            <h3 className="font-heading text-xl font-semibold text-white">{group}</h3>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {skills.map((skill, skillIndex) => (
              <motion.div
                key={skill.name}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: reducedMotion ? 0 : skillIndex * 0.04 }}
              >
                <SkillChip skill={skill} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

function SkillChip({ skill, marquee = false }: { skill: Skill; marquee?: boolean }) {
  const Icon = skill.icon ? skillIcons[skill.icon] : undefined;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 text-white/75 ${
        marquee ? "px-4 py-2 text-sm" : "px-3 py-2 text-xs"
      }`}
    >
      {Icon ? <Icon className="text-cyan-300" size={marquee ? 16 : 14} /> : null}
      {skill.name}
    </span>
  );
}
