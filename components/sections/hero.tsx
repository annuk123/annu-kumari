"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const ACCENT = "#D9A85F";

function useISTClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

type DiagramNode = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  detail: string;
  main?: boolean;
};

const nodes: DiagramNode[] = [
  { id: "mic", x: 12, y: 44, width: 130, height: 56, title: "INMP441", detail: "MIC · I2S" },
  { id: "esp32", x: 195, y: 126, width: 130, height: 96, title: "ESP32", detail: "CONTROLLER", main: true },
  { id: "backend", x: 378, y: 44, width: 130, height: 56, title: "PYTHON API", detail: "FASTAPI · HTTP" },
  { id: "display", x: 378, y: 148, width: 130, height: 56, title: "SSD1306", detail: "OLED · I2C" },
  { id: "amp", x: 195, y: 292, width: 130, height: 52, title: "MAX98357A", detail: "AMP · I2S" },
  { id: "speaker", x: 12, y: 260, width: 130, height: 56, title: "SPEAKER", detail: "OUTPUT" },
];

const paths = [
  { id: "p-mic", d: "M142 72 H168 V150 H195", dur: 2.1 },
  { id: "p-api", d: "M325 150 H352 V72 H378", dur: 2.4 },
  { id: "p-oled", d: "M325 174 H378", dur: 1.6 },
  { id: "p-amp", d: "M260 222 V292", dur: 1.8 },
  { id: "p-spk", d: "M195 318 H168 V288 H142", dur: 2.2 },
];

function Diagram() {
  return (
    <svg
      viewBox="0 0 520 360"
      role="img"
      aria-label="EVA system block diagram: microphone, ESP32, Python backend, OLED display, amplifier and speaker"
      className="h-full w-full"
      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
    >
      {paths.map((p, i) => (
        <motion.path
          key={p.id}
          id={p.id}
          d={p.d}
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease: "easeInOut" }}
        />
      ))}

      {nodes.map((n, i) => (
        <motion.g
          key={n.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
        >
          <rect
            x={n.x}
            y={n.y}
            width={n.width}
            height={n.height}
            rx={n.main ? 8 : 5}
            fill="#0B0D10"
            stroke={n.main ? ACCENT : "rgba(255,255,255,0.28)"}
            strokeWidth={n.main ? 1.5 : 1}
          />
          <text
            x={n.x + n.width / 2}
            y={n.y + n.height / 2 - 2}
            textAnchor="middle"
            fontSize={n.main ? 14 : 10}
            fontWeight={600}
            fill={n.main ? ACCENT : "#E6E6E6"}
          >
            {n.title}
          </text>
          <text
            x={n.x + n.width / 2}
            y={n.y + n.height / 2 + 13}
            textAnchor="middle"
            fontSize={7.5}
            fill="rgba(255,255,255,0.45)"
          >
            {n.detail}
          </text>
          {n.main &&
            [0, 1, 2, 3, 4].map((pin) => (
              <g key={pin} stroke={ACCENT} strokeWidth={1}>
                <line x1={n.x + 15 + pin * 25} y1={n.y} x2={n.x + 15 + pin * 25} y2={n.y - 5} />
                <line
                  x1={n.x + 15 + pin * 25}
                  y1={n.y + n.height}
                  x2={n.x + 15 + pin * 25}
                  y2={n.y + n.height + 5}
                />
              </g>
            ))}
        </motion.g>
      ))}

      {paths.map((p, i) => (
        <circle key={`pulse-${p.id}`} r={2.5} fill={ACCENT}>
          <animateMotion dur={`${p.dur}s`} begin={`${1.8 + i * 0.25}s`} repeatCount="indefinite">
            <mpath href={`#${p.id}`} />
          </animateMotion>
        </circle>
      ))}
    </svg>

  );

}

const specs = [
  { label: "MCU", value: "ESP32" },
  { label: "AUDIO", value: "I2S · INMP441 / MAX98357A" },
  { label: "DISPLAY", value: "SSD1306 · I2C" },
  { label: "BACKEND", value: "Python · FastAPI" },
];

export default function Hero() {
  const time = useISTClock();

  return (
    <section id="home" className="relative min-h-screen bg-[#0B0D10] text-[#E6E6E6]">
      {/* faint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6">
        {/* top bar */}
        <header className="flex items-center justify-between border-b border-white/15 py-5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
          <span className="text-white/80">Annu</span>
          <span className="tabular-nums">IST {time ?? "--:--:--"}</span>
        </header>

        {/* main */}
        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{
                color: ACCENT,
                borderColor: "rgba(217,168,95,0.3)",
                background: "rgba(217,168,95,0.07)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
              Embedded · IoT · Robotics
            </div>

            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              I like boards{" "}
              <span style={{ color: ACCENT }}> that boot on the first flash.</span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
              I work at the pin level and the cloud level: wiring the circuit,
              writing the firmware, and building the backend it talks to.
              Currently building EVA, an ESP32 voice assistant.
            </p>

            <div className="mt-9 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.14em]">
              <a
                href="#projects"
                className="rounded-md px-5 py-3 font-semibold text-[#0B0D10] transition-colors hover:bg-white"
                style={{ background: ACCENT }}
              >
                View projects
              </a>
              <a
                href="https://drive.google.com/file/d/1ZZeHWg5fzn2B9rVe2U7UQwVs9I1EajpP/view?usp=drive_link"
                className="rounded-md border border-white/25 px-5 py-3 text-white/75 transition-colors hover:border-[#D9A85F] hover:text-[#D9A85F]"
              >
                Resume
              </a>
            </div>

            <p className="mt-10 font-mono text-[11px] tracking-wide text-white/30">
              {"// 3.3V logic. 5V ambition."}
            </p>
          </div>

          {/* diagram panel */}
          <div className="relative rounded-xl border border-white/20 bg-[#0B0D10]">
            <div className="flex items-center justify-between border-b border-white/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
              <span>EVA / System diagram</span>
              <span
                className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1"
                style={{
                  color: ACCENT,
                  borderColor: "rgba(217,168,95,0.3)",
                  background: "rgba(217,168,95,0.07)",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                In development
              </span>
            </div>
            <div className="aspect-[4/3] p-4">
              <Diagram />
            </div>
              <Link className=" px-4 py-3 font-mono text-[8px] tracking-[0.18em] text-white/50" href={"https://github.com/annuk123/EVA"}>github: https://github.com/annuk123/EVA </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
