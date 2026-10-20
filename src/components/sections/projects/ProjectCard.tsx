"use client";

import Image from "next/image";
import { ExternalLink, Layers3, Monitor, Code2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useState, type CSSProperties, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const categoryIcons = {
  "Full-Stack": Layers3,
  Frontend: Code2,
  Desktop: Monitor,
};

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const [pointer, setPointer] = useState({ x: "50%", y: "50%" });
  const reducedMotion = useReducedMotion() ?? false;
  const CategoryIcon = categoryIcons[project.category];

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
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.06 }}
      onPointerMove={handlePointerMove}
      style={style}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-px transition-transform duration-300 hover:-translate-y-1"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spotlight-x) var(--spotlight-y), rgba(34,211,238,0.14), transparent 65%)",
        }}
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#11111a]">
        <ProjectImage
          project={project}
          failed={imageFailed}
          onError={() => setImageFailed(true)}
          className="aspect-video"
        />
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-200">
              <CategoryIcon size={14} />
              {project.category}
            </span>
          </div>
          <h3 className="font-heading text-xl font-semibold text-white">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-4 text-sm leading-6 text-[var(--muted)]">
            {project.description}
          </p>
          <ProjectTech tech={project.tech} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectImage({
  project,
  failed,
  onError,
  className,
}: {
  project: Project;
  failed: boolean;
  onError: () => void;
  className: string;
}) {
  const initials = project.title
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  const CategoryIcon = categoryIcons[project.category];

  return (
    <div className={`group/image relative aspect-video overflow-hidden ${className}`}>
      {!failed && project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} project preview`}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          onError={onError}
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <ProjectPlaceholder
          initials={initials}
          category={project.category}
          Icon={CategoryIcon}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#11111a] via-transparent to-transparent opacity-70" />
    </div>
  );
}

export function ProjectPlaceholder({
  initials,
  category,
  Icon,
}: {
  initials: string;
  category: Project["category"];
  Icon: typeof Layers3;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_25%_20%,rgba(139,92,246,0.48),transparent_38%),linear-gradient(135deg,#19152d,#0d2530)]">
      <Icon className="mb-3 text-cyan-200/70" size={24} />
      <span className="font-heading text-4xl font-bold tracking-widest text-white/80">
        {initials}
      </span>
      <span className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">
        {category}
      </span>
    </div>
  );
}

export function ProjectTech({ tech }: { tech: string[] }) {
  if (tech.length === 0) return null;
  return (
    <div className="mt-5 flex flex-wrap gap-1.5">
      {tech.map((item) => (
        <span
          key={item}
          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/65"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  const hasLinks = project.liveUrl || project.githubUrl || project.partnerApp;

  return (
    <div className="mt-auto flex flex-wrap gap-2 pt-6">
      {hasLinks ? (
        <>
          {project.liveUrl && (
        <ExternalProjectLink href={project.liveUrl} label={`View ${project.title} live demo`}>
          <ExternalLink size={14} /> Live Demo
        </ExternalProjectLink>
          )}
          {project.githubUrl && (
        <ExternalProjectLink href={project.githubUrl} label={`View ${project.title} on GitHub`}>
          <FaGithub size={14} /> GitHub
        </ExternalProjectLink>
          )}
          {project.partnerApp && (
        <ExternalProjectLink href={project.partnerApp} label={`View ${project.title} partner app`}>
          <ExternalLink size={14} /> Partner App
        </ExternalProjectLink>
          )}
        </>
      ) : (
        <span className="text-xs text-white/40">Private / On request</span>
      )}
    </div>
  );
}

function ExternalProjectLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100"
    >
      {children}
    </a>
  );
}
