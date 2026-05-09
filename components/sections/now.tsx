"use client";

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

export default function NowPage() {
  return (
    <div id="now" className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      {/* Header */}
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40 mb-4"
      >
        Now
      </motion.p>

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-3xl font-bold tracking-tight mb-3"
      >
        What I'm focused on
      </motion.h1>

      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex items-center gap-3 mb-16"
      >
        <span className="text-xs text-muted-foreground/40">April 2026</span>
        <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
        <span className="text-xs text-muted-foreground/40">Ranchi, India</span>
        <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
        <span className="inline-flex items-center gap-1.5 text-xs text-[var(--accent-green)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
          live snapshot
        </span>
      </motion.div>

      {/* Building */}
      <motion.div custom={3} variants={fadeUp} initial="hidden" animate="show" className="mb-10">
        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40 mb-4">
          Building
        </p>
        <Link
          href="https://nexralab.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-lg border border-[var(--accent-green)]/20 bg-[var(--accent-green)]/[0.03] p-6 hover:border-[var(--accent-green)]/40 transition-all"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-foreground group-hover:text-[var(--accent-green)] transition-colors">
                Nexra
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs border border-[var(--accent-green)]/25 text-[var(--accent-green)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                active
              </span>
            </div>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="text-muted-foreground/30 group-hover:text-[var(--accent-green)] transition-colors mt-1">
              <path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Focused on distribution and early traction. Posting build-in-public
            content, engaging with founder communities, and iterating on
            positioning.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Distribution", "Build in public", "Positioning", "Early traction"].map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded border border-[var(--accent-green)]/15 text-[var(--accent-green)]/60">
                {tag}
              </span>
            ))}
          </div>
        </Link>
      </motion.div>

      {/* Learning */}
      <motion.div custom={4} variants={fadeUp} initial="hidden" animate="show" className="mb-10">
        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40 mb-4">
          Learning
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              title: "Japanese",
              detail: "Hiragana done, working through basic vocabulary. Slow and steady.",
              progress: 55,
              tag: "language",
            },
            {
              title: "Distribution & growth",
              detail: "How small products find their first users without paid ads.",
              progress: 50,
              tag: "business",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-border/40 bg-card p-5">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">{item.title}</p>
                <span className="text-xs text-muted-foreground/40 border border-border/40 rounded px-2 py-0.5">
                  {item.tag}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {item.detail}
              </p>
              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground/30">Progress</span>
                  <span className="text-xs text-muted-foreground/30">{item.progress}%</span>
                </div>
                <div className="h-1 w-full rounded-full bg-border/40 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[var(--accent-green)]/50"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Preparing for */}
      <motion.div custom={5} variants={fadeUp} initial="hidden" animate="show" className="mb-10">
        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40 mb-4">
          Preparing for
        </p>
        <div className="flex flex-col gap-3">
          {[
            {
              title: "Graduation",
              detail: "Final year of CS. Done in ~20 days. Moving to Dehradun to work independently full-time.",
              countdown: "~20 days",
            },
            {
  title: "Contract & Remote Work",
  detail: "Open to part-time remote Internships, or contracts — AI integrations, full-stack MVPs, and product management — to fund the runway while building Nexra.",
  countdown: "open now",
},
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4 rounded-lg border border-border/40 bg-card p-5">
              <div className="shrink-0 rounded-md border border-border/50 bg-background px-2.5 py-1.5 text-center min-w-[72px]">
                <p className="text-xs font-mono text-[var(--accent-green)] font-medium leading-none">
                  {item.countdown}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Outside work */}
      <motion.div custom={6} variants={fadeUp} initial="hidden" animate="show" className="mb-16">
        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40 mb-4">
          Outside work
        </p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "📷 Nature photography", href: "/photography" },
            { label: "🇯🇵 Learning Japanese", href: null },
            { label: "✍️ Build in public on X", href: "https://x.com/Annu66126617" },
          ].map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-border/50 bg-card px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-border transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                key={item.label}
                className="inline-flex items-center rounded-full border border-border/50 bg-card px-4 py-2 text-xs text-muted-foreground"
              >
                {item.label}
              </span>
            )
          )}
        </div>
      </motion.div>

    </div>
  );
}