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

const ArrowUpRight = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const milestones = [
  { label: "Hiragana", done: true },
  { label: "Katakana", done: true },
  { label: "Basic vocab", done: true },
  { label: "N5 grammar", done: false },
  { label: "N5 exam", done: false },
];

export default function JapaneseSection() {
  return (
    <section id="japanese" className="mx-auto max-w-3xl px-6 py-20 border-t border-border/30">
      <motion.p
        custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40 mb-4"
      >
        日本語
      </motion.p>

      <motion.h2
        custom={1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="text-2xl font-bold tracking-tight mb-3"
      >
        Learning Japanese in public
      </motion.h2>

      <motion.p
        custom={2} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="text-muted-foreground text-sm leading-relaxed mb-12 max-w-md"
      >
        Documenting the full journey from zero — daily videos on YouTube and Instagram.
        No shortcuts, no fluency claims. Just honest progress.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Progress card */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="rounded-lg border border-border/50 bg-card p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40">
              Progress
            </p>
            <span className="text-xs font-mono text-[var(--accent-green)]">3 / 5</span>
          </div>

          <div className="flex flex-col gap-3">
            {milestones.map((m) => (
              <div key={m.label} className="flex items-center gap-3">
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  m.done
                    ? "border-[var(--accent-green)] bg-[var(--accent-green)]/10"
                    : "border-border/50"
                }`}>
                  {m.done && (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4L3 5.5L6.5 2" stroke="var(--accent-green)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className={`text-sm ${m.done ? "text-foreground" : "text-muted-foreground/40"}`}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-6 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground/30">Overall</span>
              <span className="text-xs text-muted-foreground/30">55%</span>
            </div>
            <div className="h-1 w-full  rounded-full bg-border/40 overflow-hidden">
              <div className="h-full rounded-full bg-[var(--accent-green)]/50" style={{ width: "15%" }} />
            </div>
          </div>
        </motion.div>

        {/* Follow along card */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="flex flex-col gap-3"
        >
          {/* YouTube */}
          <Link
            href="https://www.youtube.com/@LinguaWithAnnu"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-4 rounded-lg border border-border/50 bg-card p-5 hover:border-border transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="text-muted-foreground/50 group-hover:text-[var(--accent-green)] transition-colors mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">YouTube</p>
                <p className="text-xs text-muted-foreground/50">@LinguaWithAnnu · Daily videos</p>
              </div>
            </div>
            <span className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors shrink-0 mt-0.5">
              <ArrowUpRight />
            </span>
          </Link>

          {/* Instagram */}
          <Link
            href="https://www.instagram.com/anniee0203"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-4 rounded-lg border border-border/50 bg-card p-5 hover:border-border transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="text-muted-foreground/50 group-hover:text-[var(--accent-green)] transition-colors mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Instagram</p>
                <p className="text-xs text-muted-foreground/50">@anniee0203 · Daily clips</p>
              </div>
            </div>
            <span className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors shrink-0 mt-0.5">
              <ArrowUpRight />
            </span>
          </Link>

          {/* Quote */}
          <div className="rounded-lg border border-border/40 bg-card/50 p-5">
            <p className="text-2xl mb-2">日本語を勉強しています</p>
            <p className="text-xs text-muted-foreground/40">
              "I am studying Japanese" — and doing it every single day.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}