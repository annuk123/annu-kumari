import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

function checkVisitor(id: string) {
  if (id.length < 8 || id.length > 64) throw new Error("Invalid visitor");
}

export const hasLiked = query({
  args: { noteId: v.id("buildNotes"), visitorId: v.string() },
  handler: async (ctx, { noteId, visitorId }) => {
    if (visitorId.length < 8 || visitorId.length > 64) return false;
    const row = await ctx.db
      .query("buildNoteLikes")
      .withIndex("by_note_visitor", (q) =>
        q.eq("noteId", noteId).eq("visitorId", visitorId)
      )
      .unique();
    return row !== null;
  },
});

export const toggleLike = mutation({
  args: { noteId: v.id("buildNotes"), visitorId: v.string() },
  handler: async (ctx, { noteId, visitorId }) => {
    checkVisitor(visitorId);
    const note = await ctx.db.get(noteId);
    if (!note || !note.published) throw new Error("Not found");

    const existing = await ctx.db
      .query("buildNoteLikes")
      .withIndex("by_note_visitor", (q) =>
        q.eq("noteId", noteId).eq("visitorId", visitorId)
      )
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
      await ctx.db.patch(noteId, {
        likeCount: Math.max(0, (note.likeCount ?? 0) - 1),
      });
      return false;
    }

    await ctx.db.insert("buildNoteLikes", {
      noteId,
      visitorId,
      createdAt: Date.now(),
    });
    await ctx.db.patch(noteId, { likeCount: (note.likeCount ?? 0) + 1 });
    return true;
  },
});

export const recordView = mutation({
  args: { noteId: v.id("buildNotes"), visitorId: v.string() },
  handler: async (ctx, { noteId, visitorId }) => {
    checkVisitor(visitorId);
    const note = await ctx.db.get(noteId);
    if (!note || !note.published) return;

    const seen = await ctx.db
      .query("buildNoteViews")
      .withIndex("by_note_visitor", (q) =>
        q.eq("noteId", noteId).eq("visitorId", visitorId)
      )
      .unique();
    if (seen) return;

    await ctx.db.insert("buildNoteViews", {
      noteId,
      visitorId,
      createdAt: Date.now(),
    });
    await ctx.db.patch(noteId, { viewCount: (note.viewCount ?? 0) + 1 });
  },
});