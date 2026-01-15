import { query } from "./_generated/server";
import { requireAdmin } from "./auth";

export const getOverview = query({
  handler: async (ctx) => {
    await requireAdmin(ctx.auth);

    const buildNotes = await ctx.db
      .query("buildNotes")
      .collect();

    const pageViews = await ctx.db
      .query("pageViews")
      .collect();

    const published = buildNotes.filter(n => n.published).length;
    const drafts = buildNotes.filter(n => !n.published).length;

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayViews = pageViews.filter(
      v => v.createdAt >= todayStart.getTime()
    ).length;

    return {
      totalNotes: buildNotes.length,
      published,
      drafts,
      totalViews: pageViews.length,
      todayViews,
    };
  },
});
