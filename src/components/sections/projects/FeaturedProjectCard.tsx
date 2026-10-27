"use client";

import { useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { portfolio } from "@/data/portfolio";
import { ProjectImage, ProjectLinks, ProjectTech, ProjectTicketHeader } from "./ProjectCard";

interface FeaturedProjectCardProps {
  project: Project;
}

export default function FeaturedProjectCard({
  project,
}: FeaturedProjectCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <m.article
      layout
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reducedMotion ? undefined : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden border-2 border-ink bg-paper-2 shadow-[6px_6px_0_var(--ink)] transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--ink)]"
    >
      <ProjectTicketHeader project={project} number={portfolio.projects.indexOf(project) + 1} />
      <div className="relative grid overflow-hidden bg-paper-2 lg:grid-cols-[1.05fr_0.95fr]">
        <ProjectImage
          project={project}
          failed={imageFailed}
          onError={() => setImageFailed(true)}
          className="aspect-video min-h-[280px]"
        />
        <div className="flex flex-col justify-center p-6 sm:p-10">
          {project.ieeeUrl && (
            <a
              href={project.ieeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the Sanket Bhasha IEEE published paper"
              className="mb-5 inline-flex w-fit items-center gap-2 border border-ink bg-paper px-3 py-1.5 font-mono text-xs font-bold uppercase text-ink transition-colors hover:bg-paper-2"
            >
              <Sparkles size={14} /> IEEE Published <ExternalLink size={13} />
            </a>
          )}
          <h3 className="text-2xl font-bold text-ink sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-ink-soft sm:text-base">
            {project.description}
          </p>
          {/* TODO: Refine the ticket wording while keeping it grounded in the project data. */}
          <div className="mt-5 space-y-1 font-mono text-xs text-ink-soft">
            <p><span className="font-bold text-ink">PROBLEM</span> / Multilingual text and speech input for Indian Sign Language.</p>
            <p><span className="font-bold text-ink">BUILT</span> / Multilingual text and speech translation into Indian Sign Language.</p>
            <p><span className="font-bold text-ink">TESTED</span> / IEEE-published research-backed implementation.</p>
          </div>
          {project.highlights && (
            <ul className="mt-5 space-y-2 text-sm text-ink-soft">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                  {highlight}
                </li>
              ))}
            </ul>
          )}
          <ProjectTech tech={project.tech} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </m.article>
  );
}
