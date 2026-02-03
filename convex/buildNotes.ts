import { query } from "./_generated/server";
import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { requireAdmin } from "./auth";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Create new build note
export const create = mutation({
  args: {
    title: v.string(),
    summary: v.string(),
    content: v.string(),
    slug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth);
    let slug = args.slug || slugify(args.title);
     // 2️⃣ Check if slug already exists
    const existing = await ctx.db
      .query("buildNotes")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    // 3️⃣ If slug exists → add timestamp
    if (existing) {
      slug = slug + "-" + Date.now();
    }
    return await ctx.db.insert("buildNotes", {
      title: args.title,
      summary: args.summary,
      content: args.content,
      slug,
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
    slug: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx.auth);

    const note = await ctx.db.get(args.id);
    if (!note) {
      throw new Error("Build note not found");
    }

    let slug = args.slug || slugify(args.title);

    // 👇 check collision (ignore self)
    const existing = await ctx.db
      .query("buildNotes")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();

    if (existing && existing._id !== args.id) {
      slug = slug + "-" + Date.now();
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      summary: args.summary,
      content: args.content,
      slug,
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

export const backfillSlugs = mutation({
  handler: async (ctx) => {
    await requireAdmin(ctx.auth);

    const notes = await ctx.db.query("buildNotes").collect();

    function slugify(title: string) {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    for (const note of notes) {
      if (!note.slug) {
        let slug = slugify(note.title);

        // prevent duplicates
        const existing = await ctx.db
          .query("buildNotes")
          .withIndex("by_slug", (q) => q.eq("slug", slug))
          .unique();

        if (existing) slug += "-" + note._id.slice(-4);

        await ctx.db.patch(note._id, { slug });
      }
    }
  },
});
