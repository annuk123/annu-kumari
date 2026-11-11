"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import AdminControls from "@/components/AdminControls/AdminControls";
import MarkdownBody from "@/components/MarkdownBody";

const ACCENT = "#D9A85F";

export default function AdminBuildNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const post = useQuery(api.buildNotes.getBySlugAdmin, { slug });
  const [preview, setPreview] = useState(true);

  if (post === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="h-8 w-64 animate-pulse rounded-lg bg-white/[0.04]" />
      </div>
    );
  }
  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10 font-mono text-[12px] text-white/50">
        {"// note not found"}
      </div>
    );
  }

  const words = post.content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <AdminControls
          postId={post._id}
          slug={slug}
          published={post.published}
        />
        <button
          type="button"
          onClick={() => setPreview((p) => !p)}
          className="rounded-md border border-white/20 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/65 transition-colors hover:border-[#D9A85F] hover:text-[#D9A85F]"
        >
          {preview ? "View raw" : "Preview"}
        </button>
      </div>

      <header className="border-b border-white/15 pb-6">
        <div
          className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: ACCENT }}
        >
          {post.published ? "Published" : "Draft"} · {words} words ·{" "}
          {readingTime} min read
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          {post.title}
        </h1>
        {post.summary && (
          <p className="mt-3 text-sm leading-7 text-white/60">{post.summary}</p>
        )}
        <div className="mt-4 font-mono text-[11px] text-white/40">
          {post.published ? (
            <Link
              href={`/notes/build/${slug}`}
              target="_blank"
              className="transition-colors hover:text-[#D9A85F]"
            >
              /notes/build/{slug} ↗
            </Link>
          ) : (
            <span>/notes/build/{slug} (not public yet)</span>
          )}
        </div>
      </header>

      {preview ? (
        <MarkdownBody>{post.content}</MarkdownBody>
      ) : (
        <pre className="whitespace-pre-wrap rounded-lg border border-white/15 bg-[#0F1216] p-4 font-mono text-[13px] leading-6 text-white/70">
          {post.content}
        </pre>
      )}
    </main>
  );
}