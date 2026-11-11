import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin } from "./auth";

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "note"
  );
}

/* ------------------------
   Admin: create
------------------------ */
export const create = mutation({
  args: {
    title: v.string(),
    summary: v.string(),
    content: v.string(),
    slug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth);

    let slug = slugify(args.slug || args.title);

    const existing = await ctx.db
      .query("buildNotes")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (existing) slug = `${slug}-${Date.now()}`;

    const id = await ctx.db.insert("buildNotes", {
      title: args.title,
      summary: args.summary,
      content: args.content,
      slug,
      published: false,
      createdAt: Date.now(),
    });

    // the page redirects to the slug the server actually used
    return { id, slug };
  },
});

/* ------------------------
   Admin: update (keeps the URL stable)
------------------------ */
export const update = mutation({
  args: {
    id: v.id("buildNotes"),
    title: v.string(),
    summary: v.string(),
    content: v.string(),
    slug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth);

    const note = await ctx.db.get(args.id);
    if (!note) throw new Error("Build note not found");

    // keep the existing slug unless a new one is passed on purpose
    let slug = args.slug ? slugify(args.slug) : note.slug ?? slugify(args.title);

    const existing = await ctx.db
      .query("buildNotes")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (existing && existing._id !== args.id) slug = `${slug}-${Date.now()}`;

    await ctx.db.patch(args.id, {
      title: args.title,
      summary: args.summary,
      content: args.content,
      slug,
    });
  },
});

/* ------------------------
   Admin: publish / delete
------------------------ */
export const togglePublished = mutation({
  args: {
    id: v.id("buildNotes"),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth);
    await ctx.db.patch(args.id, { published: args.published });
  },
});

export const remove = mutation({
  args: { id: v.id("buildNotes") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth);
    await ctx.db.delete(args.id);
  },
});

/* ------------------------
   Admin: reads (drafts are private)
------------------------ */
export const listAdmin = query({
  handler: async (ctx) => {
    await requireAdmin(ctx.auth);

    const notes = await ctx.db
      .query("buildNotes")
      .withIndex("by_created_at")
      .order("desc")
      .collect();

    return notes.map(({ _id, title, summary, slug, published, createdAt }) => ({
      _id,
      title,
      summary,
      slug,
      published,
      createdAt,
    }));
  },
});

export const getByIdAdmin = query({
  args: { id: v.id("buildNotes") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth);
    return await ctx.db.get(args.id);
  },
});

export const getBySlugAdmin = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    await requireAdmin(ctx.auth);

    return await ctx.db
      .query("buildNotes")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});

/* ------------------------
   Public: published only
------------------------ */
export const listPublished = query({
  handler: async (ctx) => {
    const notes = await ctx.db
      .query("buildNotes")
      .withIndex("by_created_at")
      .order("desc")
      .filter((q) => q.eq(q.field("published"), true))
      .collect();

    // the list never needs the article body
    return notes.map(({ _id, title, summary, slug, createdAt }) => ({
      _id,
      title,
      summary,
      slug,
      createdAt,
    }));
  },
});

export const getBySlugPublic = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("buildNotes")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .filter((q) => q.eq(q.field("published"), true))
      .unique();
  },
});