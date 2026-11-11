"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

const ACCENT = "#D9A85F";

const btn =
  "rounded-md border border-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/65 transition-colors hover:border-[#D9A85F] hover:text-[#D9A85F] disabled:opacity-50";

export default function AdminControls({
  postId,
  slug,
  published,
}: {
  postId: Id<"buildNotes">;
  slug: string;
  published: boolean;
}) {
  const router = useRouter();
  const togglePublished = useMutation(api.buildNotes.togglePublished);
  const remove = useMutation(api.buildNotes.remove);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(action: () => Promise<unknown>, after?: () => void) {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await action();
      after?.();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  function onToggle() {
    const ok = window.confirm(
      published ? "Unpublish this note?" : "Publish this note?"
    );
    if (!ok) return;
    void run(() => togglePublished({ id: postId, published: !published }));
  }

  function onDelete() {
    const ok = window.confirm("Delete this build note permanently?");
    if (!ok) return;
    void run(
      () => remove({ id: postId }),
      () => router.push("/admin/build-notes")
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="mr-2 font-mono text-[10px] uppercase tracking-[0.16em]"
          style={published ? { color: ACCENT } : { color: "rgba(255,255,255,0.4)" }}
        >
          {published ? "Published" : "Draft"}
        </span>

        <Link href={`/admin/build-notes/${slug}/edit`} className={btn}>
          Edit
        </Link>

        <button type="button" onClick={onToggle} disabled={busy} className={btn}>
          {published ? "Unpublish" : "Publish"}
        </button>

        <button
          type="button"
          onClick={onDelete}
          disabled={busy}
          className="rounded-md border border-white/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/65 transition-colors hover:border-red-400/60 hover:text-red-300 disabled:opacity-50"
        >
          Delete
        </button>
      </div>

      {error && (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 font-mono text-[11px] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}