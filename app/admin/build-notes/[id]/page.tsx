"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import AdminControls from "@/components/AdminControls/AdminControls";
import { Id } from "@/convex/_generated/dataModel";
import { useParams } from "next/navigation";
import { useState, useMemo } from "react";

export default function AdminBuildNotePage() {
   const params = useParams();
  const id = params.id as Id<"buildNotes">;

  const post = useQuery(api.buildNotes.getByIdAdmin, { id });

  const [preview, setPreview] = useState(true);

  if (post === undefined) return <p>Loading…</p>;
  if (!post) return <p>Not found.</p>;

  const words = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);

  const slug = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-8">
      {/* Top controls */}
      <div className="flex items-center justify-between">
        <AdminControls postId={post._id} published={post.published} />

        <button
          onClick={() => setPreview((p) => !p)}
          className="text-sm border px-2 py-1 rounded hover:bg-neutral-100"
        >
          {preview ? "View raw" : "Preview"}
        </button>
      </div>

      {/* Meta */}
      <div className="text-xs text-neutral-500 flex justify-between">
        <span>Slug: /build/{slug}</span>
        <span>{words} words · {readingTime} min read</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold">{post.title}</h1>

      {/* Content */}
      {preview ? (
        <article className="prose prose-neutral max-w-none border p-6 rounded">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              code({ className, children, ...props }) {
                const isBlock = Boolean(className);
                return isBlock ? (
                  <pre className="rounded bg-neutral-900 p-4 overflow-x-auto">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className="bg-neutral-200 px-1 rounded text-sm">
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      ) : (
        <pre className="whitespace-pre-wrap text-sm border p-4 rounded font-mono bg-neutral-50">
          {post.content}
        </pre>
      )}
    </main>
  );
}
