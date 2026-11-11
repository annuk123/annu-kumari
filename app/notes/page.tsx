"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import Link from "next/link";

const ACCENT = "#D9A85F";

type View = "build" | "notes";

const tabs: { id: View; label: string }[] = [
  { id: "build", label: "Build notes" },
  { id: "notes", label: "Short notes" },
];

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BuildLog() {
  const [view, setView] = useState<View>("build");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("notes:view");
      if (saved === "build" || saved === "notes") setView(saved);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("notes:view", view);
    } catch {
      /* storage unavailable */
    }
  }, [view]);

  // undefined = still loading (or skipped), array = loaded
  const notes = useQuery(api.notes.list, view === "notes" ? {} : "skip");
  const buildNotes = useQuery(
    api.buildNotes.listPublished,
    view === "build" ? {} : "skip"
  );

  const isLoading = view === "build" ? buildNotes === undefined : notes === undefined;

  return (
    <section id="build-log" className="bg-[#0B0D10] py-24 text-[#E6E6E6]">
      <div className="mx-auto max-w-6xl px-6">
        {/* heading */}
        <div className="mb-10 border-b border-white/15 pb-5">
          <div
            className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
             // Build log
          </div>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            What broke, and{" "}
            <span style={{ color: ACCENT }}>how I fixed it.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
            Notes from the bench: wiring mistakes, firmware bugs, and things I
            would do differently next time.
          </p>
        </div>

        {/* tabs */}
        <div className="mb-8 flex gap-1 border-b border-white/10">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setView(t.id)}
              aria-pressed={view === t.id}
              className={`-mb-px border-b-2 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                view === t.id
                  ? "text-white"
                  : "border-transparent text-white/45 hover:text-white/80"
              }`}
              style={view === t.id ? { borderColor: ACCENT } : undefined}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="max-w-3xl">
          {/* loading */}
          {isLoading && (
            <div className="flex flex-col gap-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded-lg bg-white/[0.04]" />
              ))}
            </div>
          )}

          {/* build notes */}
          {!isLoading && view === "build" && (
            <>
              {buildNotes && buildNotes.length === 0 ? (
                <p className="font-mono text-[12px] text-white/40">
                  {"// no entries yet"}
                </p>
              ) : (
                <ul className="divide-y divide-white/10 border-y border-white/10">
                  {buildNotes?.map((note, i) => (
                    <motion.li
                      key={note._id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <Link
                        href={`/notes/build/${note.slug}`}
                        className="group flex items-start justify-between gap-6 py-5"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="mb-1.5 text-[15px] font-semibold text-white/90 transition-colors group-hover:text-[#D9A85F]">
                            {note.title}
                          </p>
                          <p className="mb-2 line-clamp-2 text-[13px] leading-6 text-white/55">
                            {note.summary}
                          </p>
                          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                            {formatDate(note.createdAt)}
                          </p>
                        </div>
                        <span className="mt-1 font-mono text-[12px] text-white/35 transition-colors group-hover:text-[#D9A85F]">
                          ↗
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* short notes */}
          {!isLoading && view === "notes" && (
            <>
              {notes && notes.length === 0 ? (
                <p className="font-mono text-[12px] text-white/40">
                  {"// no notes yet"}
                </p>
              ) : (
                <ul className="divide-y divide-white/10 border-y border-white/10">
                  {notes?.map((note, i) => (
                    <motion.li
                      key={note._id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="py-5"
                    >
                      <p className="mb-2 text-[13px] leading-6 text-white/65">
                        {note.content}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                        {formatDate(note.createdAt)}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}