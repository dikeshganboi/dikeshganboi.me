"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { useLenis } from "./SmoothScroll";
import Container from "@/components/ui/Container";

export default function Footer() {
  const lenis = useLenis();
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);
  const top = () => lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <footer className="border-t-2 border-ink py-10">
      <Container className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div><p className="font-heading text-2xl text-ink">Dikesh Ganboi</p><p className="mt-2 font-mono text-[10px] uppercase text-ink-soft">Built with Next.js, Tailwind CSS and Framer Motion</p></div>
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs uppercase">
          <a href={portfolio.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">Github ↗</a>
          <a href={portfolio.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn ↗</a>
          <a href={portfolio.socials.email} className="hover:text-accent">Email ↗</a>
          <button type="button" onClick={top} className="button-editorial inline-flex items-center gap-2 px-3 py-2">Back to top <ArrowUp size={15} /></button>
        </div>
        <p className="font-mono text-xs text-ink-soft">© {year ?? ""} Dikesh Ganboi</p>
      </Container>
    </footer>
  );
}
