"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const socials = [
  { label: "X", href: "https://x.com/@Annu_NexraAI" },
  { label: "GitHub", href: "https://github.com/annuk123" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/annu-kumari-540337237/" },
  { label: "YouTube", href: "https://www.youtube.com/@nexralab-ai" },
  { label: "Instagram", href: "https://www.instagram.com/solopreneur_annu" },
];

const ArrowUpRight = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path
      d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = `mailto:annu@nexralab.com?subject=Project inquiry from ${encodeURIComponent(name || "website")}&body=${encodeURIComponent(message)}`;

  return (
    <div id="contact" className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      {/* Header */}
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40 mb-4"
      >
        Contact
      </motion.p>

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-3xl font-bold tracking-tight mb-12"
      >
        Let's work together
      </motion.h1>

      {/* Two column layout */}
      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {/* Left — message box */}
        <div className="rounded-lg border border-border/50 bg-card p-6 flex flex-col gap-4">
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40">
            Send a message
          </p>

          <div className="flex flex-col gap-3 flex-1">
            <div>
              <label className="text-xs text-muted-foreground/50 mb-1.5 block">
                Your name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full rounded-md border border-border/50 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-border transition-colors"
              />
            </div>

            <div className="flex-1">
              <label className="text-xs text-muted-foreground/50 mb-1.5 block">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Annu, I have a project in mind..."
                rows={6}
                className="w-full rounded-md border border-border/50 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-border transition-colors resize-none"
              />
            </div>
          </div>

          <Link
            href={mailtoHref}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground text-background text-sm font-medium px-4 py-2.5 transition-opacity hover:opacity-85 w-full"
          >
            Send via email
          </Link>

          <p className="text-xs text-muted-foreground/30 text-center">
            Opens your mail client
          </p>
        </div>

        {/* Right — CTA + socials */}
        <div className="flex flex-col gap-4">
          {/* Nexra CTA */}
          <Link
            href="https://nexralab.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg border border-[var(--accent-green)]/20 bg-[var(--accent-green)]/[0.03] p-6 hover:border-[var(--accent-green)]/40 transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border border-[var(--accent-green)]/25 text-[var(--accent-green)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                active
              </span>
              <span className="text-muted-foreground/30 group-hover:text-[var(--accent-green)] transition-colors">
                <ArrowUpRight />
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground mb-1.5 group-hover:text-[var(--accent-green)] transition-colors">
              Try Nexra
            </p>
            <p className="text-xs text-muted-foreground/60 leading-relaxed">
              AI thinking partner that challenges your startup ideas instead of
              validating them.
            </p>
          </Link>

          {/* Contract CTA */}
          <div className="rounded-lg border border-border/50 bg-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
              <span className="text-xs font-medium text-[var(--accent-green)]">
                Available for contracts
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground mb-1.5">
              Hire me for contract work
            </p>
            <p className="text-xs text-muted-foreground/60 leading-relaxed mb-4">
              AI integrations, full-stack MVP development, and product management. Part-time,
              remote, fast turnaround.
            </p>
            <Link
              href="mailto:anuk35168@gmail.com?subject=Contract work inquiry"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
            >
              Get in touch
              <ArrowUpRight />
            </Link>
          </div>

          {/* Socials */}
          <div className="rounded-lg border border-border/50 bg-card p-6">
            <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40 mb-4">
              Follow the journey
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-border/50 bg-background px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}