import type { Metadata } from "next";
import { Syne, JetBrains_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Muhammad Rayan Shahid — AI Researcher, 16",
  description: "Independent AI researcher. Creator of HCMS — a DOI-backed cognitive measurement framework. Building AI that measures how humans think.",
  keywords: "Muhammad Rayan Shahid, RayanAIX, HCMS, AI researcher, cognitive AI, Pakistan, DOI, preprint, cognitive stability",
  openGraph: {
    title: "Muhammad Rayan Shahid — AI Researcher",
    description: "16-year-old independent AI researcher. Published. Building.",
    url: "https://muhammad-rayan-shahid-portfolio.vercel.app",
    type: "website",
    siteName: "Muhammad Rayan Shahid",
  },
  authors: [{ name: "Muhammad Rayan Shahid" }],
  creator: "Muhammad Rayan Shahid",
  publisher: "Muhammad Rayan Shahid",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrainsMono.variable} ${dmSans.variable}`}>
      <body className="bg-primary text-primary antialiased selection:bg-accent-primary selection:text-black">
        {children}
      </body>
    </html>
  );
}
