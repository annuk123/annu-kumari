import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notes: defineTable({
    content: v.string(),
    createdAt: v.number(),
    published: v.optional(v.boolean()),
  }).index("by_created_at", ["createdAt"]),

  buildNotes: defineTable({
    title: v.string(),
    summary: v.string(),
    content: v.string(), // markdown
    createdAt: v.number(),
    published: v.boolean(),
    slug: v.optional(v.string()),
  }).index("by_slug", ["slug"])
  .index("by_created_at", ["createdAt"]),

   pageViews: defineTable({
    path: v.string(),
    noteId: v.optional(v.id("buildNotes")),
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),
});

