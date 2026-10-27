"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import FeaturedProjectCard from "@/components/sections/projects/FeaturedProjectCard";
import ProjectCard from "@/components/sections/projects/ProjectCard";
import ProjectFilter, {
  type ProjectFilterValue,
} from "@/components/sections/projects/ProjectFilter";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolio } from "@/data/portfolio";
import Container from "@/components/ui/Container";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilterValue>("All");
  const reducedMotion = useReducedMotion() ?? false;
  const featuredProjects = useMemo(
    () =>
      portfolio.projects.filter(
        (project) =>
          project.featured &&
          (activeFilter === "All" || project.category === activeFilter),
      ),
    [activeFilter],
  );
  const otherProjects = useMemo(
    () =>
      portfolio.projects.filter(
        (project) =>
          !project.featured &&
          (activeFilter === "All" || project.category === activeFilter),
      ),
    [activeFilter],
  );
  const visibleProjectCount = featuredProjects.length + otherProjects.length;

  return (
    <section
      id="projects"
      className="overflow-x-clip scroll-mt-24 border-b-2 border-ink/20 py-24 sm:py-32"
    >
      <Container>
        <Reveal>
          <SectionHeading
            label="Projects"
            title="Things I've built and shipped"
            subtitle="A selection of full-stack products, experiments, and tools built to solve real problems."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <ProjectFilter active={activeFilter} onChange={setActiveFilter} />
          <m.p
            key={activeFilter}
            initial={reducedMotion ? false : { opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 font-mono text-sm text-ink-soft"
          >
            Showing {visibleProjectCount}{" "}
            {visibleProjectCount === 1 ? "project" : "projects"}
          </m.p>
        </Reveal>

        <div className="mt-8">
          <AnimatePresence mode="popLayout" initial={!reducedMotion}>
            {featuredProjects.length > 0 && (
              <m.div layout className="space-y-6">
                {featuredProjects[0] && (
                  <FeaturedProjectCard project={featuredProjects[0]} />
                )}
                {featuredProjects.length > 1 && (
                  <m.div
                    layout
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                  >
                    {featuredProjects.slice(1).map((project, index) => (
                      <ProjectCard
                        key={project.slug}
                        project={project}
                        index={index}
                      />
                    ))}
                  </m.div>
                )}
              </m.div>
            )}
          </AnimatePresence>
        </div>

        {otherProjects.length > 0 && (
          <div className="mt-20">
            <h3 className="text-2xl font-semibold text-ink">
              More projects
            </h3>
            <AnimatePresence mode="popLayout" initial={!reducedMotion}>
              <m.div
                layout
                className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {otherProjects.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                  />
                ))}
              </m.div>
            </AnimatePresence>
          </div>
        )}
      </Container>
    </section>
  );
}
