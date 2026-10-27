"use client";

import { portfolio } from "@/data/portfolio";

export type ProjectFilterValue = "All" | "Full-Stack" | "Frontend" | "Desktop";

interface ProjectFilterProps {
  active: ProjectFilterValue;
  onChange: (filter: ProjectFilterValue) => void;
}

const filters: ProjectFilterValue[] = ["All", "Full-Stack", "Frontend", "Desktop"];

export default function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  const countFor = (filter: ProjectFilterValue) =>
    filter === "All"
      ? portfolio.projects.length
      : portfolio.projects.filter((project) => project.category === filter).length;

  return (
    <div
      aria-label="Filter projects"
      className="flex max-w-full flex-wrap border-2 border-ink bg-paper-2"
      role="tablist"
    >
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          role="tab"
          aria-selected={active === filter}
          onClick={() => onChange(filter)}
          className={`border-ink px-3 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.08em] transition-colors sm:px-4 sm:text-xs ${
            filter !== filters[0] ? "border-l-2" : ""
          } ${
            active === filter
              ? "bg-ink text-paper"
              : "bg-transparent text-ink hover:bg-paper hover:text-ink"
          }`}
        >
          {filter} {countFor(filter)}
        </button>
      ))}
    </div>
  );
}
