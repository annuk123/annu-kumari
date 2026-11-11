// "use client";

// import { motion } from "framer-motion";

// const fadeUp = {
//   hidden: { opacity: 0, y: 16 },
//   show: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.08,
//       duration: 0.5,
//       ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
//     },
//   }),
// };

// const stack = [
//   { label: "Robotics", highlight: true },
//   { label: "Embedded Systems", highlight: true },
//   { label: "ESP32", highlight: true },
//   { label: "Arduino", highlight: true },
//   { label: "Embedded C/C++", highlight: true },
//   { label: "Python", highlight: true },
//   { label: "Sensors & Actuators", highlight: false },
//   { label: "Fusion 360", highlight: false },
//   { label: "Blender", highlight: false },
//   { label: "CAD / 3D Design", highlight: false },
//   { label: "IoT", highlight: false },
//   { label: "Computer Vision", highlight: false },
//   { label: "AI", highlight: false },
//   { label: "Next.js", highlight: false },
//   { label: "TypeScript", highlight: false },
//   { label: "FastAPI", highlight: false },
// ];

// export default function About() {
//   return (
//     <section id="about" className="mx-auto max-w-3xl px-6 py-20">
//       {/* Section label */}
//       <motion.p
//         custom={0}
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true }}
//         className="mb-10 text-xs font-medium uppercase tracking-widest text-muted-foreground/50"
//       >
//         About
//       </motion.p>

//       <div className="grid grid-cols-1 gap-12 sm:grid-cols-[1fr_auto]">
//         {/* Left — text */}
//         <div className="max-w-lg space-y-5">
//           <motion.p
//             custom={1}
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className="text-base leading-relaxed text-foreground"
//           >
//             I'm a robotics and embedded systems builder exploring the
//             intersection of{" "}
//             <span className="text-[var(--accent-green)]">
//               hardware, software, and AI
//             </span>
//             . I learn by building — designing prototypes, connecting sensors
//             and actuators, writing firmware, and turning ideas into working
//             systems.
//           </motion.p>

//           <motion.p
//             custom={2}
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className="text-base leading-relaxed text-muted-foreground"
//           >
//             My current work ranges from expressive desktop robots and IoT
//             experiments to AI-powered software products. I'm particularly
//             interested in machines that can sense, understand, and interact
//             with the world around them.
//           </motion.p>

//           <motion.p
//             custom={3}
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className="text-base leading-relaxed text-muted-foreground"
//           >
//             I also build software products independently, including{" "}
//             <span className="text-foreground">Nexra</span>, while continuing
//             to explore robotics, embedded systems, computer vision, and
//             intelligent machines.
//           </motion.p>

//           <motion.p
//             custom={4}
//             variants={fadeUp}
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className="text-base leading-relaxed text-muted-foreground"
//           >
//             Based in Ranchi, India. Building in public on{" "}
//             <a
//               href="https://x.com/@Annu_NexraAI"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-foreground underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground"
//             >
//               X
//             </a>{" "}
//             and{" "}
//             <a
//               href="https://www.youtube.com/@nexralab-ai"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-foreground underline underline-offset-4 decoration-border transition-colors hover:decoration-foreground"
//             >
//               YouTube
//             </a>
//             .
//           </motion.p>
//         </div>
//       </div>

//       {/* Stack */}
//       <motion.div
//         custom={5}
//         variants={fadeUp}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true }}
//         className="mt-12"
//       >
//         <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground/50">
//           Technical Focus
//         </p>

//         <div className="flex flex-wrap gap-2">
//           {stack.map((item) => (
//             <span
//               key={item.label}
//               className={
//                 item.highlight
//                   ? "inline-flex items-center rounded-md border border-[var(--accent-green)]/20 bg-[var(--accent-green)]/5 px-3 py-1 text-xs font-medium text-[var(--accent-green)]"
//                   : "inline-flex items-center rounded-md border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
//               }
//             >
//               {item.label}
//             </span>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   );
// }

"use client";

import { motion } from "framer-motion";

const ACCENT = "#D9A85F";

const specs = [
  { label: "MICROCONTROLLERS", value: "ESP32 · Arduino" },
  { label: "SENSORS", value: "MPU6050 · Ultrasonic · Touch · LDR · RFID" },
  { label: "INTERFACES", value: "I2C · I2S · PWM · Wi-Fi / HTTP" },
  { label: "LANGUAGES", value: "C / C++ · Python" },
  { label: "CAD", value: "SolidWorks · Fusion 360" },
  { label: "BACKEND", value: "FastAPI" },
  { label: "EXPLORING", value: "Robotics · Computer vision · AI/ML" },
  { label: "WEB", value: "Next.js · TypeScript · Node.js · FastAPI · PostgreSQL · Prisma · Convex" },
];

export default function About() {
  return (
    <section id="about" className="bg-[#0B0D10] py-24 text-[#E6E6E6]">
      <div className="mx-auto max-w-6xl px-6">
        {/* heading */}
        <div className="mb-12 border-b border-white/15 pb-5">
          <div
            className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
            // About
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Trained to think in systems.{" "}
            <span style={{ color: ACCENT }}>Built to make them run.</span>
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* text */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="space-y-5 text-sm leading-7 text-white/65 sm:text-base sm:leading-8"
          >
            <p>
              I study Production &amp; Industrial Engineering, which taught me
              to see a machine as a system: inputs, processes, feedback, and
              the places where it fails. Embedded hardware is where that
              thinking becomes something I can hold, flash, and debug.
            </p>
            <p>
              I build small connected devices end to end: choosing the parts,
              designing the enclosure in CAD, wiring the circuit, writing the firmware, and connecting it to a
              backend when it needs one. My projects go from simple sensor
              loops to EVA, an ESP32 voice assistant, and Pega, a desktop
              robot.
            </p>
            <p>
              I&apos;m aiming for robotics and embedded work, where hardware,
              firmware, and real-world behavior all have to agree.
            </p>

            {/* education */}
            <div className="mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border border-white/15 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
              <span style={{ color: ACCENT }}>B.Tech</span>
              <span className="text-white/25">/</span>
              <span>Production &amp; Industrial Engineering</span>
              <span className="text-white/25">/</span>
              <span>NIAMT Ranchi · 2022–2026</span>
            </div>
          </motion.div>

          {/* spec table */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="self-start overflow-hidden rounded-xl border border-white/20"
          >
            <div className="flex items-center justify-between border-b border-white/15 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
              <span>Spec sheet</span>
              <span>Rev 2026</span>
            </div>
            <dl className="divide-y divide-white/10">
              {specs.map((s) => (
                <div key={s.label} className="flex gap-4 px-4 py-3.5">
                  <dt className="w-32 shrink-0 pt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                    {s.label}
                  </dt>
                  <dd className="text-[13px] leading-6 text-white/85">{s.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}