"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";

const ACCENT = "#D9A85F";
const DRAFT_KEY = "buildnote:new-draft";

const inputClass =
  "w-full rounded-lg border border-white/20 bg-transparent px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-[#D9A85F] focus:outline-none";

type Tool = {
  label: string;
  run: (api: {
    wrap: (before: string, after?: string, placeholder?: string) => void;
    line: (prefix: string) => void;
  }) => void;
};

const tools: Tool[] = [
  { label: "H2", run: (e) => e.line("## ") },
  { label: "H3", run: (e) => e.line("### ") },
  { label: "Bold", run: (e) => e.wrap("**", "**", "bold text") },
  { label: "Italic", run: (e) => e.wrap("_", "_", "italic text") },
  { label: "Code", run: (e) => e.wrap("`", "`", "code") },
  { label: "Block", run: (e) => e.wrap("```cpp\n", "\n```", "code") },
  { label: "Link", run: (e) => e.wrap("[", "](https://)", "link text") },
  { label: "Image", run: (e) => e.wrap("![", "](https://)", "alt text") },
  { label: "List", run: (e) => e.line("- ") },
  { label: "Quote", run: (e) => e.line("> ") },
];

export default function NewBuildNote() {
  const router = useRouter();
  const create = useMutation(api.buildNotes.create);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [restored, setRestored] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* restore local backup once */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        setTitle(d.title ?? "");
        setSummary(d.summary ?? "");
        setContent(d.content ?? "");
      }
    } catch {
      /* storage unavailable or bad JSON */
    }
    setRestored(true);
  }, []);

  /* back up locally as you type */
  useEffect(() => {
    if (!restored) return;
    const t = setTimeout(() => {
      try {
        if (title || summary || content) {
          localStorage.setItem(DRAFT_KEY, JSON.stringify({ title, summary, content }));
        }
      } catch {
        /* ignore */
      }
    }, 500);
    return () => clearTimeout(t);
  }, [title, summary, content, restored]);

  /* warn before closing with unsaved text */
  useEffect(() => {
    if (!dirty) return;
    const h = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  const slugPreview = useMemo(
    () =>
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    [title]
  );

  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  /* toolbar helpers: work at the cursor, not at the end */
  function wrap(before: string, after = "", placeholder = "") {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e, value } = el;
    const selected = value.slice(s, e) || placeholder;
    setContent(value.slice(0, s) + before + selected + after + value.slice(e));
    setDirty(true);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + selected.length);
    });
  }

  function line(prefix: string) {
    const el = textareaRef.current;
    if (!el) return;
    const { selectionStart: s, value } = el;
    const start = value.lastIndexOf("\n", s - 1) + 1;
    setContent(value.slice(0, start) + prefix + value.slice(start));
    setDirty(true);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + prefix.length, s + prefix.length);
    });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      wrap("  ");
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      void handleSave();
    }
  }

  async function handleSave() {
    if (saving) return;
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const result = await create({ title: title.trim(), summary, content });
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      setDirty(false);
      router.push(`/admin/build-notes/${result.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save. Try again.");
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-6 py-10">
      <div className="flex items-end justify-between border-b border-white/15 pb-5">
        <div>
          <div
            className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
            {"// New build note"}
          </div>
          <h1 className="text-2xl font-semibold text-white">Write an entry</h1>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-md px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#0B0D10] transition-colors hover:bg-white disabled:opacity-50"
          style={{ background: ACCENT }}
        >
          {saving ? "Saving…" : "Save draft"}
        </button>
      </div>

      {error && (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 font-mono text-[12px] text-red-300">
          {error}
        </p>
      )}

      <div className="space-y-3">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setDirty(true);
          }}
          className={inputClass}
        />
        <input
          placeholder="Summary (1 to 2 lines, shown in the list)"
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value);
            setDirty(true);
          }}
          className={inputClass}
        />
        <div className="flex justify-between font-mono text-[11px] text-white/40">
          <span>/notes/build/{slugPreview || "your-title"}</span>
          <span>
            {words} words · {readingTime} min read
          </span>
        </div>
      </div>

      {/* toolbar */}
      <div className="flex flex-wrap gap-2">
        {tools.map((t) => (
          <button
            key={t.label}
            type="button"
            onClick={() => t.run({ wrap, line })}
            className="rounded-md border border-white/20 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/65 transition-colors hover:border-[#D9A85F] hover:text-[#D9A85F]"
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* editor + preview */}
      <div className="grid gap-6 md:grid-cols-2">
        <textarea
          ref={textareaRef}
          placeholder="Write in markdown…"
          value={content}
          onKeyDown={onKeyDown}
          onChange={(e) => {
            setContent(e.target.value);
            setDirty(true);
          }}
          className="h-[560px] w-full resize-none rounded-lg border border-white/20 bg-transparent p-4 font-mono text-[13px] leading-6 text-white placeholder:text-white/30 focus:border-[#D9A85F] focus:outline-none"
        />

        <article
          className="prose prose-sm prose-invert h-[560px] max-w-none overflow-auto rounded-lg border border-white/20 p-6
            prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white
            prose-p:leading-7 prose-p:text-white/65
            prose-a:text-[#D9A85F] prose-strong:text-white
            prose-code:rounded prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-[#D9A85F] prose-code:before:content-none prose-code:after:content-none
            prose-pre:rounded-lg prose-pre:border prose-pre:border-white/15 prose-pre:bg-[#0F1216]
            [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit
            prose-blockquote:border-l-2 prose-blockquote:border-l-[#D9A85F] prose-blockquote:text-white/60
            prose-li:text-white/65 prose-img:rounded-lg"
        >
          <Markdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content || "*Preview appears here…*"}
          </Markdown>
        </article>
      </div>

      <p className="font-mono text-[11px] text-white/35">
        Backed up in this browser as you type. Ctrl/Cmd + S saves the draft.
      </p>
    </main>
  );
}