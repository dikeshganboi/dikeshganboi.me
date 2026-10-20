# Dikesh Ganboi Portfolio

Personal portfolio for Dikesh Ganboi, a Full-Stack Developer based in Pune, Maharashtra.

## Tech stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lenis smooth scrolling
- Lucide React and React Icons
- Web3Forms
- Vercel Analytics and Speed Insights

## Features

- Responsive animated hero and sticky navigation
- Project filtering with image fallbacks
- About, skills, achievements, education, and contact sections
- Accessible contact form with Web3Forms and mailto fallback
- SEO metadata, Open Graph image, sitemap, robots, and Person JSON-LD
- Reduced-motion support, focus states, security headers, and mobile navigation

## Folder structure

```text
src/
  app/                    App Router pages, metadata, sitemap, robots, error UI
  components/
    layout/               Navbar, smooth scrolling, footer, global polish
    sections/             Portfolio sections and project cards
    ui/                   Reusable motion and presentation primitives
  data/                   Typed portfolio content
  lib/                    Site configuration and utilities
public/                   Images, project previews, and resume PDF
```

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SITE_URL=https://dikeshganboi.me
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key
```

`NEXT_PUBLIC_WEB3FORMS_KEY` enables the contact form submission. If it is absent, the form opens a prefilled email instead.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Deployment

Import the repository into Vercel, set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_WEB3FORMS_KEY` in the project environment variables, and deploy. Vercel automatically detects the Next.js build and serves the generated sitemap, robots file, and Open Graph image.
