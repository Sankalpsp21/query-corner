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
    const queryTags = args.tags;
    let results;
    // if (tags && tags.length != 0) {
    //   results = await ctx.vectorSearch("posts", "by_embedding", {
    //     vector: embedding,
    //     limit: 200,
    //   });

    // } else {
      results = await ctx.vectorSearch("posts", "by_embedding", {
        vector: embedding,
        limit: 200,
      });
    // }
    const rows: SearchResultVector[] = await ctx.runQuery(
      internal.posts.fetchResults,
      { results },
    );

    //
    if (queryTags && queryTags.length != 0) {
      return rows.filter((post) => 
        queryTags.some((queryTag) => 
          post.tags?.some((postTag) => 
            postTag.toLowerCase() === queryTag.toLowerCase()
          )
        )
      );
    }

    console.log("search results for query", args.query);
    return rows;
  },
});