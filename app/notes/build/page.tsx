"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function BuildNotes() {
  const posts = useQuery(api.buildNotes.listPublished);

  // Loading state
  if (!posts) {
    return (
      <main className="max-w-xl mx-auto px-6 py-16">
        <p className="text-neutral-500">Loading build notes…</p>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-16 space-y-10">
      {/* Header */}
      <header className="space-y-4">
        <p className="font-medium">Build Notes</p>
        <p className="text-neutral-600">
          Longer reflections from building Nexra.
        </p>
      </header>

      {/* Content */}
      <section className="space-y-10">
        {posts.length === 0 ? (
          <p className="text-neutral-500">
            No build notes published yet.
          </p>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className="space-y-2">
              <Link href={`/notes/build/${post.slug}`}>
                <h2 className="text-lg font-medium hover:opacity-80">
                  {post.title}
                </h2>
              </Link>

              <p className="text-neutral-700">
                {post.summary}
              </p>

              <p className="text-sm text-neutral-500">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </p>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
