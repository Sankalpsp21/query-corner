"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { SearchResultVector, embed } from "./posts";
import { internal } from "./_generated/api";


//Takes a query and optional tags and returns a list of posts that are similar to the query
export const similarPosts = action({
  args: { query: v.string(), tags: v.optional(v.array(v.string())) },
  handler: async (ctx, args) => {
    const embedding = await embed(args.query);
    const tags = args.tags;
    let results;
    if (tags && tags.length != 0) {
      results = await ctx.vectorSearch("posts", "by_embedding", {
        vector: embedding,
        limit: 16,
        filter: (q) => q.eq("tags", tags) // Not sure how to structure the query here
      });
    } else {
      results = await ctx.vectorSearch("posts", "by_embedding", {
        vector: embedding,
        limit: 16,
      });
    }
    const rows: SearchResultVector[] = await ctx.runQuery(
      internal.posts.fetchResults,
      { results },
    );

    console.log("search results for query", args.query);
    return rows;
  },
});