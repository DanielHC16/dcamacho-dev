import type { Metadata } from "next";
import { Geist, Geist_Mono, Exo_2 } from "next/font/google";
import "./globals.css";
import ChromeCursor from "@/components/ChromeCursor";

const siteUrl = "https://dcamacho-dev.vercel.app/";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for the hero name: geometric/techno, pairs with Geist.
const exo2 = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Daniel Camacho | Personal Webfolio",
  description: "Software engineer portfolio - Building elegant solutions through clean code and thoughtful design.",
  keywords: ["Daniel Camacho", "Software Engineer", "Web Developer", "Portfolio", "React", "Next.js", "TypeScript", "Full Stack Developer"],
  authors: [{ name: "Daniel Hardy Camacho" }],
  creator: "Daniel Camacho",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Daniel Camacho | Software Engineer",
    description: "Software engineer portfolio - Building elegant solutions through clean code and thoughtful design.",
    siteName: "Daniel Camacho Portfolio",
    images: [
      {
        url: `${siteUrl}/META.png`,
        alt: "Daniel Camacho Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Camacho | Software Engineer",
    description: "Software engineer portfolio - Building elegant solutions through clean code and thoughtful design.",
    creator: "@danielcamacho",
    images: [`${siteUrl}/META.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Daniel Camacho",
    "jobTitle": "Software Engineer",
    "url": siteUrl,
    "sameAs": [
      "https://github.com/DanielHC16",
      "https://linkedin.com/in/danielcamacho777",
      "https://www.instagram.com/daji.env"
    ],
    "email": "danielcamacho0416@gmail.com",
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Pamantasan ng Lungsod ng Maynila"
    },
    "knowsAbout": ["Software Engineering", "Web Development", "React", "Next.js", "TypeScript"]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply the saved/system theme before first paint so the loading screen
            and page never flash light mode. Mirrors ThemeToggle's logic. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${exo2.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <ChromeCursor />
      </body>
    </html>
  );
}
