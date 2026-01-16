import { query } from "./_generated/server";
import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { requireAdmin } from "./auth";


// Create new build note
export const create = mutation({
  args: {
    title: v.string(),
    summary: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth);

    return await ctx.db.insert("buildNotes", {
      title: args.title,
      summary: args.summary,
      content: args.content,
      published: false,
      createdAt: Date.now(),
    });
  },
});

// Update existing build note
export const update = mutation({
  args: {
    id: v.id("buildNotes"),
    title: v.string(),
    summary: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth);

    const note = await ctx.db.get(args.id);
    if (!note) {
      throw new Error("Build note not found");
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      summary: args.summary,
      content: args.content,
    });
  },
});


export const listPublished = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("buildNotes")
      .withIndex("by_created_at")
      .filter((q) => q.eq(q.field("published"), true))
      .order("desc")
      .collect();
  },
});


export const getById = query({
  args: { id: v.id("buildNotes") },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);

    if (!post || !post.published) {
      return null;
    }

    return post;
  },
});


export const togglePublished = mutation({
  args: {
    id: v.id("buildNotes"),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth); // 🔒 real guard

    await ctx.db.patch(args.id, {
      published: args.published,
    });
  },
});

export const getByIdAdmin = query({
  args: { id: v.id("buildNotes") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth);
    return await ctx.db.get(args.id);
  },
});

export const remove = mutation({
  args: {
    id: v.id("buildNotes"),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth);

    await ctx.db.delete(args.id);
  },
});



export const getByIdPublic = query({
  args: {
    id: v.id("buildNotes"),
  },
  handler: async (ctx, { id }) => {
    const note = await ctx.db.get(id);

    if (!note || !note.published) {
      return null;
    }

    return note;
  },
});