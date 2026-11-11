import { query } from "./_generated/server";
import { requireAdmin } from "./auth";

const IST_OFFSET = 5.5 * 60 * 60 * 1000;
const DAY = 24 * 60 * 60 * 1000;

export const getOverview = query({
  handler: async (ctx) => {
    await requireAdmin(ctx.auth);

    const buildNotes = await ctx.db.query("buildNotes").collect();
    const published = buildNotes.filter((n) => n.published).length;

    // start of today in IST
    const todayStart =
      Math.floor((Date.now() + IST_OFFSET) / DAY) * DAY - IST_OFFSET;

    const todayViews = (
      await ctx.db
        .query("pageViews")
        .withIndex("by_created_at", (q) => q.gte("createdAt", todayStart))
        .collect()
    ).length;

    // total: cap the read so the dashboard never breaks
    const sample = await ctx.db.query("pageViews").take(10001);
    const totalViews = sample.length;

    return {
      totalNotes: buildNotes.length,
      published,
      drafts: buildNotes.length - published,
      totalViews, // shows 10001 when the real number is larger
      totalViewsCapped: sample.length > 10000,
      todayViews,
    };
  },
});