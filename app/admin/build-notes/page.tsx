"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function AdminBuildNotes() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const create = useMutation(api.buildNotes.create);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  // Wait for Clerk
  if (!isLoaded) {
    return <p>Loading…</p>;
  }

  // Middleware guarantees sign-in, but keep this safe
  if (!user) {
    return null;
  }

  // UI-only admin check
  const isAdmin = user.publicMetadata?.role === "admin";

  if (!isAdmin) {
    return (
      <main className="max-w-xl mx-auto px-6 py-16">
        <p className="text-neutral-500">Not authorized.</p>
      </main>
    );
  }

  async function handleSave() {
    try {
      const id = await create({
        title,
        summary,
        content,
      });

      router.push(`/admin/build-notes/${id}`);

    } catch (err) {
      console.error(err);
      alert("Not authorized or failed to save.");
    }
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 space-y-8">
      <h1 className="text-xl font-medium">New Build Note</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2"
      />

      <input
        type="text"
        placeholder="Summary (1–2 lines)"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full border px-3 py-2"
      />

      <textarea
        placeholder="Write in markdown…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={18}
        className="w-full border px-3 py-2 font-mono"
      />

      <button
        onClick={handleSave}
        className="underline text-sm"
      >
        Save draft
      </button>
    </main>
  );
}
