"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
  children: ReactNode;
}

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      instance.destroy();
      setLenis(null);
      return;
    }
    lenisRef.current = instance;
    setLenis(instance);
    let animationFrameId: number;

    const frame = (time: number) => {
      instance.raf(time);
      animationFrameId = requestAnimationFrame(frame);
    };

    animationFrameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenisRef.current = null;
      setLenis(null);
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
