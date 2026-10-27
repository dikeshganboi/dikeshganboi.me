import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import dynamic from "next/dynamic";
import { SITE_URL, description, siteName } from "@/lib/site";
import BackToTop from "@/components/layout/BackToTop";
import MotionProvider from "@/components/ui/MotionProvider";
import PerformanceMetrics from "@/components/layout/PerformanceMetrics";
import "./globals.css";

const Footer = dynamic(() => import("@/components/layout/Footer"));

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dikesh Ganboi | Full-Stack Developer",
    template: "%s | Dikesh Ganboi",
  },
  description,
  keywords: [
    "Dikesh Ganboi",
    "Full-Stack Developer",
    "React Developer",
    "Node.js Developer",
    "IEEE research",
    "Pune developer",
  ],
  authors: [{ name: siteName, url: SITE_URL }],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Dikesh Ganboi | Full-Stack Developer",
    description,
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image", title: siteName, description },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  other: { "theme-color": "#F3EFE6" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const saved = localStorage.getItem("theme"); document.documentElement.dataset.theme = saved === "dark" ? "dark" : "light"; } catch (_) { document.documentElement.dataset.theme = "light"; } })()`,
          }}
        />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
        <SmoothScroll>
          <MotionProvider>
            <Navbar />
            {children}
            <Footer />
            <BackToTop />
          </MotionProvider>
        </SmoothScroll>
        {process.env.NODE_ENV === "production" && <PerformanceMetrics />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteName,
              jobTitle: "Full-Stack Developer",
              url: SITE_URL,
              image: `${SITE_URL}/images/dikesh-avatar.webp`,
              email: "dikeshganboi@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pune",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
              },
              alumniOf:
                "G.H. Raisoni College of Engineering and Management",
              sameAs: [
                "https://github.com/dikeshganboi",
                "https://linkedin.com/in/dikeshganboi",
                "https://ieeexplore.ieee.org/document/11378088",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
