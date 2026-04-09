// import Link from "next/link";

// export default function Projects() {
//   return (
//     <main className="max-w-xl mx-auto px-6 py-16 space-y-8">
//       <p className="font-medium">Projects</p>

//       <p className="leading-relaxed">
//         A small selection of projects I’ve worked on. I typically
//         focus on one primary project at a time and keep others
//         intentionally limited.
//       </p>

//       {/* Nexra */}
//       <div className="space-y-2">
//         <p className="font-medium">Nexra</p>
//         <p className="leading-relaxed">
//           An early-stage AI project focused on improving startup
//           idea validation and early distribution clarity.
//         </p>
//         <p className="text-sm">
//           Status: Active · <Link id="color" href="https://nexra.pixelui.studio/">Website</Link>
//         </p>
//       </div>

//       {/* RemindMe */}
//       <div className="space-y-2">
//         <p className="font-medium">RemindMe</p>
//         <p className="leading-relaxed">
//           A lightweight reminder product built to explore simple
//           workflows and user retention at small scale.
//         </p>
//         <p className="text-sm">
//           Status: MVP / Paused ·{" "}
//           <Link id="color" href="https://remindme.pixelui.studio/">Website</Link>
//         </p>
//       </div>

//       {/* AlgoFlow */}
//       <div className="space-y-2">
//         <p className="font-medium">AlgoFlow</p>
//         <p className="leading-relaxed">
//           A learning tool for data structures and algorithms,
//           focused on step-by-step visualizations of code and
//           execution flow.
//         </p>
//         <p className="text-sm">
//           Status: MVP / Paused ·{" "}
//           <Link id="color" href="https://www.algoflux.tech/">Website</Link>
//         </p>
//       </div>

//       {/* UICrate */}
//       <div className="space-y-2">
//         <p className="font-medium">UICrate</p>
//         <p className="leading-relaxed">
//           A curated collection of UI components and design
//           references built to reduce time spent searching for
//           common interface patterns.
//         </p>
//         <p className="text-sm">
//           Status: MVP / Paused ·{" "}
//           <Link id="color" href="https://www.pixelui.studio/">Website</Link>
//         </p>
//       </div>
//     </main>
//   );

// }
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

const projects = [
  {
    name: "Nexra",
    year: "2024 — present",
    description:
      "AI thinking partner for solo founders. Challenges assumptions, pokes holes in ideas, and pushes back — instead of validating everything you say.",
    stack: ["Next.js", "FastAPI", "GPT-4.1-mini", "PostgreSQL", "SSE Streaming"],
    status: "active",
    href: "https://nexralab.com",
  },
  {
    name: "RemindMe",
    year: "2024",
    description:
      "Lightweight reminder tool built to explore simple workflow automation and user retention mechanics at small scale.",
    stack: ["Next.js", "PostgreSQL"],
    status: "paused",
    href: "https://remindme.pixelui.studio/",
  },
  {
    name: "AlgoFlow",
    year: "2023",
    description:
      "Step-by-step DSA visualizer. Helps developers understand algorithms through execution flow rather than just reading theory.",
    stack: ["React", "Visualization"],
    status: "paused",
    href: "https://www.algoflux.tech/",
  },
  {
    name: "UICrate",
    year: "2023",
    description:
      "Curated UI component library. Built to cut the time founders waste searching for common interface patterns.",
    stack: ["Next.js", "Tailwind CSS"],
    status: "paused",
    href: "https://www.pixelui.studio/",
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

export default function ProjectsPage() {
  return (
    <div id="projects" className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40 mb-4"
      >
        Projects
      </motion.p>

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-3xl font-bold tracking-tight mb-3"
      >
        Things I've built
      </motion.h1>

      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-muted-foreground text-sm leading-relaxed mb-16 max-w-md"
      >
        I focus on one primary project at a time. Everything else is paused
        intentionally — not abandoned.
      </motion.p>

      {projects
        .filter((p) => p.status === "active")
        .map((project, i) => (
          <motion.div
            key={project.name}
            custom={i + 3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-4"
          >
            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg border border-[var(--accent-green)]/20 bg-[var(--accent-green)]/[0.03] p-7 transition-all hover:border-[var(--accent-green)]/40 hover:bg-[var(--accent-green)]/[0.05]"
            >
              <div className="flex items-start justify-between gap-4 mb-1">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-foreground group-hover:text-[var(--accent-green)] transition-colors">
                    {project.name}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border border-[var(--accent-green)]/25 text-[var(--accent-green)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-green)] animate-pulse" />
                    active
                  </span>
                </div>
                <span className="text-muted-foreground/40 group-hover:text-[var(--accent-green)] transition-colors">
                  <ArrowUpRight />
                </span>
              </div>

              <p className="text-xs text-muted-foreground/40 mb-4">
                {project.year}
              </p>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded px-2 py-0.5 text-xs border border-[var(--accent-green)]/15 text-[var(--accent-green)]/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}

      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex items-center gap-4 my-8"
      >
        <div className="h-px flex-1 bg-border/60" />
        <span className="text-xs text-muted-foreground/30 tracking-widest uppercase">
          Previous
        </span>
        <div className="h-px flex-1 bg-border/60" />
      </motion.div>

      <div className="flex flex-col divide-y divide-border/40">
        {projects
          .filter((p) => p.status === "paused")
          .map((project, i) => (
            <motion.div
              key={project.name}
              custom={i + 5}
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <Link
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-6 py-6 opacity-60 hover:opacity-80 transition-opacity"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-sm font-semibold text-foreground">
                      {project.name}
                    </span>
                    <span className="text-xs text-muted-foreground/40">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded px-2 py-0.5 text-xs border border-border text-muted-foreground/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="mt-0.5 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                  <ArrowUpRight />
                </span>
              </Link>
            </motion.div>
          ))}
      </div>
    </div>
  );
}