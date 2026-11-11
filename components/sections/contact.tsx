"use client";

import { motion } from "framer-motion";

const ACCENT = "#D9A85F";

const links = [
  { label: "EMAIL", value: "annu@nexralab.com", href: "mailto:annu@nexralab.com" },
  { label: "GITHUB", value: "github.com/annuk123", href: "https://github.com/annuk123" },
  { label: "LINKEDIN", value: "linkedin.com/in/annu-kumari-540337237/", href: "linkedin.com/in/annu-kumari-540337237/" },
  { label: "RESUME", value: "Download PDF", href: "https://drive.google.com/file/d/1ZZeHWg5fzn2B9rVe2U7UQwVs9I1EajpP/view?usp=drive_link" },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-[#0B0D10] py-24 text-[#E6E6E6]">
      <div className="mx-auto max-w-6xl px-6">
        {/* heading */}
        <div className="mb-12 border-b border-white/15 pb-5">
          <div
            className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
             // Contact
          </div>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            If it has a microcontroller in it,{" "}
            <span style={{ color: ACCENT }}>I&apos;m interested.</span>
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* text */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{
                color: ACCENT,
                borderColor: "rgba(217,168,95,0.3)",
                background: "rgba(217,168,95,0.07)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
              Open to opportunities
            </span>

            <p className="max-w-md text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
              Looking for embedded, IoT, and robotics roles, internships, and
              collaborations. If you&apos;re building something with sensors,
              firmware, or a robot in it, send me a message. Email is the
              fastest way to reach me.
            </p>

            <a
              href="mailto:annu@nexralab.com"
              className="mt-8 inline-block rounded-md px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#0B0D10] transition-colors hover:bg-white"
              style={{ background: ACCENT }}
            >
              Send an email
            </a>
          </motion.div>

          {/* link table */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="self-start overflow-hidden rounded-xl border border-white/20"
          >
            <div className="border-b border-white/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
              Contact details
            </div>
            <ul className="divide-y divide-white/10">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-baseline gap-4 px-4 py-4 transition-colors hover:bg-white/[0.03]"
                  >
                    <span className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                      {l.label}
                    </span>
                    <span className="flex-1 text-[13px] text-white/85 group-hover:text-[#D9A85F]">
                      {l.value}
                    </span>
                    <span className="font-mono text-[11px] text-white/35 group-hover:text-[#D9A85F]">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* footer line */}
        <div className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          <span>Annu · {new Date().getFullYear()}</span>
          <span>{"// flashed and shipped"}</span>
        </div>
      </div>
    </section>
  );
}