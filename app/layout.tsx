import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Annu Kumari",
  description: "Indie hacker building small, focused products. Exploring AI, distribution, and shipping in public.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
