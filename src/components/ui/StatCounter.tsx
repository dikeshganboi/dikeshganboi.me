import type { Stat } from "@/data/portfolio";

export default function StatCounter({ stat }: { stat: Stat }) {
  return (
    <div className="min-w-0">
      <p className="font-heading text-3xl text-ink sm:text-4xl">
        {stat.value}
        {stat.label === "Projects Built" && "+"}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase leading-tight text-ink-soft sm:text-xs">
        {stat.label}
      </p>
    </div>
  );
}
