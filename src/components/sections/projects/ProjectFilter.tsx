"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export type ProjectFilterValue = "All" | "Full-Stack" | "Frontend" | "Desktop";

interface ProjectFilterProps {
  active: ProjectFilterValue;
  onChange: (filter: ProjectFilterValue) => void;
}

const filters: ProjectFilterValue[] = ["All", "Full-Stack", "Frontend", "Desktop"];

export default function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  return (
    <div
      aria-label="Filter projects"
      className="flex max-w-full flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5"
      role="tablist"
    >
      {filters.map((filter) => (
        <Button
          key={filter}
          type="button"
          role="tab"
          aria-selected={active === filter}
          onClick={() => onChange(filter)}
          className="relative rounded-xl px-3 py-2 text-sm text-white/60 transition-colors hover:text-white sm:px-4"
        >
          {active === filter && (
            <motion.span
              layoutId="active-project-filter"
              className="bg-accent-gradient absolute inset-0 -z-0 rounded-xl opacity-90"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-10">{filter}</span>
        </Button>
      ))}
    </div>
  );
}
