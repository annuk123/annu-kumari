import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./auth";

/* ------------------------
   Public: published notes
------------------------ */
export const list = query({
  handler: async (ctx) => {
    return ctx.db
      .query("notes")
      .withIndex("by_created_at")
      .filter((q) => q.eq(q.field("published"), true))
      .order("desc")
      .collect();
  },
});

/* ------------------------
   Admin: list all
------------------------ */
export const listAdmin = query({
  handler: async (ctx) => {
    await requireAdmin(ctx.auth);

    return ctx.db
      .query("notes")
      .withIndex("by_created_at")
      .order("desc")
      .collect();
  },
});

/* ------------------------
   Create
------------------------ */
export const create = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth);

    return ctx.db.insert("notes", {
      content: args.content,
      published: false,
      createdAt: Date.now(),
    });
  },
});

/* ------------------------
   Update (✏️ edit)
------------------------ */
export const update = mutation({
  args: {
    id: v.id("notes"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth);

    await ctx.db.patch(args.id, {
      content: args.content,
    });
  },
});

/* ------------------------
   Toggle publish
------------------------ */
export const togglePublished = mutation({
  args: {
    id: v.id("notes"),
    published: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth);

    await ctx.db.patch(args.id, {
      published: args.published,
    });
  },
});

/* ------------------------
   Delete (🗑)
------------------------ */
export const remove = mutation({
  args: {
    id: v.id("notes"),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth);

    await ctx.db.delete(args.id);
  },
});
