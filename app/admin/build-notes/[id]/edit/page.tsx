"use client";

import { use } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function EditBuildNote({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const post = useQuery(api.buildNotes.getByIdAdmin, {
    id: id as Id<"buildNotes">,
  });

  const update = useMutation(api.buildNotes.update);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);

  // ✅ ALWAYS called — safe
  useEffect(() => {
    if (!post) return;

    setTitle(post.title);
    setSummary(post.summary);
    setContent(post.content);
  }, [post]);

  // 🔒 Guards AFTER hooks
  if (post === undefined) return <p>Loading…</p>;
  if (post === null) return <p>Not found.</p>;
  const safePost = post;

  async function handleSave() {
    await update({
      id: safePost._id,
      title,
      summary,
      content,
    });

    router.push(`/admin/build-notes/${safePost._id}`);
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 space-y-6">
      <div className="flex items-center justify-between">
        {post.published && (
          <p className="text-sm text-amber-600">
            This note is live. Changes affect production.
          </p>
        )}

        <button
          onClick={() => setPreview((p) => !p)}
          className="underline text-sm"
        >
          {preview ? "Edit" : "Preview"}
        </button>
      </div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2"
      />

      <input
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full border px-3 py-2"
      />

      {preview ? (
        <article className="prose max-w-none border p-4 rounded">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      ) : (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={18}
          className="w-full border px-3 py-2 font-mono"
        />
      )}

      <button onClick={handleSave} className="underline text-sm">
        Save changes
      </button>
    </main>
  );
}
