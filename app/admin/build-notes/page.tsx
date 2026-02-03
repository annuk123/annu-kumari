"use client";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";

export default function AdminBuildNotes() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const create = useMutation(api.buildNotes.create);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

    const slug = useMemo(
    () =>
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    [title]
  );

  if (!isLoaded) return <p>Loading…</p>;
  if (!user) return null;

  const isAdmin = user.publicMetadata?.role === "admin";
  if (!isAdmin) return <p className="p-6 text-neutral-500">Not authorized.</p>;


  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  async function handleSave() {
    if (!title.trim()) {
    alert("Title is required");
    return;
  }
    await create({ title, summary, content, slug });
    router.push(`/admin/build-notes/${slug}`);
  }

  function insertSnippet(snippet: string) {
    setContent((c) => c + "\n" + snippet);
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-6">
      <h1 className="text-xl font-medium">New Build Note</h1>

      {/* Meta */}
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        placeholder="Summary (1–2 lines)"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <div className="text-xs text-neutral-500 flex justify-between">
        <span>Slug: /notes/build/{slug || "your-title"}</span>
        <span>{words} words · {readingTime} min read</span>
      </div>

      {/* Toolbar */}
      <div className="flex gap-2 text-xs">
        <button onClick={() => insertSnippet("# Heading")} className="border px-2 py-1 rounded">
          H1
        </button>
        <button onClick={() => insertSnippet("## Heading")} className="border px-2 py-1 rounded">
          H2
        </button>
        <button onClick={() => insertSnippet("### Heading")} className="border px-2 py-1 rounded">
          H3
        </button>
        <button onClick={() => insertSnippet("**bold text**")} className="border px-2 py-1 rounded">
          Bold
        </button>
        <button onClick={() => insertSnippet("~~strikethrough~~")} className="border px-2 py-1 rounded">
          Strike
        </button>
        <button onClick={() => insertSnippet("  ")} className="border px-2 py-1 rounded">
          Tab
        </button>
         <button onClick={() => insertSnippet("[link text](https://example.com)")} className="border px-2 py-1 rounded">
          Link
        </button>
        <button onClick={() => insertSnippet("![alt text](https://example.com/image.png)")} className="border px-2 py-1 rounded">
          Image
        </button>
        <button onClick={() => insertSnippet("`inline code`")} className="border px-2 py-1 rounded">
          Code
        </button>
        <button onClick={() => insertSnippet("\n---\n")} className="border px-2 py-1 rounded">
          HR
        </button>
        <button onClick={() => insertSnippet("_italic text_")} className="border px-2 py-1 rounded">
          Italic
        </button>
        <button onClick={() => insertSnippet("> Blockquote")} className="border px-2 py-1 rounded">
          Quote
        </button>
        <button onClick={() => insertSnippet("```ts\ncode\n```")} className="border px-2 py-1 rounded">
          Code
        </button>
        <button onClick={() => insertSnippet("- item")} className="border px-2 py-1 rounded">
          List
        </button>
      </div>

      {/* Split Editor */}
      <div className="grid md:grid-cols-2 gap-6">
        <textarea
          placeholder="Write in markdown…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-125 border p-4 font-mono rounded resize-none"
        />

        <article className="prose prose-neutral max-w-none border p-6 rounded overflow-auto h-125">
          <Markdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              code({ className, children, ...props }) {
                const isBlock = Boolean(className);
                return isBlock ? (
                  <pre className="rounded bg-neutral-900 p-4 overflow-x-auto">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className="bg-neutral-200 px-1 rounded text-sm">
                    {children}
                  </code>
                );
              },
            }}
          >
            {content || "*Start writing…*"}
          </Markdown>
        </article>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="px-3 py-2 border rounded text-sm hover:bg-neutral-100 transition"
      >
        Save draft
      </button>
    </main>
  );
}
