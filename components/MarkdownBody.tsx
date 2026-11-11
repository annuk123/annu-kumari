"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";

export default function MarkdownBody({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <article
      className={`prose prose-sm prose-invert max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-white
        prose-h2:mt-10 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2
        prose-p:leading-7 prose-p:text-white/65
        prose-a:text-[#D9A85F] prose-a:underline-offset-4
        prose-strong:text-white
        prose-code:rounded prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:text-[#D9A85F] prose-code:before:content-none prose-code:after:content-none
        prose-pre:rounded-lg prose-pre:border prose-pre:border-white/15 prose-pre:bg-[#0F1216]
        [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit [&_pre_code.hljs]:bg-transparent
        prose-blockquote:border-l-2 prose-blockquote:border-l-[#D9A85F] prose-blockquote:text-white/60
        prose-li:text-white/65 prose-li:marker:text-white/30
        prose-img:rounded-lg prose-img:border prose-img:border-white/15
        prose-th:text-white prose-td:text-white/65 ${className}`}
    >
      <Markdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeHighlight]}
      >
        {children}
      </Markdown>
    </article>
  );
}