"use client";

import { motion } from "framer-motion";

const ACCENT = "#D9A85F";

type Project = {
  id: string;
  name: string;
  summary: string;
  parts: { label: string; value: string }[];
  github: string;
  image?: string; // e.g. "/projects/eva.jpg"
  status?: string;
};

const featured: Project = {
  id: "PRJ-01",
  name: "EVA",
  summary:
    "ESP32 voice assistant. A MEMS microphone captures audio over I2S, the ESP32 streams it to a Python backend, and the reply plays back through an I2S amplifier and speaker, with status on an OLED.",
  parts: [
    { label: "MCU", value: "ESP32" },
    { label: "AUDIO IN", value: "INMP441 · I2S" },
    { label: "AUDIO OUT", value: "MAX98357A · I2S" },
    { label: "DISPLAY", value: "SSD1306 · I2C" },
    { label: "BACKEND", value: "Python · FastAPI · HTTP" },

  ],
  github: "https://github.com/annuk123/EVA",
  status: "In development",
};

const robot: Project = {
  id: "PRJ-02",
  name: "Pega",
  summary:
    "Desktop robot that senses distance, touch, and motion, and responds with servo movement and OLED output.",
  parts: [
    { label: "MCU", value: "ESP32" },
    { label: "SENSORS", value: "Ultrasonic · Touch · MPU6050" },
    { label: "ACTUATOR", value: "Servo" },
    { label: "DISPLAY", value: "OLED" },
  ],
  github: "https://github.com/annuk123/Pega",
};

const small: Project[] = [
  {
    id: "PRJ-03",
    name: "Smart Home Locker",
    summary: "RFID card unlocks a servo latch, with OLED status and buzzer/LED feedback.",
    parts: [
      { label: "MCU", value: "Arduino" },
      { label: "IO", value: "RFID · Servo · OLED · Buzzer · LED" },
    ],
    github: "https://github.com/annuk123/Smart-Home-Locker",
  },
  {
    id: "PRJ-04",
    name: "Tilt LED Indicator",
    summary: "Tilt the board left, center, or right and the matching LED lights up. Seven LEDs plus an OLED readout.",
    parts: [
      { label: "MCU", value: "Arduino" },
      { label: "IO", value: "MPU6050 · 7× LED · OLED" },
    ],
    github: "https://github.com/annuk123/Tilt-LED-Indicator",
  },
  {
    id: "PRJ-05",
    name: "Light Sensing Switch",
    summary: "LDR detects a phone flashlight and switches the LED off. Live light readings shown on the OLED.",
    parts: [
      { label: "MCU", value: "Arduino" },
      { label: "IO", value: "LDR · LED · OLED" },
    ],
    github: "https://github.com/annuk123/Light-Sensing-Switch",
  },
];


function Video({ src, name }: { src: string; name: string }) {
  return (
    <iframe
      src={src}
      title={`${name} hardware demonstration`}
      className="h-full w-full border-0"
      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}


function PartsTable({ parts }: { parts: Project["parts"] }) {
  return (
    <dl className="divide-y divide-white/10 border-y border-white/10">
      {parts.map((p) => (
        <div key={p.label} className="flex gap-4 py-2.5 text-[13px]">
          <dt className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 pt-0.5">
            {p.label}
          </dt>
          <dd className="text-white/80">{p.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function GithubLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-[#D9A85F]"
    >
      Source on GitHub ↗
    </a>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em]"
      style={{
        color: ACCENT,
        borderColor: "rgba(217,168,95,0.3)",
        background: "rgba(217,168,95,0.07)",
      }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
      {children}
    </span>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-[#0B0D10] py-24 text-[#E6E6E6]">
      <div className="mx-auto max-w-6xl px-6">
        {/* heading */}
        <div className="mb-12 flex items-end justify-between border-b border-white/15 pb-5">
          <div>
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ACCENT }}>
            // Projects
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Things I&apos;ve wired, flashed, and debugged.
            </h2>
          </div>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 sm:block">
            05 builds
          </span>
        </div>

        {/* featured: EVA */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="grid overflow-hidden rounded-xl border border-white/20 lg:grid-cols-2"
        >
          <div className="aspect-[4/3] border-b border-white/15 lg:border-b-0 lg:border-r">
            <Video
  src="https://player.cloudinary.com/embed/?cloud_name=vn7phby8&public_id=WhatsApp_Video_2026-11-10_at_10.25.44_PM"
  name="EVA"
/>
          </div>
          <div className="flex flex-col p-6 sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                {featured.id} · Featured
              </span>
              {featured.status && <Tag>{featured.status}</Tag>}
            </div>
            <h3 className="text-2xl font-semibold text-white">{featured.name}</h3>
            <p className="mt-3 mb-6 text-sm leading-7 text-white/60">{featured.summary}</p>
            <PartsTable parts={featured.parts} />
            <div className="mt-6">
              <GithubLink href={featured.github} />
            </div>
          </div>
        </motion.article>

        {/* Pega */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mt-6 grid overflow-hidden rounded-xl border border-white/20 lg:grid-cols-2"
        >
          <div className="order-2 flex flex-col p-6 sm:p-8 lg:order-1">
            <span className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
              {robot.id} · Robotics
            </span>
            <h3 className="text-2xl font-semibold text-white">{robot.name}</h3>
            <p className="mt-3 mb-6 text-sm leading-7 text-white/60">{robot.summary}</p>
            <PartsTable parts={robot.parts} />
            <div className="mt-6">
              <GithubLink href={robot.github} />
            </div>
          </div>
          <div className="order-1 aspect-[4/3] border-b border-white/15 lg:order-2 lg:border-b-0 lg:border-l">
            <Video
  src="https://player.cloudinary.com/embed/?cloud_name=vn7phby8&public_id=WhatsApp_Video_2026-11-10_at_10.26.37_PM"
  name="Pega"
/>
          </div>
        </motion.article>

        {/* compact builds */}
        <div className="mb-3 mt-14 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
          Sensor &amp; control builds
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {small.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="flex flex-col rounded-lg border border-white/15 p-5 transition-colors hover:border-[#D9A85F]/50"
            >
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                {p.id}
              </div>
              <h3 className="text-lg font-semibold text-white">{p.name}</h3>
              <p className="mt-2 mb-5 flex-1 text-[13px] leading-6 text-white/55">{p.summary}</p>
              <PartsTable parts={p.parts} />
              <div className="mt-4">
                <GithubLink href={p.github} />
              </div>
            </motion.article>
          ))}
        </div>

        {/* earlier software work */}
<div className="mb-3 mt-14 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
  Earlier software work
</div>
<ul className="divide-y divide-white/10 border-y border-white/10">
  {[
    {
      name: "Nexra",
      line: "AI thinking partner for solo founders. Finds the weakest link in a strategy and suggests next steps for the following 7–14 days.",
      href: "https://www.nexralab.com/",
    },
    {
      name: "AlgoFlow",
      line: "Interactive DSA visualizer with sorting, graph, stack and DP animations, LeetCode walkthroughs, and playback controls.",
      href: "https://algoflow-three.vercel.app/",
    },
    {
      name: "Qflows",
      line: "Code execution visualizer showing the AST, step-by-step execution, heap, memory, and the event queue.",
      href: "https://qflows-annukumari.vercel.app/",
    },
    {
      name: "UICrate",
      line: "Library of customizable UI components and website sections for frontend developers.",
      href: "https://pixelui-room.vercel.app/",
    },
  ].map((p) => (
    <li key={p.name}>
      <a
        href={p.href}
        target="_blank"
        rel="noreferrer"
        className="group flex items-baseline gap-4 py-3.5 text-[13px] transition-colors"
      >
        <span className="w-24 shrink-0 font-semibold text-white/85 group-hover:text-[#D9A85F]">
          {p.name}
        </span>
        <span className="flex-1 leading-6 text-white/50">{p.line}</span>
        <span className="font-mono text-[11px] text-white/35 group-hover:text-[#D9A85F]">↗</span>
      </a>
    </li>
  ))}
</ul>
      </div>
    </section>
  );
}
