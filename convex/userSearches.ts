import { v } from "convex/values";
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


//Adds a user-search save to the table
export const save = mutation({
    args: { 
        query: v.string(),
    },
    handler: async (ctx, args) => {
      const user = await getCurrentUser(ctx);

      if (!user) return null;
      const newTaskId = await ctx.db.insert("userSearches", { userId: user._id, query: args.query });

      return newTaskId;
    },
  });

    export type HistoryResultVector = {
    _id: Id<"userSearches">;
    _creationTime: number;
    _score: number | null; // What is this?
    userId: Id<"users"> | null;
    query: string;
  };

  export const getMySearches = query({
    handler: async (ctx, args) => {
      const user = await getCurrentUser(ctx);
  
      if (!user) return [];
  
      const searches = await ctx.db
        .query("userSearches")
        // .withIndex("by_creation_time", (q) => q.eq("_creationTime", user._id))
        .filter((q) => q.eq(q.field("userId"), user?._id))
        .collect();
  
      return searches.map((p): HistoryResultVector => {
        return {
          ...p,
          _score: null,
          query: p.query ?? null,
        };
      });
    },
  });