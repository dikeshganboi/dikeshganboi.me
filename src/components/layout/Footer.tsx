"use client";

import { ArrowUp, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { portfolio } from "@/data/portfolio";
import { useLenis } from "./SmoothScroll";

export default function Footer() {
  const lenis = useLenis();
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);
  const top = () => lenis ? lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });
  return <footer className="border-t border-white/10 py-10"><div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12"><div><p className="font-heading text-lg font-bold text-white">Dikesh <span className="text-gradient">Ganboi</span></p><p className="mt-2 text-sm text-white/40">Built with Next.js, Tailwind CSS and Framer Motion</p></div><div className="flex items-center gap-3"><a aria-label="GitHub" href={portfolio.socials.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 p-3 text-white/60 hover:text-cyan-200"><FaGithub /></a><a aria-label="LinkedIn" href={portfolio.socials.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 p-3 text-white/60 hover:text-cyan-200"><FaLinkedinIn /></a><a aria-label="Email" href={portfolio.socials.email} className="rounded-full border border-white/10 p-3 text-white/60 hover:text-cyan-200"><Mail size={18} /></a><button type="button" onClick={top} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/10">Back to top <ArrowUp size={15} /></button></div><p className="text-sm text-white/35">© {year ?? ""} Dikesh Ganboi</p></div></footer>;
}
