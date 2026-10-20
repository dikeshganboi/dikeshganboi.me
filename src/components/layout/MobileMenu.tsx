"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import type { Socials } from "@/data/portfolio";
import NavLink, { type NavigationItem } from "./NavLink";

interface MobileMenuProps {
  open: boolean;
  activeSection: string;
  items: NavigationItem[];
  socials: Socials;
  resumeUrl: string;
  reducedMotion: boolean;
  onClose: () => void;
  onHire: () => void;
}

export default function MobileMenu({
  open,
  activeSection,
  items,
  socials,
  resumeUrl,
  reducedMotion,
  onClose,
  onHire,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          className="fixed inset-0 z-40 overflow-y-auto bg-[#0a0a0f]/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
        >
          <motion.nav
            aria-label="Mobile navigation"
            initial={reducedMotion ? false : { y: 20 }}
            animate={{ y: 0 }}
            exit={reducedMotion ? undefined : { y: 20 }}
            transition={{ duration: 0.35 }}
            className="mx-auto flex max-w-lg flex-col"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : index * 0.06,
                  duration: 0.35,
                }}
              >
                <NavLink
                  item={item}
                  active={activeSection === item.id}
                  reducedMotion={reducedMotion}
                  onNavigate={onClose}
                  mobile
                />
              </motion.div>
            ))}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={resumeUrl}
                download
                onClick={onClose}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Download Resume
              </a>
              <button
                type="button"
                onClick={onHire}
                className="bg-accent-gradient inline-flex flex-1 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                Hire me
              </button>
            </div>
            <div className="mt-8 flex gap-3 border-t border-white/10 pt-6">
              <SocialLink href={socials.github} label="GitHub">
                <FaGithub size={19} />
              </SocialLink>
              <SocialLink href={socials.linkedin} label="LinkedIn">
                <FaLinkedinIn size={18} />
              </SocialLink>
              <SocialLink href={socials.email} label="Email">
                <Mail size={19} />
              </SocialLink>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-cyan-300/40 hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
    >
      {children}
    </a>
  );
}
