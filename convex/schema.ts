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
    likeCount: v.optional(v.number()),
    viewCount: v.optional(v.number()),
  }).index("by_slug", ["slug"])
  .index("by_created_at", ["createdAt"]),

   pageViews: defineTable({
    path: v.string(),
    noteId: v.optional(v.id("buildNotes")),
    createdAt: v.number(),
  }).index("by_created_at", ["createdAt"]),

  buildNoteLikes: defineTable({
  noteId: v.id("buildNotes"),
  visitorId: v.string(),
  createdAt: v.number(),
}).index("by_note_visitor", ["noteId", "visitorId"]),

buildNoteViews: defineTable({
  noteId: v.id("buildNotes"),
  visitorId: v.string(),
  createdAt: v.number(),
}).index("by_note_visitor", ["noteId", "visitorId"]),
});
