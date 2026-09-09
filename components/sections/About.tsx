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
  { label: "Robotics", highlight: true },
  { label: "Embedded Systems", highlight: true },
  { label: "ESP32", highlight: true },
  { label: "Arduino", highlight: true },
  { label: "Embedded C/C++", highlight: true },
  { label: "Python", highlight: true },
  { label: "Sensors & Actuators", highlight: false },
  { label: "Fusion 360", highlight: false },
  { label: "Blender", highlight: false },
  { label: "CAD / 3D Design", highlight: false },
  { label: "IoT", highlight: false },
  { label: "Computer Vision", highlight: false },
  { label: "AI", highlight: false },
  { label: "Next.js", highlight: false },
  { label: "TypeScript", highlight: false },
  { label: "FastAPI", highlight: false },
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
        className="mb-10 text-xs font-medium uppercase tracking-widest text-muted-foreground/50"
      >
        About
      </motion.p>

      <div className="grid grid-cols-1 gap-12 sm:grid-cols-[1fr_auto]">
        {/* Left — text */}
        <div className="max-w-lg space-y-5">
          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-base leading-relaxed text-foreground"
          >
            I'm a robotics and embedded systems builder exploring the
            intersection of{" "}
            <span className="text-[var(--accent-green)]">
              hardware, software, and AI
            </span>
            . I learn by building — designing prototypes, connecting sensors
            and actuators, writing firmware, and turning ideas into working
            systems.
          </motion.p>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-base leading-relaxed text-muted-foreground"
          >
            My current work ranges from expressive desktop robots and IoT
            experiments to AI-powered software products. I'm particularly
            interested in machines that can sense, understand, and interact
            with the world around them.
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-base leading-relaxed text-muted-foreground"
          >
            I also build software products independently, including{" "}
            <span className="text-foreground">Nexra</span>, while continuing
            to explore robotics, embedded systems, computer vision, and
            intelligent machines.
          </motion.p>

          <motion.p
            custom={4}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-base leading-relaxed text-muted-foreground"
          >
            Based in Ranchi, India. Building in public on{" "}
            <a
              href="https://x.com/@Annu_NexraAI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground"
            >
              X
            </a>{" "}
            and{" "}
            <a
              href="https://www.youtube.com/@nexralab-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground"
            >
              YouTube
            </a>
            .
          </motion.p>
        </div>
      </div>

      {/* Stack */}
      <motion.div
        custom={5}
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-12"
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/50">
          Technical Focus
        </p>

        <div className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <span
              key={item.label}
              className={
                item.highlight
                  ? "inline-flex items-center rounded-md border border-[var(--accent-green)]/20 bg-[var(--accent-green)]/5 px-3 py-1 text-xs font-medium text-[var(--accent-green)]"
                  : "inline-flex items-center rounded-md border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
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