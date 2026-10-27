export interface Project {
  title: string;
  slug: string;
  description: string;
  tech: string[];
  image?: string;
  highlights?: string[];
  category: "Full-Stack" | "Frontend" | "Desktop";
  liveUrl?: string;
  githubUrl?: string;
  partnerApp?: string;
  ieeeUrl?: string;
  featured: boolean;
}

export interface Achievement {
  title: string;
  description: string;
  year: string;
  ieeeUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  result: string;
  coreSubjects: string[];
}

export interface Socials {
  github: string;
  linkedin: string;
  email: string;
  ieeePaper: string;
}

export interface Images {
  hero: string;
  heroAlt: string;
  photo: string;
  thumb: string;
  avatar: string;
}

export interface Stat {
  label: string;
  value: number | string;
}

export interface HeroContent {
  greeting: string;
  roles: string[];
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface AboutContent {
  paragraphs: string[];
  quickFacts: { label: string; value: string }[];
  principles: { title: string; text: string }[];
}

export interface PortfolioData {
  name: string;
  role: string;
  location: string;
  bio: string;
  skills: Record<string, Skill[]>;
  projects: Project[];
  achievements: Achievement[];
  education: Education;
  socials: Socials;
  images: Images;
  stats: Stat[];
  resumeUrl: string;
  hero: HeroContent;
  about: AboutContent;
}

export const portfolio: PortfolioData = {
  name: "Dikesh Ganboi",
  role: "Full-Stack Developer",
  location: "Pune, Maharashtra",
  bio: "B.Tech IT graduate (2026, CGPA 8.11) and fresher who builds and launches full-stack web apps, tests his work and fixes bugs, writes clean simple code, and learns fast.",
  skills: {
    Languages: [
      { name: "Java", icon: "FaJava" },
      { name: "Python", icon: "SiPython" },
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "TypeScript", icon: "SiTypescript" },
      { name: "SQL" },
    ],
    Frontend: [
      { name: "React", icon: "SiReact" },
      { name: "Tailwind CSS", icon: "SiTailwindcss" },
      { name: "HTML", icon: "SiHtml5" },
      { name: "CSS", icon: "SiCss3" },
    ],
    Backend: [
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Express.js", icon: "SiExpress" },
      { name: "REST APIs" },
      { name: "Django", icon: "SiDjango" },
    ],
    Databases: [
      { name: "MySQL", icon: "SiMysql" },
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "Firebase", icon: "SiFirebase" },
    ],
    Testing: [
      { name: "Manual" },
      { name: "Functional" },
      { name: "Regression" },
      { name: "Postman", icon: "SiPostman" },
    ],
    Tools: [
      { name: "Git", icon: "SiGit" },
      { name: "GitHub", icon: "SiGithub" },
      { name: "VS Code" },
      { name: "Vercel", icon: "SiVercel" },
      { name: "Render", icon: "SiRender" },
    ],
    Concepts: [
      { name: "OOP" },
      { name: "Data Structures" },
      { name: "DBMS" },
      { name: "SDLC" },
      { name: "Operating Systems" },
    ],
    "AI / NLP": [
      { name: "NLP" },
      { name: "Speech processing" },
      { name: "Text processing" },
      { name: "AI coding assistants" },
    ],
  },
  projects: [
    {
      title: "Sanket Bhasha - Indian Sign Language Converter",
      slug: "sanket-bhasha",
      image: "/projects/sanket-bhasha.webp",
      category: "Full-Stack",
      description:
        "Converts text and speech in multiple languages into Indian Sign Language. Backed by an IEEE-published research paper.",
      tech: ["React", "Python", "Django", "SQL", "Tailwind CSS"],
      highlights: [
        "Multilingual text and speech input",
        "Indian Sign Language translation",
        "Backed by IEEE-published research",
      ],
      liveUrl: "https://sanket-bhasha-isl.onrender.com/",
      githubUrl:
        "https://github.com/dikeshganboi/Sanket-Bhasha-Multilingual-Speech-Text-to-Sign-Language-Converter",
      ieeeUrl: "https://ieeexplore.ieee.org/document/11378088",
      featured: true,
    },
    {
      title: "Bakery Management System (Full-Stack POS)",
      slug: "bakery-management-system",
      image: "/projects/bakery-management-system.webp",
      category: "Full-Stack",
      description:
        "Full-stack POS for bakeries with billing, inventory and stock management, discounts, sales tracking, and separate admin, branch manager and cashier logins. API-tested with Postman.",
      tech: ["React", "Node.js", "Express.js", "MongoDB"],
      highlights: [
        "Billing, sales, and stock management",
        "Role-based admin, manager, and cashier access",
        "Postman-tested API workflows",
      ],
      featured: true,
    },
    {
      title: "NearbyService - Service Discovery Platform",
      slug: "nearbyservice",
      image: "/projects/nearbyservice.webp",
      category: "Full-Stack",
      description:
        "A service discovery platform with three live apps - one each for users, partners and admins - to find and book nearby local services.",
      tech: [],
      highlights: [
        "Nearby service discovery",
        "Dedicated user and partner experiences",
        "Separate admin application",
      ],
      liveUrl: "https://nearbyservice.app/",
      partnerApp: "https://nearbyservices.vercel.app/",
      featured: true,
    },
    {
      title: "PD Updates - Career and Job Updates",
      slug: "pd-updates",
      image: "/projects/pd-updates.webp",
      category: "Frontend",
      description:
        "A fast, easy-to-read platform sharing career, job and fresher-hiring updates with searchable blogs, categories and an admin panel.",
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
      highlights: ["Career and job update feed", "Responsive React interface"],
      liveUrl: "https://www.pdupdates.app/",
      githubUrl: "https://github.com/dikeshganboi/PDUPDATES.app",
      featured: true,
    },
    {
      title: "Habit and Task Tracker",
      slug: "habit-and-task-tracker",
      image: "/projects/habit-and-task-tracker.webp",
      category: "Frontend",
      description:
        "Track daily habits and tasks with progress analytics, streaks and a focus view.",
      tech: [],
      highlights: ["Habit and task tracking", "Progress and streak views"],
      liveUrl: "https://habbit-task-tracker.vercel.app/",
      featured: false,
    },
    {
      title: "Electrician Business Website",
      slug: "electrician-business-website",
      image: "/projects/electrician-business-website.webp",
      category: "Frontend",
      description:
        "A responsive business website for a local electrician with service listings, project photos, contact options and SEO optimisation.",
      tech: [],
      highlights: ["Responsive service pages", "Project photo gallery", "SEO-focused build"],
      liveUrl: "https://sachinelectrician.me/",
      featured: false,
    },
    {
      title: "Student Management System",
      slug: "student-management-system",
      image: "/projects/student-management-system.webp",
      category: "Desktop",
      description:
        "Java desktop app to add, update, delete and search student records, backed by MySQL via JDBC.",
      tech: ["Java", "MySQL", "JDBC"],
      highlights: ["Desktop CRUD workflows", "Student search"],
      featured: false,
    },
  ],
  achievements: [
    {
      title: "IEEE PUNECON 2025 (SPPU)",
      description:
        "Research paper on multilingual NLP and sign language translation, accepted, presented and published in IEEE Xplore.",
      year: "2025",
      ieeeUrl: "https://ieeexplore.ieee.org/document/11378088",
    },
    {
      title: "Avishkar 2025",
      description:
        "1st position at institute level, represented the institute at the Zonal level.",
      year: "2025",
    },
  ],
  education: {
    degree: "B.Tech IT",
    institution: "G.H. Raisoni College of Engineering and Management, Pune",
    period: "2022-2026",
    result: "CGPA 8.11",
    coreSubjects: [
      "OOP",
      "Data Structures",
      "DBMS",
      "SDLC",
      "Operating Systems",
    ],
  },
  socials: {
    github: "https://github.com/dikeshganboi",
    linkedin: "https://linkedin.com/in/dikeshganboi",
    email: "mailto:dikeshganboi@gmail.com",
    ieeePaper: "https://ieeexplore.ieee.org/document/11378088",
  },
  images: {
    hero: "/images/dikesh-hero-900.webp",
    heroAlt: "/images/dikesh-hero-navy-900.webp",
    photo: "/images/dikesh-hero-navy-900.webp",
    thumb: "/images/dikesh-hero-navy-160.webp",
    avatar: "/images/dikesh-avatar-optimized.webp",
  },
  stats: [
    { label: "Projects Built", value: 7 },
    { label: "IEEE Paper Published", value: 1 },
    { label: "Avishkar 2025 Rank", value: "1st" },
    { label: "CGPA", value: "8.11" },
  ],
  resumeUrl: "/Dikesh_Ganboi_CV.pdf",
  hero: {
    greeting: "Hi, I'm",
    roles: [
      "Full-Stack Developer",
      "React & Node.js Builder",
      "IEEE Published Researcher",
      "Bug Hunter & Tester",
    ],
  },
  about: {
    paragraphs: [
      "I'm a B.Tech Information Technology graduate (2026) from G.H. Raisoni College of Engineering and Management, Pune, with a CGPA of 8.11.",
      "I build full-stack web apps with React, Node.js, Python and Java, and I put them online. I test my own work, from manual and regression testing to API testing with Postman, and I fix the bugs I find.",
      "I also published research on multilingual NLP and sign language translation at IEEE PUNECON 2025, and built Sanket Bhasha, a live Indian Sign Language converter.",
    ],
    quickFacts: [
      { label: "Location", value: "Pune, Maharashtra" },
      { label: "Education", value: "B.Tech IT, 2026" },
      { label: "CGPA", value: "8.11" },
      { label: "Status · Fresher", value: "Open to work" },
    ],
    principles: [
      {
        title: "Build",
        text: "Full-stack apps that are live and usable, not just demos.",
      },
      {
        title: "Test",
        text: "Manual, functional and regression testing, plus Postman API checks.",
      },
      {
        title: "Learn",
        text: "I pick things up fast and enjoy solving real problems with a team.",
      },
    ],
  },
};
