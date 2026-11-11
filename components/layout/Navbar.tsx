"use client";

import { useEffect, useState } from "react";

const ACCENT = "#D9A85F";

const links = [
  { id: "projects", label: "Projects" },
  { id: "build-log", label: "Build log" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

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

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    ["home", ...ids].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export default function Navbar() {
  const time = useISTClock();
  const active = useActiveSection(links.map((l) => l.id));
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#0B0D10]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        {/* name */}
        <a
          href="#home"
          className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-[#D9A85F]"
        >
          Annu
        </a>

        {/* desktop links */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`relative py-5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-white ${
                  isActive ? "text-white" : "text-white/50"
                }`}
              >
                {l.label}
                {isActive && (
                  <span
                    className="absolute inset-x-0 -bottom-px h-0.5"
                    style={{ background: ACCENT }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* right side */}
        <div className="hidden items-center gap-5 md:flex">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] tabular-nums text-white/40">
            IST {time ?? "--:--:--"}
          </span>
          <a
            href="https://drive.google.com/file/d/1ZZeHWg5fzn2B9rVe2U7UQwVs9I1EajpP/view?usp=drive_link"
            className="rounded-md border border-white/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/80 transition-colors hover:border-[#D9A85F] hover:text-[#D9A85F]"
          >
            Resume
          </a>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md border border-white/20 md:hidden"
        >
          <span
            className={`h-px w-4 bg-white transition-transform ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-4 bg-white transition-transform ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* mobile panel */}
      {open && (
        <nav className="border-t border-white/15 bg-[#0B0D10] md:hidden">
          <ul className="mx-auto max-w-6xl divide-y divide-white/10 px-6">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-4 font-mono text-[12px] uppercase tracking-[0.18em] ${
                    active === l.id ? "text-[#D9A85F]" : "text-white/70"
                  }`}
                >
                  {l.label}
                  <span className="text-white/30">→</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href="/resume.pdf"
                className="flex items-center justify-between py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-white/70"
              >
                Resume
                <span className="text-white/30">↗</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}