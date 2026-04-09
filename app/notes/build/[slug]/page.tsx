// "use client";

// import { use } from "react";
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import ReactMarkdown from "react-markdown";
// import Link from "next/link";

// export default function BuildNotePage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = use(params);

//   // 🔑 guard: do NOT query until id exists
//   const post = useQuery(
//     api.buildNotes.getById,
//     id ? { id: id as Id<"buildNotes"> } : "skip"
//   );

//   if (post === undefined) {
//     return <p>Loading…</p>;
//   }

//   if (post === null) {
//     return <p>Not found.</p>;
//   }

//   return (
//     <main className="max-w-xl mx-auto px-6 py-16 space-y-10 ">
//       <Link href="/notes" className="text-sm text-neutral-500">
//         ← Back 
//       </Link>

//       <h1 className="text-2xl font-medium">{post.title}</h1>

//       <article className="prose">
//         <ReactMarkdown>{post.content}</ReactMarkdown>
//       </article>
//     </main>
//   );
// }

import type { Metadata } from "next";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import BuildNoteClient from "./BuildNoteClient";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  const post = await fetchQuery(api.buildNotes.getBySlugPublic, { slug });

  if (!post) return { title: "Not found" };

  const image = `https://annu-kumari.pixelui.studio/og/build-note?slug=${post.slug}`;
  const url = `https://annu-kumari.pixelui.studio/notes/build/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      url,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [image],
    },
  };
}

export default async function Page(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return <BuildNoteClient slug={slug} />;
}
