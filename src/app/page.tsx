import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import dynamic from "next/dynamic";

const SkipLink = () => (
  <a
    href="#main"
    className="fixed left-4 top-4 z-[90] -translate-y-20 rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition-transform focus:translate-y-0"
  >
    Skip to content
  </a>
);

const Skills = dynamic(() => import("@/components/sections/Skills"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Achievements = dynamic(() => import("@/components/sections/Achievements"));
const Education = dynamic(() => import("@/components/sections/Education"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <>
      <SkipLink />
      <main id="main">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Education />
      <Contact />
      </main>
    </>
  );
}
