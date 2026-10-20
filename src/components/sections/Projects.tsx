"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import FeaturedProjectCard from "@/components/sections/projects/FeaturedProjectCard";
import ProjectCard from "@/components/sections/projects/ProjectCard";
import ProjectFilter, {
  type ProjectFilterValue,
} from "@/components/sections/projects/ProjectFilter";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolio } from "@/data/portfolio";

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
      className="overflow-x-clip scroll-mt-24 border-b border-white/5 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeading
            label="Projects"
            title="Things I've built and shipped"
            subtitle="A selection of full-stack products, experiments, and tools built to solve real problems."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <ProjectFilter active={activeFilter} onChange={setActiveFilter} />
          <motion.p
            key={activeFilter}
            initial={reducedMotion ? false : { opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-sm text-white/45"
          >
            Showing {visibleProjectCount}{" "}
            {visibleProjectCount === 1 ? "project" : "projects"}
          </motion.p>
        </Reveal>

        <div className="mt-8">
          <AnimatePresence mode="popLayout" initial={!reducedMotion}>
            {featuredProjects.length > 0 && (
              <motion.div layout className="space-y-6">
                {featuredProjects[0] && (
                  <FeaturedProjectCard project={featuredProjects[0]} />
                )}
                {featuredProjects.length > 1 && (
                  <motion.div
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
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {otherProjects.length > 0 && (
          <div className="mt-20">
            <h3 className="font-heading text-2xl font-semibold text-white">
              More projects
            </h3>
            <AnimatePresence mode="popLayout" initial={!reducedMotion}>
              <motion.div
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
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
