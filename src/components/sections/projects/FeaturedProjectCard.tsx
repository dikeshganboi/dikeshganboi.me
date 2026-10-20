"use client";

import { useState, type CSSProperties, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { ProjectImage, ProjectLinks, ProjectTech } from "./ProjectCard";

interface FeaturedProjectCardProps {
  project: Project;
}

export default function FeaturedProjectCard({
  project,
}: FeaturedProjectCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [pointer, setPointer] = useState({ x: "50%", y: "50%" });
  const reducedMotion = useReducedMotion() ?? false;

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
      y: `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    });
  };

  const style = {
    "--spotlight-x": pointer.x,
    "--spotlight-y": pointer.y,
  } as CSSProperties;

  return (
    <motion.article
      layout
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5 }}
      onPointerMove={handlePointerMove}
      style={style}
      className="group relative overflow-hidden rounded-3xl border border-violet-300/20 bg-white/[0.045] p-px transition-transform duration-300 hover:-translate-y-1"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(480px circle at var(--spotlight-x) var(--spotlight-y), rgba(139,92,246,0.18), transparent 65%)",
        }}
      />
      <div className="relative grid overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#11111a] lg:grid-cols-[1.05fr_0.95fr]">
        <ProjectImage
          project={project}
          failed={imageFailed}
          onError={() => setImageFailed(true)}
          className="aspect-video min-h-[280px] lg:aspect-auto lg:h-full lg:min-h-[320px]"
        />
        <div className="flex flex-col justify-center p-6 sm:p-10">
          {project.ieeeUrl && (
            <a
              href={project.ieeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the Sanket Bhasha IEEE published paper"
              className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-violet-300/30 bg-violet-300/10 px-3 py-1.5 text-xs font-semibold text-violet-200 transition-colors hover:bg-violet-300/20"
            >
              <Sparkles size={14} /> IEEE Published <ExternalLink size={13} />
            </a>
          )}
          <h3 className="font-heading text-2xl font-bold text-white sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
            {project.description}
          </p>
          {project.highlights && (
            <ul className="mt-5 space-y-2 text-sm text-white/75">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                  {highlight}
                </li>
              ))}
            </ul>
          )}
          <ProjectTech tech={project.tech} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.article>
  );
}
