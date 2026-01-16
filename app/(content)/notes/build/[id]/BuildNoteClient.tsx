"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function BuildNoteClient({ id }: { id?: string }) {
  const post = useQuery(
  api.buildNotes.getByIdPublic,
  id ? { id: id as Id<"buildNotes"> } : "skip"
);


  if (post === undefined) return <p>Loading…</p>;
  if (post === null) return <p>Not found.</p>;

  return (
    <main className="max-w-xl mx-auto px-6 py-16 space-y-10">
      <Link href="/notes" className="text-sm text-neutral-500">
        ← Back
      </Link>

      <h1 className="text-2xl font-medium">{post.title}</h1>

      <article className="prose">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}
