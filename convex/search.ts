"use node";

import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

import { Id } from "./_generated/dataModel";
import { embed } from "./posts";
export interface idSearchResult {
    _id: Id<"userSearches">;
    _score: number;
}
  

//Takes a query and optional tags and returns a list of posts that are similar to the query
export const similarPosts = action({
  args: { query: v.string() },

  handler: async (ctx, args) => {
    //If the query string "", return an empty array
    if (args.query === "") {
      return [];
    }
    
    const embedding = await embed(args.query);

    await ctx.runMutation(internal.userSearches.addSearch, { query: args.query });

    let results = await ctx.vectorSearch("posts", "by_embedding", {
      vector: embedding,
      limit: 200,
    });

    return results;
  },
});