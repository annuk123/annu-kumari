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
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function BuildNoteClient({ slug }: { slug?: string }) {
  const post = useQuery(
    api.buildNotes.getBySlugPublic,
    slug ? { slug } : "skip"
  );

  if (post === undefined) return <p>Loading…</p>;
  if (post === null) return <p>Not found.</p>;

  return (
    <main className="max-w-xl mx-auto px-6 py-16 space-y-10">
      <Link href="/notes" className="text-sm text-neutral-500">
        ← Back
      </Link>

      <h1 className="text-2xl font-medium">{post.title}</h1>

              <article className="prose prose-neutral ">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
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
                  {post.content}
                </ReactMarkdown>
              </article>
    </main>
  );
}
