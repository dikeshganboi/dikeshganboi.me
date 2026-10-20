"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useReducedMotion, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";
import MobileMenu from "./MobileMenu";
import NavLink, { type NavigationItem } from "./NavLink";
import ScrollProgress from "./ScrollProgress";
import { useLenis } from "./SmoothScroll";

const navigationItems: NavigationItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const reducedMotion = useReducedMotion() ?? false;
  const lenis = useLenis();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (!menuOpen && currentY > 120) {
        setHidden(currentY > lastScrollY.current && currentY - lastScrollY.current > 2);
      } else if (currentY < 120 || currentY < lastScrollY.current) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const threshold = window.innerHeight * 0.35;
      const sections = navigationItems
        .map((item) => document.getElementById(item.id))
        .filter((section): section is HTMLElement => Boolean(section));
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActiveSection("contact");
        return;
      }
      const current = sections
        .filter((section) => section.getBoundingClientRect().top <= threshold)
        .at(-1);
      setActiveSection(current?.id ?? "");
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveSection);
    };
    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) toggleRef.current?.focus();
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis && !reducedMotion) {
      lenis.scrollTo(target, { offset: -80 });
    } else {
      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
    setMenuOpen(false);
  };

  const scrollTop = () => {
    if (lenis && !reducedMotion) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <>
      <ScrollProgress />
      <motion.header
        initial={false}
        animate={{ y: hidden && !menuOpen ? "-110%" : "0%" }}
        transition={
          reducedMotion ? { duration: 0 } : { duration: 0.3, ease: "easeOut" }
        }
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen
            ? "border-b border-white/10 bg-[#0a0a0f]/75 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={scrollTop}
            aria-label="Scroll to top"
            className="group flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <Image
              src={portfolio.images.avatar}
              alt=""
              width={34}
              height={34}
              className="h-8 w-8 rounded-xl object-cover"
            />
            <span className="font-heading text-lg font-bold text-white">
              Dikesh{" "}
              <span className="text-gradient">Ganboi</span>
            </span>
          </button>

          <nav aria-label="Main navigation" className="hidden lg:flex">
            {navigationItems.map((item) => (
              <NavLink
                key={item.id}
                item={item}
                active={activeSection === item.id}
                reducedMotion={reducedMotion}
                onNavigate={() => undefined}
              />
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={portfolio.resumeUrl}
              download
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Resume
            </a>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="bg-accent-gradient rounded-full px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Hire me
            </button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </motion.header>
      <div id="mobile-navigation">
        <MobileMenu
          open={menuOpen}
          activeSection={activeSection}
          items={navigationItems}
          socials={portfolio.socials}
          resumeUrl={portfolio.resumeUrl}
          reducedMotion={reducedMotion}
          onClose={() => setMenuOpen(false)}
          onHire={() => scrollTo("contact")}
        />
      </div>
    </>
  );
}
