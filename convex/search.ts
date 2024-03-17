"use node";

import { action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { addSearch } from "./userSearches";
import {
  query,
  mutation,
} from "./_generated/server";
import { getCurrentUser } from "./users";
import { Doc, Id } from "./_generated/dataModel";
export interface idSearchResult {
    _id: Id<"userSearches">;
    _score: number;
}
  

//Takes a query and optional tags and returns a list of posts that are similar to the query
export const similarPosts = action({
  args: { query: v.string() },

  handler: async (ctx, args) => {
    
    console.log("USING TEST EMBEDDING - CHANGE TO OPENAI")
    const embedding = [0.01];
    console.log(embedding)

    await ctx.runMutation(internal.userSearches.addSearch, { query: args.query });

    let results = await ctx.vectorSearch("posts", "by_embedding", {
      vector: embedding,
      limit: 200,
    });

    return results;
  },
});