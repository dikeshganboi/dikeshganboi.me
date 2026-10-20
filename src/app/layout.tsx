import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL, description, siteName } from "@/lib/site";
import IntroCurtain from "@/components/layout/IntroCurtain";
import CustomCursor from "@/components/layout/CustomCursor";
import BackToTop from "@/components/layout/BackToTop";
import "./globals.css";

const Footer = dynamic(() => import("@/components/layout/Footer"));

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <SmoothScroll>
          <IntroCurtain />
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
          <BackToTop />
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
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
