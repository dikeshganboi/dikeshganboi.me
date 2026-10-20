"use client";

import { motion } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { useLenis } from "./SmoothScroll";

export interface NavigationItem {
  id: string;
  label: string;
}

interface NavLinkProps {
  item: NavigationItem;
  active: boolean;
  reducedMotion: boolean;
  onNavigate: () => void;
  children?: ReactNode;
  mobile?: boolean;
}

export default function NavLink({
  item,
  active,
  reducedMotion,
  onNavigate,
  children,
  mobile = false,
}: NavLinkProps) {
  const lenis = useLenis();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById(item.id);
    if (target) {
      if (lenis && !reducedMotion) {
        lenis.scrollTo(target, { offset: -80 });
      } else {
        target.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    }
    onNavigate();
  };

  return (
    <a
      href={`#${item.id}`}
      onClick={handleClick}
      aria-current={active ? "page" : undefined}
      className={`relative inline-flex items-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${
        mobile
          ? "px-1 py-2 text-3xl text-white/80 hover:text-white"
          : "px-3 py-2 text-sm text-white/60 hover:text-white"
      }`}
    >
      {active && !mobile && (
        <motion.span
          layoutId="active-nav-pill"
          transition={
            reducedMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 380, damping: 30 }
          }
          className="absolute inset-0 -z-0 rounded-full bg-white/10"
        />
      )}
      <span className="relative z-10">{children ?? item.label}</span>
    </a>
  );
}
