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

const hardwareProjects = [
  {
    name: "Desktop Companion Robot",
    year: "2026",
    category: "Robotics · Embedded Systems",
    description:
      "Expressive desktop robot prototype built around ESP32. Combines an OLED-based animated face, MPU6050 motion sensing, servo control, touch and proximity interaction, and custom behavioral logic.",
    stack: [
      "ESP32",
      "Embedded C/C++",
      "MPU6050",
      "OLED",
      "Servo",
      "Sensors",
    ],
  },
  {
    name: "Smart Room Locker",
    year: "2026",
    description:
      "RFID-based smart locker prototype using authentication, servo actuation, OLED feedback, and buzzer alerts. Built as an embedded access-control system.",
    stack: [
      "Arduino",
      "RFID",
      "Servo",
      "OLED",
      "Buzzer",
      "Embedded C/C++",
    ],
  },
  {
    name: "Automatic Room Lighting",
    year: "2026",
    description:
      "Ambient-light automation system using an LDR to control room lighting, with RGB LED status feedback, buzzer alerts, and OLED output.",
    stack: [
      "Arduino",
      "LDR",
      "RGB LED",
      "LED",
      "OLED",
      "Buzzer",
      "Embedded C/C++",
    ],
  },
];

const softwareProjects = [
  {
    name: "Nexra",
    year: "2025 — 2026",
    description:
      "AI thinking partner for solo founders. Challenges assumptions, pokes holes in ideas, and pushes back instead of simply validating them.",
    stack: [
      "Next.js",
      "TypeScript",
      "Digital Ocean",
      "FastAPI",
      "GPT APIs",
      "PostgreSQL",
      "SSE Streaming",
    ],
    href: "https://nexralab.com",
  },
  {
    name: "RemindMe",
    year: "2025",
    description:
      "Lightweight reminder tool built to explore workflow automation and user retention mechanics at small scale.",
    stack: ["Next.js", "TypeScript", "Shadcn", "Convex DB"],
    href: "https://remind-me-iot.vercel.app/",
  },
  {
    name: "AlgoFlow",
    year: "2025",
    description:
      "Step-by-step DSA visualizer that helps developers understand algorithms through execution flow rather than static theory.",
    stack:  ["Next.js", "TypeScript", "Shadcn", "Convex DB"],
    href: "https://algoflow-three.vercel.app/",
  },
  {
    name: "UICrate",
    year: "2025",
    description:
      "Curated UI component library built to reduce the time founders spend searching for common interface patterns.",
    stack:  ["Next.js", "TypeScript", "Shadcn", "Convex DB"],
    href: "https://pixelui-room.vercel.app/",
  },
];

const ArrowUpRight = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path
      d="M2.5 11.5L11.5 2.5M11.5 2.5H4.5M11.5 2.5V9.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SectionLabel = ({
  number,
  children,
}: {
  number: string;
  children: string;
}) => (
  <div className="flex items-center gap-3">
    <span className="text-xs font-medium tracking-widest text-[var(--accent-green)]/50">
      {number}
    </span>

    <span className="text-xs uppercase tracking-widest text-muted-foreground/40">
      {children}
    </span>
  </div>
);

export default function ProjectsPage() {
  return (
    <section
      id="projects"
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
        Projects
      </motion.p>

      <motion.h2
        custom={1}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-3 text-3xl font-bold tracking-tight"
      >
        Things I've built
      </motion.h2>

      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-20 max-w-lg text-sm leading-relaxed text-muted-foreground"
      >
        I build across hardware and software — from embedded systems and
        robotics prototypes to AI-powered products.
      </motion.p>

      {/* Hardware & Robotics */}
      <div className="mb-24">
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-6"
        >
          <SectionLabel number="01">Hardware & Robotics</SectionLabel>
        </motion.div>

        {/* Featured robot */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-4"
        >
          <div className="group rounded-lg border border-[var(--accent-green)]/20 bg-[var(--accent-green)]/[0.03] p-7 transition-all hover:border-[var(--accent-green)]/40 hover:bg-[var(--accent-green)]/[0.05]">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <div className="mb-2 flex flex-wrap items-baseline gap-3">
                  <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-[var(--accent-green)]">
                    {hardwareProjects[0].name}
                  </h3>

                  <span className="text-xs text-muted-foreground/40">
                    {hardwareProjects[0].year}
                  </span>
                </div>

                <span className="text-xs uppercase tracking-widest text-[var(--accent-green)]/50">
                  {hardwareProjects[0].category}
                </span>
              </div>

              <span className="text-[var(--accent-green)]/40 transition-colors group-hover:text-[var(--accent-green)]">
                <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[var(--accent-green)]" />
              </span>
            </div>

            <p className="mb-5 mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {hardwareProjects[0].description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {hardwareProjects[0].stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded border border-[var(--accent-green)]/15 px-2 py-0.5 text-xs text-[var(--accent-green)]/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Other hardware projects */}
        <div className="flex flex-col divide-y divide-border/40">
          {hardwareProjects.slice(1).map((project, i) => (
            <motion.div
              key={project.name}
              custom={i + 5}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="group py-7">
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-baseline gap-3">
                      <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-[var(--accent-green)]">
                        {project.name}
                      </h3>

                      <span className="text-xs text-muted-foreground/40">
                        {project.year}
                      </span>
                    </div>

                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded border border-border px-2 py-0.5 text-xs text-muted-foreground/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Software & AI */}
      <div>
        <motion.div
          custom={7}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-6"
        >
          <SectionLabel number="02">Software & AI</SectionLabel>
        </motion.div>

        <div className="flex flex-col divide-y divide-border/40">
          {softwareProjects.map((project, i) => (
            <motion.div
              key={project.name}
              custom={i + 8}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-7 transition-opacity hover:opacity-90"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-baseline gap-3">
                      <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-[var(--accent-green)]">
                        {project.name}
                      </h3>

                      <span className="text-xs text-muted-foreground/40">
                        {project.year}
                      </span>
                    </div>

                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded border border-border px-2 py-0.5 text-xs text-muted-foreground/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="mt-1 text-muted-foreground/30 transition-colors group-hover:text-[var(--accent-green)]">
                    <ArrowUpRight />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

