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
    title: "Computer Vision & AI",
    description:
      "Exploring perception, intelligent behavior, and the ways AI can make physical systems more aware and responsive. I'm interested in computer vision, machine perception, behavioral systems, and intelligent interaction.",
    technologies: [
      "Computer Vision",
      "AI",
      "Machine Perception",
      "Behavior Systems",
    ],
  },
  {
    number: "03",
    title: "CAD & 3D Design",
    description:
      "Learning and applying digital design tools to turn hardware concepts into physical prototypes. Currently exploring CAD, 3D modeling, enclosure design, and mechanical concepts alongside my robotics work.",
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

export default function NowPage() {
  return (
    <section
      id="now"
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
        Now
      </motion.p>

      <motion.h2
        custom={1}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-3 text-3xl font-bold tracking-tight"
      >
        What I&apos;m focused on right now
      </motion.h2>

      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-4 max-w-lg text-sm leading-relaxed text-muted-foreground"
      >
        Building, learning, and experimenting across robotics, embedded
        systems, software, AI, and physical design.
      </motion.p>

      <motion.p
        custom={3}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-16 text-xs text-muted-foreground/40"
      >
        September 2026 · Ranchi, India · live snapshot
      </motion.p>

      {/* Building */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-14"
      >
        <p className="mb-5 text-xs font-medium uppercase tracking-widest text-muted-foreground/40">
          Building
        </p>

        <div className="rounded-lg border border-border/50 bg-card p-7">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-green)]" />
                <span className="text-xs font-medium uppercase tracking-widest text-[var(--accent-green)]/60">
                  Current build
                </span>
              </div>

              <h3 className="text-base font-semibold text-foreground">
                Desktop Companion Robot
              </h3>
            </div>

            <span className="shrink-0 rounded border border-border px-2 py-0.5 text-xs text-muted-foreground/60">
              Robotics
            </span>
          </div>

          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            Building and iterating on an ESP32-based desktop companion robot
            with expressive OLED eyes, motion sensing, servo movement, touch
            interaction, proximity sensing, and custom behavioral logic.
          </p>

          <div className="flex flex-wrap gap-1.5">
            {[
              "ESP32",
              "OLED",
              "MPU6050",
              "Servo",
              "Touch",
              "Ultrasonic",
              "Embedded C/C++",
            ].map((technology) => (
              <span
                key={technology}
                className="inline-flex items-center rounded border border-border px-2 py-0.5 text-xs text-muted-foreground/60"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Learning & Exploring */}
      <motion.div
        custom={5}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-14"
      >
        <p className="mb-5 text-xs font-medium uppercase tracking-widest text-muted-foreground/40">
          Learning &amp; Exploring
        </p>

        <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-border/50">
          {focusAreas.map((area, i) => (
            <motion.div
              key={area.number}
              custom={i + 6}
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
      </motion.div>

      {/* Next */}
      <motion.div
        custom={10}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-14"
      >
        <p className="mb-5 text-xs font-medium uppercase tracking-widest text-muted-foreground/40">
          Next
        </p>

        <div className="rounded-lg border border-border/50 bg-card p-7">
          <h3 className="mb-3 text-base font-semibold text-foreground">
            More physical prototypes
          </h3>

          <p className="text-sm leading-relaxed text-muted-foreground">
            Expanding from the current desktop robot into more robotics and
            IoT experiments, including drones, mobile systems, computer vision,
            and eventually more advanced human-machine interfaces and
            bionic-style systems.
          </p>
        </div>
      </motion.div>

      {/* Open to Opportunities */}
      <motion.div
        custom={11}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-14 rounded-lg border border-[var(--accent-green)]/20 bg-[var(--accent-green)]/[0.03] p-7"
      >
        <div className="mb-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--accent-green)]/60">
            Opportunities
          </p>

          <h3 className="mb-2 text-base font-semibold text-foreground">
            Open to engineering opportunities
          </h3>

          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            I&apos;m looking for opportunities where I can contribute, learn,
            and build across software, robotics, embedded systems, IoT, and
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

      {/* Outside Work */}
      <motion.div
        custom={12}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className="mb-5 text-xs font-medium uppercase tracking-widest text-muted-foreground/40">
          Outside Work
        </p>

        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <span>Nature photography</span>
          <span>Japanese</span>
          <span>Building in public</span>
        </div>
      </motion.div>
    </section>
  );
}
