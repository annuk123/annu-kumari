"use client";

import { useState } from "react";
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

const socials = [
  { label: "X", href: "https://x.com/@Annu_NexraAI" },
  { label: "GitHub", href: "https://github.com/annuk123" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/annu-kumari-540337237/",
  },
  { label: "YouTube", href: "https://www.youtube.com/@nexralab-ai" },
  { label: "Instagram", href: "https://www.instagram.com/solopreneur_annu" },
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

export default function ContactPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = `mailto:annu@nexralab.com?subject=Hello from ${encodeURIComponent(
    name || "your website"
  )}&body=${encodeURIComponent(message)}`;

  return (
    <section
      id="contact"
      className="mx-auto max-w-3xl px-6 pt-32 pb-24"
    >
      {/* Header */}
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/40"
      >
        Contact
      </motion.p>

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mb-3 text-3xl font-bold tracking-tight"
      >
        Let's build something
      </motion.h1>

      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mb-12 max-w-lg text-sm leading-relaxed text-muted-foreground"
      >
        I'm open to engineering opportunities, interesting collaborations,
        and projects across software, robotics, embedded systems, IoT, and AI.
      </motion.p>

      {/* Two column layout */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {/* Left — message box */}
        <div className="flex flex-col gap-4 rounded-lg border border-border/50 bg-card p-6">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground/40">
            Send a message
          </p>

          <div className="flex flex-1 flex-col gap-3">
            <div>
              <label className="mb-1.5 block text-xs text-muted-foreground/50">
                Your name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-md border border-border/50 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/30 transition-colors focus:border-border focus:outline-none"
              />
            </div>

            <div className="flex-1">
              <label className="mb-1.5 block text-xs text-muted-foreground/50">
                Message
              </label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me what you're working on..."
                rows={7}
                className="w-full resize-none rounded-md border border-border/50 bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/30 transition-colors focus:border-border focus:outline-none"
              />
            </div>
          </div>

          <Link
            href={mailtoHref}
            className="inline-flex w-full items-center justify-center rounded-md bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Send via email
          </Link>

          <p className="text-center text-xs text-muted-foreground/30">
            Opens your mail client
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4">
          {/* Opportunities */}
          <div className="rounded-lg border border-[var(--accent-green)]/20 bg-[var(--accent-green)]/[0.03] p-6">
            <div className="mb-5">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-[var(--accent-green)]/60">
                Opportunities
              </p>

              <h3 className="mb-2 text-base font-semibold text-foreground">
                Open to engineering opportunities
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">
                I'm looking for opportunities where I can contribute, learn,
                and build across software, robotics, embedded systems, IoT,
                and intelligent machines.
              </p>
            </div>

            <div className="mb-5 flex flex-wrap gap-1.5">
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
              href="mailto:annu@nexralab.com?subject=Engineering opportunity"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              Get in touch
              <ArrowUpRight />
            </Link>
          </div>

{/* Current project */}

  <div className="mb-3 flex items-start justify-between">
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-green)]/25 px-2.5 py-0.5 text-xs font-medium text-[var(--accent-green)]">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent-green)]" />
      Current build
    </span>

    <span className="text-muted-foreground/30 transition-colors group-hover:text-[var(--accent-green)]">
      <ArrowUpRight />
    </span>
  </div>

  <p className="mb-1.5 text-sm font-semibold text-foreground transition-colors group-hover:text-[var(--accent-green)]">
    Desktop Companion Robot
  </p>

  <p className="mb-4 text-xs leading-relaxed text-muted-foreground/60">
    An expressive desktop robot built around ESP32, combining animated OLED
    eyes, motion sensing, servo control, touch, proximity, and behavioral
    interaction.
  </p>

  <div className="flex flex-wrap gap-1.5">
    {["ESP32", "OLED", "MPU6050", "Servo", "Sensors"].map((technology) => (
      <span
        key={technology}
        className="inline-flex items-center rounded border border-border px-2 py-0.5 text-xs text-muted-foreground/60"
      >
        {technology}
      </span>
    ))}
  </div>


          {/* Socials */}
          <div className="rounded-lg border border-border/50 bg-card p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/40">
              Follow the journey
            </p>

            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-border/50 bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                >
                  {social.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
