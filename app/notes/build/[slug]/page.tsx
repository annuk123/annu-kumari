import type { Metadata } from "next";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import BuildNoteClient from "./BuildNoteClient";

const SITE_URL = "https://annu-kumari.nexralab.com"; // keep identical to layout.tsx

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await fetchQuery(api.buildNotes.getBySlugPublic, { slug });

  if (!post) return { title: "Note not found" };

  const image = `${SITE_URL}/og/build-note?slug=${post.slug}`;
  const url = `${SITE_URL}/notes/build/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
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

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BuildNoteClient slug={slug} />;
}