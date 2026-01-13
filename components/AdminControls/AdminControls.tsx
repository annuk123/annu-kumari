"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";

export default function AdminControls({
  postId,
  published,
}: {
  postId: Id<"buildNotes">;
  published: boolean;
}) {
  const togglePublished = useMutation(api.buildNotes.togglePublished);
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      await togglePublished({
        id: postId,
        published: !published,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-neutral-500">
        Status:{" "}
        <strong>
          {published ? "Published" : "Draft"}
        </strong>
      </span>

      <button
        onClick={handleToggle}
        disabled={loading}
        className="text-sm underline disabled:opacity-50"
      >
        {published ? "Unpublish" : "Publish"}
      </button>
    </div>
  );
}
