"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { embed } from "./posts";


//Takes a query and optional tags and returns a list of posts that are similar to the query
export const similarPosts = action({
  args: { query: v.string()},
  handler: async (ctx, args) => {
    const embedding = await embed(args.query);

    console.log(embedding)

    let results = await ctx.vectorSearch("posts", "by_embedding", {
      vector: embedding,
      limit: 200,
    });

    return results;
  },
});