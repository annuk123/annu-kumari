"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import Link from "next/link";

export default function AdminControls({
  postId,
  slug,
  published,
}: {
  postId: Id<"buildNotes">;
  slug: string;
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

   const remove = useMutation(api.buildNotes.remove);

  return (
    // <div className="flex items-center gap-4">
    //   <span className="text-sm text-neutral-500">
    //     Status:{" "}
    //     <strong>
    //       {published ? "Published" : "Draft"}
    //     </strong>
    //   </span>

    //   <button
    //     onClick={handleToggle}
    //     disabled={loading}
    //     className="text-sm underline disabled:opacity-50"
    //   >
    //     {published ? "Unpublish" : "Publish"}
    //   </button>
    //   {/* Delete */}
    //   <button
    //     className="underline text-red-600"
    //     onClick={() => {
    //       const confirmed = confirm(
    //         "Delete this build note permanently?"
    //       );
    //       if (confirmed) {
    //         remove({ id: postId });
    //       }
    //     }}
    //   >
    //     Delete
    //   </button>
    // </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
      <span className="text-neutral-600">
        Status:{" "}
        <strong>
          {published ? "Published" : "Draft"}
        </strong>
      </span>

      {/* Edit */}
    <Link
  href={`/admin/build-notes/${slug}/edit`}
  className="underline text-neutral-700"
>
  Edit
</Link>



      {/* Publish / Unpublish */}
      <button
        className="underline text-neutral-700"
        onClick={() => {
          const confirmed = confirm(
            published
              ? "Unpublish this note?"
              : "Publish this note?"
          );
          if (confirmed) {
            togglePublished({
              id: postId,
              published: !published,
            });
          }
        }}
      >
        {published ? "Unpublish" : "Publish"}
      </button>

      {/* Delete */}
      <button
        className="underline text-red-600"
        onClick={() => {
          const confirmed = confirm(
            "Delete this build note permanently?"
          );
          if (confirmed) {
            remove({ id: postId });
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}
