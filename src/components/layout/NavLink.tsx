"use client";

import type { MouseEvent } from "react";
import { useLenis } from "./SmoothScroll";

export interface NavigationItem {
  id: string;
  label: string;
}

export default function NavLink({
  item,
  active,
  reducedMotion,
  onNavigate,
  mobile = false,
  index = 0,
}: {
  item: NavigationItem;
  active: boolean;
  reducedMotion: boolean;
  onNavigate: () => void;
  mobile?: boolean;
  index?: number;
}) {
  const lenis = useLenis();
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById(item.id);
    if (target && lenis && !reducedMotion) lenis.scrollTo(target, { offset: -80 });
    else target?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
    onNavigate();
  };
  return (
    <a href={`#${item.id}`} onClick={handleClick} aria-current={active ? "page" : undefined}
      className={`relative inline-flex font-mono uppercase tracking-[0.1em] transition-colors hover:text-accent ${mobile ? "px-1 py-3 text-5xl text-ink" : "px-2 py-2 text-[11px] text-ink-soft"} ${active ? "text-ink after:absolute after:inset-x-2 after:-bottom-0.5 after:h-0.5 after:bg-accent" : ""}`}>
      {!mobile && <span className="mr-1 text-accent">{String(index + 1).padStart(2, "0")}</span>}{item.label}
    </a>
  );
}
