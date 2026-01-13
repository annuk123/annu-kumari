"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function AdminNotesPage() {
  const notes = useQuery(api.notes.listAdmin);

  const create = useMutation(api.notes.create);
  const update = useMutation(api.notes.update);
  const toggle = useMutation(api.notes.togglePublished);
  const remove = useMutation(api.notes.remove);

  const [content, setContent] = useState("");
  const [editingId, setEditingId] =
    useState<Id<"notes"> | null>(null);
  const [editingContent, setEditingContent] = useState("");

  if (notes === undefined) return <p>Loading…</p>;

  async function handleCreate() {
    if (!content.trim()) return;
    await create({ content });
    setContent("");
  }

  async function handleUpdate(id: Id<"notes">) {
    if (!editingContent.trim()) return;
    await update({ id, content: editingContent });
    setEditingId(null);
    setEditingContent("");
  }

  async function handleDelete(id: Id<"notes">) {
    const ok = confirm("Delete this note?");
    if (!ok) return;
    await remove({ id });
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-16 space-y-10">
      <h1 className="font-medium">Notes (Admin)</h1>

      {/* Create */}
      <div className="space-y-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a short note…"
          rows={4}
          className="w-full border px-3 py-2"
        />

        <button
          onClick={handleCreate}
          className="underline text-sm"
        >
          Save draft
        </button>
      </div>

      {/* List */}
      <ul className="space-y-8">
        {notes.map((note) => (
          <li key={note._id} className="space-y-2">
            {/* Edit mode */}
            {editingId === note._id ? (
              <>
                <textarea
                  value={editingContent}
                  onChange={(e) =>
                    setEditingContent(e.target.value)
                  }
                  rows={3}
                  className="w-full border px-3 py-2"
                />

                <div className="flex gap-4 text-sm">
                  <button
                    className="underline"
                    onClick={() =>
                      handleUpdate(note._id)
                    }
                  >
                    Save
                  </button>

                  <button
                    className="text-neutral-500"
                    onClick={() => {
                      setEditingId(null);
                      setEditingContent("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>{note.content}</p>

                <div className="flex items-center gap-4 text-sm text-neutral-500">
                  <span>
                    {note.published
                      ? "Published"
                      : "Draft"}
                  </span>

                  <button
                    className="underline"
                    onClick={() => {
                      setEditingId(note._id);
                      setEditingContent(note.content);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="underline"
                    onClick={() =>
                      toggle({
                        id: note._id,
                        published: !note.published,
                      })
                    }
                  >
                    {note.published
                      ? "Unpublish"
                      : "Publish"}
                  </button>

                  <button
                    className="underline text-red-600"
                    onClick={() =>
                      handleDelete(note._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
