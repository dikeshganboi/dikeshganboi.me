"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  FileText,
  Mail,
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { portfolio } from "@/data/portfolio";
import FloatingBadge from "@/components/ui/FloatingBadge";
import StatCounter from "@/components/ui/StatCounter";
import TypingText from "@/components/ui/TypingText";

const headlineVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function Hero() {
  const reducedMotion = useReducedMotion() ?? false;
  const [isTouch, setIsTouch] = useState(false);
  const [cursor, setCursor] = useState({ x: 50, y: 30 });
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 140, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 140, damping: 18 });

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const headlineWords = useMemo(() => portfolio.name.split(" "), []);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (isTouch || reducedMotion) return;
    setCursor({
      x: (event.clientX / window.innerWidth) * 100,
      y: (event.clientY / window.innerHeight) * 100,
    });
  };

  const handlePhotoMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isTouch || reducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(x * 10);
    rotateX.set(y * -10);
  };

  const resetPhotoTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section
      id="hero"
      onPointerMove={handlePointerMove}
      className="relative isolate overflow-x-clip overflow-y-hidden scroll-mt-24 border-b border-white/5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(139,92,246,0.18),transparent_32%),radial-gradient(circle_at_85%_30%,rgba(34,211,238,0.14),transparent_30%),linear-gradient(135deg,#0a0a0f_20%,#11101d_52%,#0a0a0f)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl transition-[left,top] duration-500"
        style={{
          left: `${cursor.x}%`,
          top: `${cursor.y}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-14 px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12 lg:pb-20">
        <div className="order-2 max-w-2xl lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-medium text-emerald-200 sm:text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
            </span>
            {portfolio.hero.badge}
          </motion.div>

          <motion.h1
            variants={headlineVariants}
            initial="hidden"
            animate="visible"
            className="font-heading text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            <motion.span variants={wordVariants} className="block">
              Hi, I&apos;m
            </motion.span>
            <span className="block">
              {headlineWords.map((word) => (
                <motion.span
                  key={word}
                  variants={wordVariants}
                  className="text-gradient mr-[0.22em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-4 min-h-[1.5em] font-heading text-xl font-medium sm:text-2xl"
          >
            <TypingText
              phrases={portfolio.hero.typingPhrases}
              reducedMotion={reducedMotion}
            />
          </motion.p>
          <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">
            {portfolio.bio}
          </p>

          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Link
              href="#projects"
              className="bg-accent-gradient inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              View Projects <ArrowDown size={16} />
            </Link>
            <a
              href={portfolio.resumeUrl}
              download
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              Download Resume <FileText size={16} />
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <SocialLink href={portfolio.socials.github} label="GitHub">
              <FaGithub size={19} />
            </SocialLink>
            <SocialLink href={portfolio.socials.linkedin} label="LinkedIn">
              <FaLinkedinIn size={18} />
            </SocialLink>
            <SocialLink href={portfolio.socials.email} label="Email">
              <Mail size={17} />
            </SocialLink>
            <SocialLink href={portfolio.socials.ieeePaper} label="IEEE paper" title="IEEE">
              <BookOpen size={18} />
            </SocialLink>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-5 border-t border-white/10 pt-6 sm:grid-cols-4 sm:gap-6">
            {portfolio.stats.map((stat) => (
              <StatCounter key={stat.label} stat={stat} reducedMotion={reducedMotion} />
            ))}
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative w-full max-w-md">
            <div aria-hidden="true" className="absolute -left-8 top-8 h-36 w-36 rounded-full bg-violet-500/30 blur-3xl" />
            <div aria-hidden="true" className="absolute -right-8 bottom-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
            <motion.div
              onPointerMove={handlePhotoMove}
              onPointerLeave={resetPhotoTilt}
              style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
              className="relative aspect-[4/5] rounded-[2rem] bg-[linear-gradient(135deg,rgba(139,92,246,0.9),rgba(34,211,238,0.75),rgba(139,92,246,0.9))] p-[2px] shadow-2xl shadow-violet-950/60"
            >
              <div className="absolute inset-0 animate-[gradient-shift_7s_ease_infinite] rounded-[2rem] bg-[linear-gradient(135deg,rgba(139,92,246,0.9),rgba(34,211,238,0.8),rgba(139,92,246,0.9))] bg-[length:200%_200%]" />
              <div className="relative h-full overflow-hidden rounded-[calc(2rem-2px)] bg-[#101018]">
                <Image
                  src={portfolio.images.hero}
                  alt={`${portfolio.name} - ${portfolio.role}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 42vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/50 via-transparent to-transparent" />
              </div>
              <FloatingBadge className="left-2 top-12 sm:-left-10" delay={0.1}>
                {portfolio.hero.floatingBadges[0]}
              </FloatingBadge>
              <FloatingBadge className="right-2 top-24 hidden sm:-right-12 sm:block" delay={0.8}>
                {portfolio.hero.floatingBadges[1]}
              </FloatingBadge>
              <FloatingBadge className="bottom-28 left-2 hidden sm:-left-10 sm:block" delay={1.5}>
                {portfolio.hero.floatingBadges[2]}
              </FloatingBadge>
              <FloatingBadge className="right-2 bottom-12 sm:-right-16" delay={2.2}>
                {portfolio.hero.floatingBadges[3]}
              </FloatingBadge>
            </motion.div>
            <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/80 backdrop-blur-md">
              {portfolio.location} <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-white/40 lg:flex">
        <span>Scroll to explore</span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}

function SocialLink({
  href,
  label,
  title,
  children,
}: {
  href: string;
  label: string;
  title?: string;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      title={title ?? label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--muted)] transition-colors hover:border-cyan-300/40 hover:text-cyan-200 hover:shadow-[0_0_18px_rgba(34,211,238,0.25)]"
    >
      {children}
    </a>
  );
}
