"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ReactMarkdown from "react-markdown";
import AdminControls from "@/components/AdminControls/AdminControls";
import { Id } from "@/convex/_generated/dataModel";

export default function AdminBuildNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // ✅ unwrap params

  const post = useQuery(api.buildNotes.getByIdAdmin, {
    id: id as Id<"buildNotes">,
  });

  if (post === undefined) {
    return <p>Loading…</p>;
  }

  if (!post) {
    return <p>Not found.</p>;
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-16 space-y-8">
      <AdminControls
        postId={post._id}
        published={post.published}
      />

      <h1 className="text-2xl font-medium">
        {post.title}
      </h1>

      <article className="prose max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}
