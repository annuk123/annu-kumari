import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/ConvexClient/ConvexClientProvider";
import { Analytics } from "@vercel/analytics/next";
import "highlight.js/styles/github-dark.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

// export const metadata: Metadata = {
//   title: "Annu Kumari",
//   description: "Solopreneur building AI products. Available for contract work.",
// };

export const metadata: Metadata = {
  title: "Annu Kumari - AI Product Builder",
  description:
    "Solopreneur building AI products. Available for contract work. Fast, focused, and no bloat.",

  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "Annu Kumari - AI Product Builder",
    description: "Solopreneur building AI products. Available for contract work.",
    url: "https://annu-kumari.nexralab.com",
    siteName: "Annu Kumari",
    images: [
      {
        url: "/annu.png",
        width: 1200,
        height: 630,
        alt: "Annu Kumari",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Annu Kumari - AI Product Builder",
    description: "Solopreneur building AI products. Available for contract work.",
    images: ["/annu.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="antialiased">
        <ClerkProvider>
          <ConvexClientProvider>
            <Navbar />
            <main>{children}</main>
            <Analytics />
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}