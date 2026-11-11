"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";

const ACCENT = "#D9A85F";

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BackLink() {
  return (
    <Link
      href="/#build-log"
      className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-[#D9A85F]"
    >
      ← Build log
    </Link>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#E6E6E6]">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">{children}</div>
    </div>
  );
}

export default function BuildNoteClient({ slug }: { slug?: string }) {
  const post = useQuery(
    api.buildNotes.getBySlugPublic,
    slug ? { slug } : "skip"
  );

  if (post === undefined) {
    return (
      <Shell>
        <div className="mb-4 h-8 w-64 animate-pulse rounded-lg bg-white/[0.04]" />
        <div className="mb-2 h-4 w-full animate-pulse rounded-lg bg-white/[0.04]" />
        <div className="h-4 w-3/4 animate-pulse rounded-lg bg-white/[0.04]" />
      </Shell>
    );
  }

  if (!post) {
    return (
      <Shell>
        <p className="mb-6 font-mono text-[12px] text-white/50">
          {"// note not found"}
        </p>
        <BackLink />
      </Shell>
    );
  }

  return (
    <Shell>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-10">
          <BackLink />
        </div>

        {/* header */}
        <header className="mb-10 border-b border-white/15 pb-8">
          <div
            className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
            {"// Build log"} · {formatDate(post.createdAt)}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {post.title}
          </h1>
          {post.summary && (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              {post.summary}
            </p>
          )}
        </header>

        {/* content */}
        <article
          className="prose prose-sm prose-invert max-w-none sm:prose-base
            prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white
            prose-h2:mt-10 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2
            prose-p:leading-7 prose-p:text-white/65
            prose-a:text-[#D9A85F] prose-a:underline prose-a:underline-offset-4 prose-a:decoration-[#D9A85F]/40 hover:prose-a:decoration-[#D9A85F]
            prose-strong:font-semibold prose-strong:text-white
            prose-code:rounded prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[13px] prose-code:font-normal prose-code:text-[#D9A85F] prose-code:before:content-none prose-code:after:content-none
            prose-pre:rounded-lg prose-pre:border prose-pre:border-white/15 prose-pre:bg-[#0F1216]
            [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit [&_pre_code.hljs]:bg-transparent
            prose-blockquote:border-l-2 prose-blockquote:border-l-[#D9A85F] prose-blockquote:text-white/60
            prose-li:text-white/65 prose-li:marker:text-white/30
            prose-hr:border-white/10
            prose-img:rounded-lg prose-img:border prose-img:border-white/15
            prose-th:text-white prose-td:text-white/65"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeHighlight]}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* footer */}
        <div className="mt-16 flex items-center justify-between border-t border-white/15 pt-6">
          <BackLink />
          <Link
            href="/#contact"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-[#D9A85F]"
          >
            Get in touch ↗
          </Link>
        </div>
      </motion.div>
    </Shell>
  );
}