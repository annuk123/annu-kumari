"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function EditBuildNote({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const post = useQuery(api.buildNotes.getByIdAdmin, {
    id: params.id as Id<"buildNotes">,
  });

  const update = useMutation(api.buildNotes.update);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  // Load data once
  useEffect(() => {
    if (!post) return;
    setTitle(post.title);
    setSummary(post.summary);
    setContent(post.content);
  }, [post]);

  if (post === undefined) return <p>Loading…</p>;
  if (!post) return <p>Not found.</p>;

  const words = content.split(/\s+/).length;
  const readingTime = Math.ceil(words / 200);

  const slug = useMemo(
    () =>
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    [title]
  );

  const safePost = post;
  async function handleSave() {
    await update({
      id: safePost._id,
      title,
      summary,
      content,
      slug,
    });

    
    router.push(`/admin/build-notes/${safePost.slug}`);
  }
  

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-6">
      {/* Warning */}
      {post.published && (
        <p className="text-sm text-amber-600 border p-2 rounded">
          ⚠ This note is published. Changes affect production.
        </p>
      )}

      {/* Title + Summary */}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        placeholder="Title"
      />

      <input
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        placeholder="Summary"
      />

      {/* Meta */}
      <div className="text-xs text-neutral-500 flex justify-between">
        <span>Slug: /build/{slug}</span>
        <span>{words} words · {readingTime} min read</span>
      </div>

      {/* Split Editor */}
      <div className="grid md:grid-cols-2 gap-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-125 border p-4 font-mono rounded resize-none"
        />

        <article className="prose prose-neutral max-w-none border p-6 rounded overflow-auto h-125">
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
            {content || "*Start editing…*"}
          </ReactMarkdown>
        </article>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="px-3 py-2 border rounded text-sm hover:bg-neutral-100 transition"
      >
        Save changes
      </button>
    </main>
  );
}
