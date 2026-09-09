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
    <path
      d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const focusAreas = [
  {
    number: "01",
    title: "American English Accent",
    description:
      "Spending time improving my American English pronunciation, rhythm, intonation, and natural speech patterns.",
    technologies: [
      "Pronunciation",
      "Intonation",
      "Rhythm",
      "Connected Speech",
    ],
  },
  {
    number: "02",
    title: "Speaking Practice",
    description:
      "Practicing spoken English regularly to become clearer, more natural, and more confident when communicating in technical and everyday conversations.",
    technologies: [
      "Speaking",
      "Listening",
      "Conversation",
      "Fluency",
    ],
  },
];

export default function AmericanAccentSection() {
  return (
    <section
      id="american-accent"
      className="mx-auto max-w-3xl px-6 py-20 border-t border-border/30"
    >
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/40"
      >
        Communication
      </motion.p>

      <motion.h2
        custom={1}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-3 text-2xl font-bold tracking-tight"
      >
        Working on my American English accent
      </motion.h2>

      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-12 max-w-md text-sm leading-relaxed text-muted-foreground"
      >
        Improving how I speak, listen, and communicate in English — with a
        particular focus on American pronunciation, rhythm, and natural speech.
      </motion.p>

      <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-border/50">
        {focusAreas.map((area, i) => (
          <motion.div
            key={area.number}
            custom={i + 3}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="group border-b border-border/50 bg-card p-7 transition-colors last:border-b-0 hover:bg-card/60"
          >
            <div className="flex items-start gap-6">
              <span className="mt-1 w-6 shrink-0 font-mono text-xs text-muted-foreground/30">
                {area.number}
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="mb-3 text-base font-semibold text-foreground transition-colors group-hover:text-[var(--accent-green)]">
                  {area.title}
                </h3>

                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                  {area.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {area.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="inline-flex items-center rounded border border-border px-2 py-0.5 text-xs text-muted-foreground/60"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        custom={6}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-8 rounded-lg border border-border/40 bg-card/50 p-5"
      >
        <p className="mb-2 text-sm font-semibold text-foreground">
          Why I'm working on it
        </p>

        <p className="text-sm leading-relaxed text-muted-foreground">
          Good communication matters when building, collaborating, and working
          with people across different countries and cultures. I'm treating
          speaking as another skill to continuously improve through practice.
        </p>
      </motion.div>

      <motion.div
        custom={7}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-8 flex flex-wrap gap-3"
      >
        <Link
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-md border border-border/50 bg-card px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border hover:text-foreground"
        >
          Speaking practice
          <span className="text-muted-foreground/30 transition-colors group-hover:text-muted-foreground">
            <ArrowUpRight />
          </span>
        </Link>
      </motion.div>
    </section>
  );
}
