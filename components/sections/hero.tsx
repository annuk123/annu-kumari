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
    <section id="home" className="mx-auto max-w-4xl px-6 pt-36 pb-24">
      {/* Status */}
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

        <span className="text-xs font-medium tracking-wide text-[var(--accent-green)]">
          Building at the intersection of robotics & AI
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
      >
        I build intelligent
        <br />
        <span className="text-[var(--accent-green)]">
          machines & systems.
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        Robotics and embedded systems builder exploring the intersection of
        hardware, software, sensors, and AI. I learn by building—from
        experimental robots and IoT systems to intelligent machines.
      </motion.p>

      {/* CTAs */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex flex-wrap items-center gap-3"
      >
        <a
          href="#projects"
          className="inline-flex items-center justify-center rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          Explore my work
        </a>

        <a
          href="#about"
          className="inline-flex items-center justify-center rounded-md border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          About me
        </a>
      </motion.div>

      {/* Focus areas */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-20"
      >
        <div className="mb-4 text-xs uppercase tracking-widest text-muted-foreground/50">
          Current focus
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span>Robotics</span>
          <span>Embedded Systems</span>
          <span>IoT</span>
          <span>Computer Vision</span>
          <span>AI</span>
        </div>
      </motion.div>

      {/* Location */}
      <motion.div
        custom={5}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-12 flex items-center gap-4"
      >
        <div className="h-px flex-1 bg-border" />

        <span className="text-xs uppercase tracking-widest text-muted-foreground/50">
          Ranchi, India
        </span>

        <div className="h-px flex-1 bg-border" />
      </motion.div>
    </section>
  );
}