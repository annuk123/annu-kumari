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

const focusAreas = [
  {
    number: "01",
    title: "Robotics & Embedded Systems",
    description:
      "Building physical systems with microcontrollers, sensors, actuators, and custom firmware. My current work focuses on ESP32 and Arduino-based prototypes, robot behaviors, motion sensing, displays, and hardware interaction.",
    technologies: [
      "ESP32",
      "Arduino",
      "Embedded C/C++",
      "Sensors & Actuators",
    ],
  },
  {
    number: "02",
    title: "Intelligent Machines",
    description:
      "Exploring how software and AI can make physical systems more aware, responsive, and interactive. I'm interested in perception, computer vision, behavioral systems, and machines that can sense and respond to their environment.",
    technologies: [
      "AI",
      "Computer Vision",
      "Machine Perception",
      "Behavior Systems",
    ],
  },
  {
    number: "03",
    title: "Software & AI Systems",
    description:
      "Building software systems across the frontend and backend — from responsive interfaces and APIs to AI integrations and full-stack products.",
    technologies: [
      "Python",
      "Next.js",
      "FastAPI",
      "TypeScript",
      "AI APIs",
    ],
  },
  {
    number: "04",
    title: "CAD & Physical Design",
    description:
      "Learning and applying digital design tools to turn hardware concepts into physical prototypes. Currently exploring CAD, 3D modeling, and enclosure design as part of my robotics work.",
    technologies: [
      "Fusion 360",
      "Blender",
      "CAD",
      "3D Design",
    ],
  },
];

const opportunities = [
  "Frontend Engineering",
  "Backend Engineering",
  "Full-Stack Engineering",
  "Robotics",
  "Embedded Systems",
  "IoT",
  "AI / Intelligent Systems",
];

export default function ServicesPage() {
  return (
    <section
      id="services"
      className="mx-auto max-w-3xl px-6 pt-32 pb-24"
    >
      {/* Header */}
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/40"
      >
        Technical Focus
      </motion.p>

      <motion.h2
        custom={1}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-3 text-3xl font-bold tracking-tight"
      >
        Building across hardware & software
      </motion.h2>

      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-16 max-w-lg text-sm leading-relaxed text-muted-foreground"
      >
        I'm exploring the full stack of intelligent machines — from electronics
        and embedded firmware to software, AI, and physical design.
      </motion.p>

      {/* Focus Areas */}
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
              {/* Number */}
              <span className="mt-1 w-6 shrink-0 font-mono text-xs text-muted-foreground/30">
                {area.number}
              </span>

              {/* Content */}
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

      {/* Open to Opportunities */}
      <motion.div
        custom={8}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-14 rounded-lg border border-[var(--accent-green)]/20 bg-[var(--accent-green)]/[0.03] p-7"
      >
        <div className="mb-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--accent-green)]/60">
            Opportunities
          </p>

          <h3 className="mb-2 text-base font-semibold text-foreground">
            Open to engineering opportunities
          </h3>

          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            I'm looking for opportunities where I can contribute, learn, and
            build across software, robotics, embedded systems, IoT, and
            intelligent machines.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-1.5">
          {opportunities.map((opportunity) => (
            <span
              key={opportunity}
              className="inline-flex items-center rounded border border-[var(--accent-green)]/15 px-2.5 py-1 text-xs text-[var(--accent-green)]/65"
            >
              {opportunity}
            </span>
          ))}
        </div>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          Get in touch
        </Link>
      </motion.div>
    </section>
  );
}
