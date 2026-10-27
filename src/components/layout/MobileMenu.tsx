"use client";

import { AnimatePresence, m } from "framer-motion";
import type { Socials } from "@/data/portfolio";
import NavLink, { type NavigationItem } from "./NavLink";
import { ThemeToggle } from "./Navbar";

export default function MobileMenu({ open, activeSection, items, socials, resumeUrl, reducedMotion, onClose, onHire, dark, onThemeToggle }: {
  open: boolean; activeSection: string; items: NavigationItem[]; socials: Socials; resumeUrl: string; reducedMotion: boolean; onClose: () => void; onHire: () => void; dark: boolean; onThemeToggle: () => void;
}) {
  return <AnimatePresence>{open && <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 overflow-y-auto bg-paper px-6 pb-10 pt-28 lg:hidden">
    <nav aria-label="Mobile navigation" className="mx-auto flex max-w-lg flex-col">
      {items.map((item, index) => <NavLink key={item.id} item={item} index={index} active={activeSection === item.id} reducedMotion={reducedMotion} onNavigate={onClose} mobile />)}
      <div className="mt-8 flex gap-2"><a href={resumeUrl} download onClick={onClose} className="button-editorial flex-1 px-4 py-3 text-center font-mono text-xs uppercase">Resume</a><button type="button" onClick={onHire} className="button-editorial flex-1 bg-accent px-4 py-3 font-mono text-xs uppercase text-accent-ink">Hire me</button><ThemeToggle dark={dark} onClick={onThemeToggle} /></div>
      <div className="mt-8 border-t-2 border-ink pt-5 font-mono text-xs uppercase"><a href={socials.github} className="mr-4">Github ↗</a><a href={socials.linkedin} className="mr-4">LinkedIn ↗</a><a href={socials.email}>Email ↗</a></div>
    </nav>
  </m.div>}</AnimatePresence>;
}
