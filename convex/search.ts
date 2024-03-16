"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { save } from "./userSearches";


//Takes a query and optional tags and returns a list of posts that are similar to the query
export const similarPosts = action({
  args: { query: v.string()},
  handler: async (ctx, args) => {
    const embedding = [0.01];

    console.log(embedding)

    console.log("Searching for posts similar to", args.query);
    const search = args.query

    // const test = await save(ctx, {search});

    

    let results = await ctx.vectorSearch("posts", "by_embedding", {
      vector: embedding,
      limit: 200,
    });

    return results;
  },
});