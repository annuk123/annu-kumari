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

const services = [
  {
    number: "01",
    title: "MVP Development",
    description:
      "Full-stack web products built fast. I take an idea from zero to a deployed, working product — Next.js frontend, FastAPI backend, database, auth, deployment. No bloat, no unnecessary complexity.",
    deliverables: [
      "Working deployed product",
      "Clean, documented codebase",
      "2–4 week turnaround",
    ],
  },
  {
    number: "02",
    title: "AI Integrations",
    description:
      "Plug GPT, Claude, or custom LLM workflows into your existing product or build one from scratch. I've built streaming AI responses, custom system prompts, topic guards, URL readers, and multi-turn conversation modes.",
    deliverables: [
      "LLM API integration",
      "Custom prompt engineering",
      "Streaming & real-time responses",
    ],
  },
  {
    number: "03",
    title: "Social Media Systems",
    description:
      "Build-in-public strategy, content systems, and founder brand building on X, LinkedIn, and YouTube. I don't just post — I help you build a repeatable system that compounds over time.",
    deliverables: [
      "Content strategy & calendar",
      "Platform-specific copy",
      "Build-in-public frameworks",
    ],
  },
  {
  number: "04",
  title: "Data Annotation",
  description:
    "Accurate, consistent data labeling for AI and ML projects. Text classification, intent labeling, entity tagging, and content moderation. Fast turnaround, attention to edge cases.",
  deliverables: [
    "Text & intent annotation",
    "Entity & sentiment labeling",
    "Quality-checked datasets",
  ],
},
];

export default function ServicesPage() {
  return (
    <div id="services" className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      {/* Header */}
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40 mb-4"
      >
        Services
      </motion.p>

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-3xl font-bold tracking-tight mb-3"
      >
        Available for contract work
      </motion.h1>

      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-muted-foreground text-sm leading-relaxed mb-16 max-w-md"
      >
        I take on part-time and short-term contracts alongside my own projects.
        Fast communication, clean work, no hand-holding needed.
      </motion.p>

      {/* Services */}
      <div className="flex flex-col gap-px border border-border/50 rounded-lg overflow-hidden">
        {services.map((service, i) => (
          <motion.div
            key={service.number}
            custom={i + 3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="group bg-card p-7 hover:bg-card/60 transition-colors border-b border-border/50 last:border-b-0"
          >
            <div className="flex items-start gap-6">
              {/* Number */}
              <span className="text-xs font-mono text-muted-foreground/30 mt-1 w-6 shrink-0">
                {service.number}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-foreground mb-3">
                  {service.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {service.description}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {service.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-xs text-muted-foreground/60"
                    >
                      <span className="w-1 h-1 rounded-full bg-[var(--accent-green)]/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        custom={7}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-lg border border-border/50 bg-card p-7"
      >
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">
            Ready to work together?
          </p>
          <p className="text-sm text-muted-foreground">
            I'm currently available for part-time contracts.
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 inline-flex items-center justify-center rounded-md bg-foreground text-background text-sm font-medium px-5 py-2.5 transition-opacity hover:opacity-85"
        >
          Get in touch
        </Link>
      </motion.div>
    </div>
  );
}