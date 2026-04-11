"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
{ label: "Home", href: "/", sectionId: "home" },
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Projects", href: "/#projects", sectionId: "projects" },
  { label: "Services", href: "/#services", sectionId: "services" },
  { label: "Notes", href: "/#notes", sectionId: "notes" },
  { label: "Now", href: "/#now", sectionId: "now" },

  { label: "日本語", href: "/#japanese", sectionId: "japanese" },

  { label: "Photography", href: "/#photography", sectionId: "photography" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },

];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      if (window.scrollY < 100) setActiveSection("home");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Intersection observer
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = navLinks
      .filter((l) => l.sectionId && l.sectionId !== "home")
      .map((l) => l.sectionId as string);

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  const isLinkActive = (link: typeof navLinks[0]) => {
    if (link.sectionId === null) return pathname === link.href;
    if (pathname !== "/") return false;
    return activeSection === link.sectionId;
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || menuOpen
            ? "border-b border-border/60 bg-background/90 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-[var(--accent-green)] transition-opacity hover:opacity-70"
          >
            Annu Kumari
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors duration-200",
                    isLinkActive(link)
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={cn(
              "block w-5 h-px bg-foreground transition-all duration-300 origin-center",
              menuOpen ? "rotate-45 translate-y-[3.5px]" : ""
            )} />
            <span className={cn(
              "block w-5 h-px bg-foreground transition-all duration-300",
              menuOpen ? "opacity-0 scale-x-0" : ""
            )} />
            <span className={cn(
              "block w-5 h-px bg-foreground transition-all duration-300 origin-center",
              menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
            )} />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-20 px-6 md:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  className="border-b border-border/40 last:border-b-0"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between py-4 text-base transition-colors",
                      isLinkActive(link)
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                    {isLinkActive(link) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)]" />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10">
              <p className="text-xs text-muted-foreground/30 mb-3">Available for contracts</p>
              <Link
                href="mailto:anuk35168@gmail.com"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-md bg-foreground text-background text-sm font-medium px-5 py-2.5 transition-opacity hover:opacity-85 w-full"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}