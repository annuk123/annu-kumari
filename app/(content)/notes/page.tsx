"use client";

import { useState, useEffect  } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

type View = "notes" | "build";

export default function Notes() {
  const [view, setView] = useState<View>("notes");

const notes =
  useQuery(api.notes.list, view === "notes" ? {} : "skip") ?? [];

  const posts = useQuery(api.buildNotes.listPublished);


const buildNotes =
  useQuery(
    api.buildNotes.listPublished,
    view === "build" ? {} : "skip"
  ) ?? [];

   
   /* ----------------------------------------
     Restore last view from localStorage
  ---------------------------------------- */
  useEffect(() => {
    const saved = localStorage.getItem("notes:view") as View | null;
    if (saved) setView(saved);
  }, []);

   /* ----------------------------------------
     Persist view changes
  ---------------------------------------- */
  useEffect(() => {
    localStorage.setItem("notes:view", view);
  }, [view]);

  const isLoading =
    (view === "notes" && notes === undefined) ||
    (view === "build" && buildNotes === undefined);
   /* ----------------------------------------
     Counts logic (this is the key part)
  ---------------------------------------- */
  const notesCount = view === "notes" ? notes.length : 0;
  const buildCount = view === "build" ? buildNotes.length : 0;

  if (isLoading) {
    return <p className="px-6 py-16">Loading…</p>;
  }

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
      <header className="space-y-3">
        <h1 className="font-medium">Notes</h1>

        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <button
            onClick={() => setView("notes")}
            className={
              view === "notes"
                ? "underline font-medium"
                : "hover:underline"
            }
          >
            Notes ({notesCount})
          </button>

          <span>·</span>


          <button
            onClick={() => setView("build")}
            className={
              view === "build"
                ? "underline font-medium"
                : "hover:underline"
            }
          >
            Build Notes ({buildCount})
          </button>

        </div>
      </header>

      {/* Content */}
      {view === "notes" ? (
        notes.length === 0 ? (
          <p className="text-neutral-500">No notes yet.</p>
        ) : (
          <ul className="space-y-8">
            {notes.map((note) => (
              <li key={note._id} className="space-y-2">
                <p>{note.content}</p>
                <p className="text-sm text-neutral-500">
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )
      ) : buildNotes.length === 0 ? (
        <p className="text-neutral-500">No build notes yet.</p>
      ) : (
        // <ul className="space-y-8">
        //   {buildNotes.map((note) => (
        //     <li key={note._id} className="space-y-2">
        //       <p className="font-medium">{note.title}</p>
        //       <p className="text-sm text-neutral-500">
        //         {new Date(note.createdAt).toLocaleDateString()}
        //       </p>
        //     </li>
        //   ))}
        // </ul>
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
      )}
    </main>
  );
}
