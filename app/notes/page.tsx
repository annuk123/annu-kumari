"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";

type View = "build" | "notes";

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

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

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

export default function Notes() {
  const [view, setView] = useState<View>("build");

  useEffect(() => {
    const saved = localStorage.getItem("notes:view") as View | null;
    if (saved === "build" || saved === "notes") setView(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes:view", view);
  }, [view]);

  const notes = useQuery(api.notes.list, view === "notes" ? {} : "skip") ?? [];
  const buildNotes =
    useQuery(api.buildNotes.listPublished, view === "build" ? {} : "skip") ?? [];

  const isLoading =
    (view === "notes" && notes === undefined) ||
    (view === "build" && buildNotes === undefined);

  return (
    <div id="notes" className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-xs font-medium tracking-widest uppercase text-muted-foreground/40 mb-4"
      >
        Notes
      </motion.p>

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-3xl font-bold tracking-tight mb-3"
      >
        Build notes & thoughts
      </motion.h1>

      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="text-muted-foreground text-sm leading-relaxed mb-10 max-w-md"
      >
        Writing about building Nexra, distribution, AI, and the solopreneur
        path. Honest, unfiltered.
      </motion.p>

      {/* Tabs */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="flex items-center gap-1 mb-12 border-b border-border/40"
      >
        {(["build", "notes"] as View[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setView(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              view === tab
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === "build" ? "Build Notes" : "Short Notes"}
          </button>
        ))}
      </motion.div>

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 rounded-lg bg-card/50 animate-pulse" />
          ))}
        </div>
      )}

      {/* Build Notes */}
      {!isLoading && view === "build" && (
        <>
          {buildNotes.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing published yet. Check back soon.</p>
          ) : (
            <div className="flex flex-col divide-y divide-border/40">
              {buildNotes.map((note, i) => (
                <motion.div
                  key={note._id}
                  custom={i + 4}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                >
                  <Link
                    href={`/notes/build/${note.slug}`}
                    className="group flex items-start justify-between gap-6 py-6"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground group-hover:text-(--accent-green) transition-colors mb-1.5">
                        {note.title}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-2">
                        {note.summary}
                      </p>
                      <p className="text-xs text-muted-foreground/40">
                        {formatDate(note.createdAt)}
                      </p>
                    </div>
                    <span className="mt-1 text-muted-foreground/30 group-hover:text-muted-foreground transition-colors">
                      <ArrowUpRight />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Short Notes */}
      {!isLoading && view === "notes" && (
        <>
          {notes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No notes yet.</p>
          ) : (
            <div className="flex flex-col divide-y divide-border/40">
              {notes.map((note, i) => (
                <motion.div
                  key={note._id}
                  custom={i + 4}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="py-5"
                >
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {note.content}
                  </p>
                  <p className="text-xs text-muted-foreground/40">
                    {formatDate(note.createdAt)}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}