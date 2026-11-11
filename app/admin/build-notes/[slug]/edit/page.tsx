"use client";

import { use, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import MarkdownBody from "@/components/MarkdownBody";

const ACCENT = "#D9A85F";

const inputClass =
  "w-full rounded-lg border border-white/20 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#D9A85F] focus:outline-none";

type Status = "idle" | "saving" | "saved" | "error";

export default function EditBuildNote({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();

  const post = useQuery(api.buildNotes.getBySlugAdmin, { slug });
  const update = useMutation(api.buildNotes.update);
  const togglePublished = useMutation(api.buildNotes.togglePublished);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const loadedRef = useRef(false);
  const latest = useRef({ title, summary, content });
  latest.current = { title, summary, content };

  /* load from the server once, never overwrite later edits */
  useEffect(() => {
    if (!post || loadedRef.current) return;
    loadedRef.current = true;
    setTitle(post.title);
    setSummary(post.summary);
    setContent(post.content);
  }, [post]);

  const save = useCallback(async () => {
    if (!post) return false;
    const snapshot = latest.current;
    if (!snapshot.title.trim()) {
      setError("Title is required.");
      setStatus("error");
      return false;
    }
    setStatus("saving");
    setError(null);
    try {
      await update({
        id: post._id,
        title: snapshot.title.trim(),
        summary: snapshot.summary,
        content: snapshot.content,
      });
      const now = latest.current;
      setDirty(
        now.title !== snapshot.title ||
          now.summary !== snapshot.summary ||
          now.content !== snapshot.content
      );
      setStatus("saved");
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
      setStatus("error");
      return false;
    }
  }, [post, update]);

  /* autosave: drafts only, 2s after you stop typing */
  useEffect(() => {
    if (!dirty || !post || post.published) return;
    const t = setTimeout(() => {
      void save();
    }, 2000);
    return () => clearTimeout(t);
  }, [dirty, title, summary, content, post, save]);

  /* warn before closing with unsaved changes */
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  async function handleTogglePublish() {
    if (!post) return;
    if (dirty && !(await save())) return;
    try {
      await togglePublished({ id: post._id, published: !post.published });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change status.");
      setStatus("error");
    }
  }

  async function handleSaveAndView() {
    if (await save()) router.push(`/admin/build-notes/${slug}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      void save();
    }
  }

  if (post === undefined) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="h-8 w-64 animate-pulse rounded-lg bg-white/[0.04]" />
      </div>
    );
  }
  if (!post) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10 font-mono text-[12px] text-white/50">
        {"// note not found"}
      </div>
    );
  }

  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const statusText =
    status === "saving"
      ? "Saving…"
      : status === "error"
      ? "Not saved"
      : dirty
      ? post.published
        ? "Unsaved changes"
        : "Autosaves in a moment…"
      : status === "saved"
      ? "Saved"
      : "";

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-5">
        <div>
          <div
            className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
            {"// Edit build note"} · {post.published ? "Published" : "Draft"}
          </div>
          <h1 className="text-2xl font-semibold text-white">
            {title || "Untitled"}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em]">
          <span className="text-white/40">{statusText}</span>
          <Link
            href={`/admin/build-notes/${slug}`}
            className="rounded-md border border-white/20 px-3 py-2 text-white/65 transition-colors hover:border-[#D9A85F] hover:text-[#D9A85F]"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleTogglePublish}
            className="rounded-md border border-white/20 px-3 py-2 text-white/65 transition-colors hover:border-[#D9A85F] hover:text-[#D9A85F]"
          >
            {post.published ? "Unpublish" : "Publish"}
          </button>
          <button
            type="button"
            onClick={handleSaveAndView}
            disabled={status === "saving"}
            className="rounded-md px-4 py-2 font-semibold text-[#0B0D10] transition-colors hover:bg-white disabled:opacity-50"
            style={{ background: ACCENT }}
          >
            Save &amp; view
          </button>
        </div>
      </div>

      {post.published && (
        <p className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 font-mono text-[12px] text-amber-200">
          This note is published. Autosave is off, and Save changes the live page.
        </p>
      )}

      {error && (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 font-mono text-[12px] text-red-300">
          {error}
        </p>
      )}

      <div className="space-y-3">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setDirty(true);
          }}
          placeholder="Title"
          className={inputClass}
        />
        <input
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value);
            setDirty(true);
          }}
          placeholder="Summary (shown in the list)"
          className={inputClass}
        />
        <div className="flex justify-between font-mono text-[11px] text-white/40">
          <span>/notes/build/{slug}</span>
          <span>
            {words} words · {readingTime} min read
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <textarea
          value={content}
          onKeyDown={onKeyDown}
          onChange={(e) => {
            setContent(e.target.value);
            setDirty(true);
          }}
          placeholder="Write in markdown…"
          className="h-[560px] w-full resize-none rounded-lg border border-white/20 bg-transparent p-4 font-mono text-[13px] leading-6 text-white placeholder:text-white/30 focus:border-[#D9A85F] focus:outline-none"
        />
        <MarkdownBody className="h-[560px] overflow-auto rounded-lg border border-white/20 p-6">
          {content || "*Preview appears here…*"}
        </MarkdownBody>
      </div>

      <p className="font-mono text-[11px] text-white/35">
        Ctrl/Cmd + S saves. Drafts autosave 2 seconds after you stop typing.
      </p>
    </main>
  );
}