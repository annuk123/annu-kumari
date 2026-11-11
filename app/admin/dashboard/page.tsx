"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const ACCENT = "#D9A85F";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/15 p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-white">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const stats = useQuery(api.dashboard.getOverview);

  return (
    <main className="mx-auto max-w-4xl space-y-10 px-6 py-10">
      <header className="flex items-end justify-between border-b border-white/15 pb-5">
        <div>
          <div
            className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
            {"// Dashboard"}
          </div>
          <h1 className="text-2xl font-semibold text-white">Overview</h1>
        </div>
        <Link
          href="/admin/build-notes/new"
          className="rounded-md px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#0B0D10] transition-colors hover:bg-white"
          style={{ background: ACCENT }}
        >
          New note
        </Link>
      </header>

      {stats === undefined ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-lg bg-white/[0.04]" />
          ))}
        </div>
      ) : (
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Stat label="Total build notes" value={stats.totalNotes} />
          <Stat label="Published" value={stats.published} />
          <Stat label="Drafts" value={stats.drafts} />
          <Stat label="Total visits" value={stats.totalViews} />
          <Stat label="Visits today" value={stats.todayViews} />
        </section>
      )}
    </main>
  );
}