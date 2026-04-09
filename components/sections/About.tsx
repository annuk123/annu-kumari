"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const stack = [
  { label: "Next.js", highlight: true },
  { label: "FastAPI", highlight: true },
  { label: "GPT / Claude APIs", highlight: true },
  { label: "MVP Building", highlight: true },
  { label: "PostgreSQL", highlight: false },
  { label: "Vercel", highlight: false },
  { label: "Digital Ocean", highlight: false },
  { label: "Tailwind CSS", highlight: false },
  { label: "TypeScript", highlight: false },
  { label: "Python", highlight: false },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-20">
      {/* Section label */}
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-xs font-medium tracking-widest uppercase text-muted-foreground/50 mb-10"
      >
        About
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-12">
        {/* Left — text */}
        <div className="space-y-5 max-w-lg">
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-base leading-relaxed text-foreground"
          >
            I'm a final-year student turned solopreneur. I build and ship
            products independently — currently focused on{" "}
            <span className="text-[var(--accent-green)]">Nexra</span>, an AI
            thinking partner that challenges founders instead of just validating
            them.
          </motion.p>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-base leading-relaxed text-muted-foreground"
          >
            On the side, I take contract work — AI integrations, full-stack
            MVPs, and social media systems for startups and solo founders. I
            move fast, communicate clearly, and ship working products.
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-base leading-relaxed text-muted-foreground"
          >
            Based in Dehradun, India. Building in public on{" "}
            <a
              href="https://x.com/Annu66126617"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
            >
              X
            </a>{" "}
            and{" "}
            <a
              href="https://www.youtube.com/@nexralab-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
            >
              YouTube
            </a>
            .
          </motion.p>
        </div>
      </div>

      {/* Stack */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-12"
      >
        <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/50 mb-4">
          Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <span
              key={item.label}
              className={
                item.highlight
                  ? "inline-flex items-center rounded-md px-3 py-1 text-xs font-medium border border-[var(--accent-green)]/20 text-[var(--accent-green)] bg-[var(--accent-green)]/5"
                  : "inline-flex items-center rounded-md px-3 py-1 text-xs font-medium border border-border text-muted-foreground"
              }
            >
              {item.label}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
