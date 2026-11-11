import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/ConvexClient/ConvexClientProvider";
import { Analytics } from "@vercel/analytics/next";
import "highlight.js/styles/github-dark.css";
import { Geist, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const SITE_URL = "https://annu-kumari.nexralab.com";
const TITLE = "Annu Kumari | Embedded, IoT & Robotics";
const DESCRIPTION =
  "Embedded systems, IoT, and robotics projects: ESP32 firmware, sensors, and the backends they talk to.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,

  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Annu Kumari",
    images: [
      {
        url: "/annu.png",
        width: 1200,
        height: 630,
        alt: "Annu Kumari, embedded systems and robotics portfolio",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/annu.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D10",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("dark font-sans", geist.variable, jetbrains.variable)}
    >
      <body className="bg-[#0B0D10] text-[#E6E6E6] antialiased">
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