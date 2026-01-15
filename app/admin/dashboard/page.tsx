"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const stats = useQuery(api.dashboard.getOverview);
  if (!isLoaded) {
    return <p className="px-6 py-16">Loading…</p>;
  }

  if (!user) {
    return null;
  }



  if (stats === undefined) {
    return <p className="px-6 py-16">Loading dashboard…</p>;
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <header className="space-y-1">
        <h1 className="text-xl font-medium">Dashboard</h1>
        <p className="text-neutral-500 text-sm">
          Overview of your product activity
        </p>
      </header>

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <Stat label="Total build notes" value={stats.totalNotes} />
        <Stat label="Published" value={stats.published} />
        <Stat label="Drafts" value={stats.drafts} />
        <Stat label="Total visits" value={stats.totalViews} />
        <Stat label="Visits today" value={stats.todayViews} />
      </section>
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border p-4 space-y-1">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="text-2xl font-medium">{value}</p>
    </div>
  );
}
