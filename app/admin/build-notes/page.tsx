"use client";

import { useState } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

const ACCENT = "#D9A85F";

const btn =
  "rounded-md border border-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/65 transition-colors hover:border-[#D9A85F] hover:text-[#D9A85F]";

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BuildNotesList() {
  const notes = useQuery(api.buildNotes.listAdmin);
  const togglePublished = useMutation(api.buildNotes.togglePublished);
  const remove = useMutation(api.buildNotes.remove);
  const [error, setError] = useState<string | null>(null);

  async function onToggle(id: Id<"buildNotes">, published: boolean) {
    setError(null);
    try {
      await togglePublished({ id, published: !published });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not change status.");
    }
  }

  async function onDelete(id: Id<"buildNotes">, title: string) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setError(null);
    try {
      await remove({ id });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete.");
    }
  }

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-10">
      <div className="flex items-end justify-between border-b border-white/15 pb-5">
        <div>
          <div
            className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
            {"// Build notes"}
          </div>
          <h1 className="text-2xl font-semibold text-white">All entries</h1>
        </div>
        <Link
          href="/admin/build-notes/new"
          className="rounded-md px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#0B0D10] transition-colors hover:bg-white"
          style={{ background: ACCENT }}
        >
          New note
        </Link>
      </div>

      {error && (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 font-mono text-[12px] text-red-300">
          {error}
        </p>
      )}

      {notes === undefined && (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-white/[0.04]" />
          ))}
        </div>
      )}

      {notes && notes.length === 0 && (
        <p className="font-mono text-[12px] text-white/40">
          {"// no entries yet. Write your first one."}
        </p>
      )}

      {notes && notes.length > 0 && (
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {notes.map((n) => (
            <li
              key={n._id}
              className="flex flex-wrap items-center justify-between gap-4 py-4"
            >
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/build-notes/${n.slug}`}
                  className="block truncate text-[15px] font-semibold text-white/90 transition-colors hover:text-[#D9A85F]"
                >
                  {n.title}
                </Link>
                <div className="mt-1 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  <span style={n.published ? { color: ACCENT } : undefined}>
                    {n.published ? "Published" : "Draft"}
                  </span>
                  <span>{formatDate(n.createdAt)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link href={`/admin/build-notes/${n.slug}/edit`} className={btn}>
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => onToggle(n._id, n.published)}
                  className={btn}
                >
                  {n.published ? "Unpublish" : "Publish"}
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(n._id, n.title)}
                  className="rounded-md border border-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/65 transition-colors hover:border-red-400/60 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}