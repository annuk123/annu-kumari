// "use client";

// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import ReactMarkdown from "react-markdown";
// import Link from "next/link";

// export default function BuildNoteClient({ id }: { id?: string }) {
//   const post = useQuery(
//   api.buildNotes.getByIdPublic,
//   id ? { id: id as Id<"buildNotes"> } : "skip"
// );


//   if (post === undefined) return <p>Loading…</p>;
//   if (post === null) return <p>Not found.</p>;

//   return (
//     <main className="max-w-xl mx-auto px-6 py-16 space-y-10">
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

"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, type Variants } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BuildNoteClient({ slug }: { slug?: string }) {
  const post = useQuery(
    api.buildNotes.getBySlugPublic,
    slug ? { slug } : "skip"
  );

  if (post === undefined) {
    return (
      <div className="mx-auto max-w-2xl px-6 pt-32 pb-24">
        <div className="h-8 w-48 rounded bg-card/50 animate-pulse mb-4" />
        <div className="h-4 w-full rounded bg-card/50 animate-pulse mb-2" />
        <div className="h-4 w-3/4 rounded bg-card/50 animate-pulse" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl px-6 pt-32 pb-24">
        <p className="text-sm text-muted-foreground mb-4">Note not found.</p>
        <Link
          href="/"
          className="text-sm text-foreground underline underline-offset-4"
        >
          Back to notes
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 pt-32 pb-24">
      {/* Back */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show" className="mb-10">
        <Link
          href="/"
          className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors inline-flex items-center gap-1.5"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M9.5 6H2.5M2.5 6L5.5 3M2.5 6L5.5 9"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          All notes
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show" className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight mb-3">{post.title}</h1>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.summary}</p>
        <p className="text-xs text-muted-foreground/40">{formatDate(post.createdAt)}</p>
      </motion.div>

      <motion.div
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="h-px bg-border/50 mb-10"
      />

      {/* Content */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="prose prose-sm prose-invert max-w-none
          prose-headings:font-semibold prose-headings:tracking-tight
          prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-a:text-foreground prose-a:underline prose-a:underline-offset-4 prose-a:decoration-border hover:prose-a:decoration-foreground
          prose-strong:text-foreground prose-strong:font-semibold
          prose-code:text-[var(--accent-green)] prose-code:text-xs prose-code:bg-card prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-card prose-pre:border prose-pre:border-border/50 prose-pre:rounded-lg
          prose-blockquote:border-l-border/50 prose-blockquote:text-muted-foreground
          prose-li:text-muted-foreground
          prose-hr:border-border/40"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </motion.div>
    </div>
  );
}