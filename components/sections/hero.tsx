"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  return (
    <section id="home" className="mx-auto max-w-3xl px-6 pt-36 pb-24">
      {/* Available badge */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mb-8 inline-flex items-center gap-2"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-green)] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-green)]" />
        </span>
        <span className="text-xs font-medium text-[var(--accent-green)] tracking-wide">
          Open to contract work
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.08] mb-6"
      >
        I build AI products
        <br />
        <span className="text-[var(--accent-green)]">that ship fast.</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10"
      >
        Solopreneur & self-taught builder{" "}
        <Link
          href="https://nexralab.com"
          target="_blank"
          className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors text-[var(--accent-green)]"
        >
          Nexra
        </Link>{" "}
        — an AI thinking partner for founders. Available for contract work in AI
        integrations, MVP development, and social media systems.
      </motion.p>

      {/* CTAs */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex flex-wrap items-center gap-3"
      >
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-foreground text-background text-sm font-medium px-5 py-2.5 transition-opacity hover:opacity-85"
        >
          Work with me
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center justify-center rounded-md border border-border text-sm font-medium px-5 py-2.5 text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/30"
        >
          See my work
        </Link>
      </motion.div>

      {/* Subtle divider */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-20 flex items-center gap-4"
      >
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground/50 tracking-widest uppercase">
          Ranchi, India
        </span>
        <div className="h-px flex-1 bg-border" />
      </motion.div>
    </section>
  );
}
