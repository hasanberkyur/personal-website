import "./globals.css";

import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

const sans = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Hasan Berk Yur - Product and Systems",
  description: "A minimal portfolio featuring selected work, current focus, and contact details.",
  metadataBase: new URL("https://hasanberkyur.me"),
  openGraph: {
    title: "Hasan Berk Yur - Product and Systems",
    description: "Selected work, what I am focused on now, and ways to connect.",
    url: "https://hasanberkyur.me",
    siteName: "Hasan Berk Yur",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${sans.variable} ${mono.variable} bg-bg text-text font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
