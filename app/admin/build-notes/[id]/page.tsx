"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ReactMarkdown from "react-markdown";
import AdminControls from "@/components/AdminControls/AdminControls";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";

export default function AdminBuildNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const post = useQuery(api.buildNotes.getByIdAdmin, {
    id: id as Id<"buildNotes">,
  });

  const [preview, setPreview] = useState(true);

  if (post === undefined) return <p>Loading…</p>;
  if (!post) return <p>Not found.</p>;

  return (
    <main className="max-w-xl mx-auto px-6 py-16 space-y-8">
      <div className="flex items-center justify-between">
        <AdminControls
          postId={post._id}
          published={post.published}
        />

        <button
          onClick={() => setPreview((p) => !p)}
          className="text-sm underline"
        >
          {preview ? "View raw" : "Preview"}
        </button>
      </div>

      <h1 className="text-2xl font-medium">
        {post.title}
      </h1>

      {preview ? (
        <article className="prose max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      ) : (
        <pre className="whitespace-pre-wrap text-sm border p-4 rounded font-mono">
          {post.content}
        </pre>
      )}
    </main>
  );
}
