"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, FileText, Mail, ArrowDown } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useEffect, useId, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import StatCounter from "@/components/ui/StatCounter";
import Container from "@/components/ui/Container";

export default function Hero() {
  const stampPathId = useId().replace(/:/g, "");

  return (
    <section id="hero" className="scroll-mt-24 border-b-2 border-ink">
      <Container className="site-grid grid min-h-[calc(100svh-5rem)] gap-7 pb-12 pt-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-16 lg:pb-16 lg:pt-28">
        <StatusLine />
        <HeroPhoto stampPathId={stampPathId} />

        <div className="order-3 lg:order-2 lg:col-start-1 lg:row-start-2">
          <h1 className="hero-heading max-w-4xl leading-none">
            <span className="hero-heading-line hero-heading-line-animated mb-1 block font-sans text-[clamp(1.25rem,5vw,1.75rem)] font-medium tracking-normal">
              {portfolio.hero.greeting}
            </span>
            <span className="hero-heading-line hero-heading-line-animated block font-heading text-[clamp(3rem,13vw,6rem)] font-normal leading-[0.98] tracking-[-0.01em] text-accent">
              {portfolio.name}
            </span>
          </h1>

          <RoleLine roles={portfolio.hero.roles} />

          <p className="mt-4 max-w-[34rem] text-base leading-[1.6] text-ink-soft sm:mt-6 sm:text-lg">
            {portfolio.bio}
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Link
              href="#projects"
              className="button-editorial inline-flex min-h-12 w-full items-center justify-center gap-2 bg-ink px-5 py-3 font-mono text-xs font-bold uppercase text-paper sm:w-auto"
            >
              View projects <ArrowDown size={15} />
            </Link>
            <a
              href={portfolio.resumeUrl}
              download
              className="button-editorial inline-flex min-h-12 w-full items-center justify-center gap-2 bg-transparent px-5 py-3 font-mono text-xs font-bold uppercase text-ink sm:w-auto"
            >
              Download resume <FileText size={15} />
            </a>
          </div>

          <div className="mt-5 grid grid-cols-4 gap-2 sm:mt-8 sm:flex sm:gap-3">
            <SocialIconLink href={portfolio.socials.github} label="GitHub">
              <FaGithub size={18} />
            </SocialIconLink>
            <SocialIconLink href={portfolio.socials.linkedin} label="LinkedIn">
              <FaLinkedinIn size={18} />
            </SocialIconLink>
            <SocialIconLink href={portfolio.socials.email} label="Email">
              <Mail size={18} />
            </SocialIconLink>
            <SocialIconLink href={portfolio.socials.ieeePaper} label="IEEE paper">
              <BookOpen size={18} />
            </SocialIconLink>
          </div>

          <div className="mt-7 grid grid-cols-2 border-b-2 border-ink sm:mt-12 sm:grid-cols-4 sm:border-y-2">
            {portfolio.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`border-t-2 border-ink py-4 ${
                  index % 2 === 1 ? "border-l-2 pl-4" : ""
                } ${index >= 2 ? "border-b-2" : ""} sm:border-t-0 sm:border-b-0 ${
                  index > 0 ? "sm:border-l sm:border-ink/30 sm:pl-4" : ""
                }`}
              >
                <StatCounter stat={stat} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatusLine() {
  return (
    <div className="order-1 flex min-h-5 max-w-full items-center whitespace-nowrap text-left font-mono text-xs font-semibold tracking-[0.08em] text-ink lg:col-start-1 lg:row-start-1">
      <span className="flex items-center gap-2">
        <span className="inline-block animate-pulse text-accent">●</span>
        <span className="inline max-[379px]:hidden">OPEN TO WORK&nbsp; - &nbsp;FRESHER 2026&nbsp; - &nbsp;PUNE</span>
        <span className="hidden max-[379px]:inline">OPEN TO WORK&nbsp; - &nbsp;2026&nbsp; - &nbsp;PUNE</span>
      </span>
    </div>
  );
}

function HeroPhoto({ stampPathId }: { stampPathId: string }) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className="order-2 flex justify-center pt-4 pb-6 lg:order-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-h-[78vh] lg:pt-0">
      <div className="relative w-full max-w-md">
        <div className="relative aspect-[4/5] max-h-[52svh] border-2 border-ink bg-paper-2 lg:max-h-[78vh]">
          <Image
            src={portfolio.images.photo}
            alt={`${portfolio.name} - ${portfolio.role}`}
            width={900}
            height={1599}
            priority
            fetchPriority="high"
            sizes="(max-width: 1023px) 90vw, 38vw"
            className="h-full w-full object-cover object-top sepia-[.1] contrast-105"
          />
          <a
            href={portfolio.socials.ieeePaper}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="IEEE published paper: PUNECON 2025"
            className={`stamp absolute right-4 -top-8 h-24 w-24 rounded-full sm:-right-10 sm:-top-10 sm:h-[120px] sm:w-[120px] ${
              reducedMotion ? "motion-reduce:animate-none" : ""
            }`}
          >
            <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
              <defs>
                <path
                  id={`stamp-circle-${stampPathId}`}
                  d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
                  fill="none"
                />
              </defs>
              <circle cx="100" cy="100" r="96" fill="var(--accent)" />
              <text
                fill="#FFFFFF"
                fontSize="15"
                fontFamily="var(--font-geist-mono), monospace"
                letterSpacing="2"
                textLength="440"
                lengthAdjust="spacing"
              >
                <textPath href={`#stamp-circle-${stampPathId}`} startOffset="0">
                  IEEE PUBLISHED * PUNECON 2025 *
                </textPath>
              </text>
              <circle cx="100" cy="100" r="52" stroke="#FFFFFF" fill="none" strokeWidth="1" />
              <text
                x="100"
                y="100"
                fill="#FFFFFF"
                fontSize="34"
                fontFamily="var(--font-instrument), serif"
                fontStyle="italic"
                textAnchor="middle"
                dominantBaseline="central"
              >
                IEEE
              </text>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function RoleLine({ roles }: { roles: string[] }) {
  const reducedMotion = useReducedMotion() ?? false;
  const [role, setRole] = useState(roles[0]);

  useEffect(() => {
    if (reducedMotion || roles.length < 2) return;

    let currentText = roles[0];
    let currentIndex = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;
    const tick = () => {
      const current = roles[currentIndex];
      if (!deleting && currentText.length < current.length) {
        currentText = current.slice(0, currentText.length + 1);
        setRole(currentText);
        timeout = setTimeout(tick, 70);
      } else if (!deleting && currentText.length === current.length) {
        deleting = true;
        timeout = setTimeout(tick, 1200);
      } else if (deleting && currentText.length > 0) {
        currentText = currentText.slice(0, -1);
        setRole(currentText);
        timeout = setTimeout(tick, 38);
      } else {
        deleting = false;
        currentIndex = (currentIndex + 1) % roles.length;
        currentText = "";
        timeout = setTimeout(tick, 220);
      }
    };

    currentText = "";
    setRole("");
    timeout = setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, [reducedMotion, roles]);

  return (
    <div className="mt-2 min-h-[1.6em] font-sans text-[clamp(1.125rem,4.5vw,1.5rem)] font-medium leading-[1.6] text-ink sm:mt-3">
      <span className="sr-only">Roles: {roles.join(", ")}.</span>
      <span aria-hidden="true">
        <span className="mr-2 font-mono text-sm font-normal text-accent">&gt;</span>
        {reducedMotion ? roles[0] : role}
        <span className="hero-caret ml-1 inline-block h-[1.4em] w-[3px] align-middle bg-accent" aria-hidden="true" />
      </span>
    </div>
  );
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center border-2 border-ink text-ink transition-colors hover:bg-ink hover:text-paper"
    >
      {children}
    </a>
  );
}
