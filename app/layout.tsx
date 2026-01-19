import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/ConvexClient/ConvexClientProvider";
import { Analytics } from "@vercel/analytics/next"
export const metadata: Metadata = {
  title: "Annu Kumari",
  description:
    "Indie hacker building small, focused products. Exploring AI, distribution, and shipping in public.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased font-mono">
        <ClerkProvider>
          <ConvexClientProvider>
            {children}
            <Analytics />
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

