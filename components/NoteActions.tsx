"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

const ACCENT = "#D9A85F";
const KEY = "visitor:id";

function useVisitorId() {
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    try {
      let v = localStorage.getItem(KEY);
      if (!v) {
        v = crypto.randomUUID();
        localStorage.setItem(KEY, v);
      }
      setId(v);
    } catch {
      setId(crypto.randomUUID()); // storage blocked: works for this visit only
    }
  }, []);
  return id;
}

const btn =
  "inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/65 transition-colors hover:border-[#D9A85F] hover:text-[#D9A85F]";

export default function NoteActions({
  noteId,
  title,
  likeCount,
  viewCount,
}: {
  noteId: Id<"buildNotes">;
  title: string;
  likeCount: number;
  viewCount: number;
}) {
  const visitorId = useVisitorId();
  const liked = useQuery(
    api.engagement.hasLiked,
    visitorId ? { noteId, visitorId } : "skip"
  );
  const toggleLike = useMutation(api.engagement.toggleLike);
  const recordView = useMutation(api.engagement.recordView);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (visitorId) void recordView({ noteId, visitorId }).catch(() => {});
  }, [visitorId, noteId, recordView]);

  async function onLike() {
    if (!visitorId) return;
    try {
      await toggleLike({ noteId, visitorId });
    } catch {
      /* ignore */
    }
  }

  async function onShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onLike}
        aria-pressed={!!liked}
        className={btn}
        style={liked ? { color: ACCENT, borderColor: ACCENT } : undefined}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? ACCENT : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M12 21s-7-4.4-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.6-9.5 9-9.5 9z" />
        </svg>
        {likeCount}
      </button>

      <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        {viewCount}
      </span>

      <button type="button" onClick={onShare} className={btn}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v14" />
        </svg>
        {copied ? "Link copied" : "Share"}
      </button>
    </div>
  );
}