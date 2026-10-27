"use client";

import Image from "next/image";
import { ExternalLink, Layers3, Monitor, Code2 } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/portfolio";
import { portfolio } from "@/data/portfolio";

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
  const reducedMotion = useReducedMotion() ?? false;
  const CategoryIcon = categoryIcons[project.category];

  return (
    <m.article
      layout
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: reducedMotion ? 0 : index * 0.06 }}
      className="group relative flex h-full flex-col overflow-hidden border-2 border-ink bg-paper-2 shadow-[6px_6px_0_var(--ink)] transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--ink)]"
    >
      <div className="relative flex h-full flex-col overflow-hidden bg-paper-2">
        <ProjectTicketHeader project={project} number={portfolio.projects.indexOf(project) + 1} />
        <ProjectImage
          project={project}
          failed={imageFailed}
          onError={() => setImageFailed(true)}
          className="aspect-video"
        />
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-ink-soft">
              <CategoryIcon size={14} />
              {project.category}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-ink">
            {project.title}
          </h3>
          <p className="mt-3 line-clamp-4 text-sm leading-6 text-ink-soft">
            {project.description}
          </p>
          <ProjectTech tech={project.tech} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </m.article>
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
  return (
    <div className={`group/image relative aspect-video overflow-hidden border-2 border-ink ${className}`}>
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
        <ProjectPlaceholder category={project.category} />
      )}
    </div>
  );
}

export function ProjectPlaceholder({
  category,
}: {
  category: Project["category"];
}) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-paper-2">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full text-ink/20" preserveAspectRatio="none">
        <defs>
          <pattern id="project-hatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M 0 0 V 12" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#project-hatch)" />
      </svg>
      <span className="relative font-mono text-xs font-bold uppercase tracking-[0.12em] text-ink">No preview</span>
      <span className="relative mt-2 font-mono text-[10px] uppercase text-ink-soft">{category}</span>
    </div>
  );
}

export function ProjectTech({ tech }: { tech: string[] }) {
  if (tech.length === 0) return null;
  return <p className="mt-5 font-mono text-xs text-ink-soft">{tech.join(" / ")}</p>;
}

export function ProjectTicketHeader({ project, number }: { project: Project; number: number }) {
  return (
    <div className="flex items-center justify-between border-b-2 border-ink px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink">
      <span>PRJ-{String(number).padStart(3, "0")}</span>
      <span>{project.liveUrl ? <><span className="text-accent">●</span> Live</> : <><span>○</span> Private</>}</span>
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
        <span className="font-mono text-xs text-ink-soft">Private / On request</span>
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
      className="inline-flex items-center gap-1.5 border border-ink bg-paper px-3 py-2 font-mono text-xs font-bold uppercase text-ink transition-colors hover:bg-accent hover:text-accent-ink"
    >
      {children}
    </a>
  );
}
