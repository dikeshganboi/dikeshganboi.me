"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";
import MobileMenu from "./MobileMenu";
import NavLink, { type NavigationItem } from "./NavLink";
import ScrollProgress from "./ScrollProgress";
import { useLenis } from "./SmoothScroll";
import Container from "@/components/ui/Container";

const navigationItems: NavigationItem[] = [
  { id: "about", label: "About" }, { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" }, { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" }, { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [dark, setDark] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: "-35% 0px -55% 0px" });
    navigationItems.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => { if (menuOpen) document.body.style.overflow = "hidden"; else document.body.style.overflow = ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);

  const toggleTheme = () => {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    setDark(next === "dark");
  };
  const scrollTo = (id: string) => { const target = document.getElementById(id); if (target && lenis) lenis.scrollTo(target, { offset: -80 }); else target?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return <>
    <ScrollProgress />
    <header className={`fixed inset-x-0 top-0 z-50 bg-paper transition-shadow ${scrolled ? "border-b-2 border-ink" : ""}`}>
      <Container className="flex h-20 items-center justify-between gap-4">
        <button type="button" onClick={() => scrollTo("hero")} className="font-heading text-2xl text-ink">Dikesh Ganboi</button>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navigationItems.map((item, index) => <NavLink key={item.id} item={item} index={index} active={active === item.id} reducedMotion={false} onNavigate={() => undefined} />)}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <a href={portfolio.resumeUrl} download className="button-editorial bg-transparent px-3 py-2 font-mono text-[11px] font-bold uppercase">Resume</a>
          <button type="button" onClick={() => scrollTo("contact")} className="button-editorial border-accent bg-accent px-3 py-2 font-mono text-[11px] font-bold uppercase text-accent-ink">Hire me</button>
          <ThemeToggle dark={dark} onClick={toggleTheme} />
        </div>
        <button ref={toggleRef} type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="inline-flex border-2 border-ink p-2 text-ink lg:hidden">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Container>
    </header>
    <div id="mobile-navigation"><MobileMenu open={menuOpen} activeSection={active} items={navigationItems} socials={portfolio.socials} resumeUrl={portfolio.resumeUrl} reducedMotion={false} onClose={() => setMenuOpen(false)} onHire={() => scrollTo("contact")} dark={dark} onThemeToggle={toggleTheme} /></div>
  </>;
}

export function ThemeToggle({ dark, onClick }: { dark: boolean; onClick: () => void }) {
  return <button type="button" onClick={onClick} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} className="border-2 border-ink p-2 text-ink hover:bg-paper-2">{dark ? <Sun size={16} /> : <Moon size={16} />}</button>;
}
