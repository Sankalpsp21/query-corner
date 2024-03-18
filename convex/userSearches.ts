import { v } from "convex/values";
import {
  query,
  mutation,
  action,
  internalQuery
} from "./_generated/server";
import { internalMutation } from "./_generated/server";
import { getCurrentUser } from "./users";
import { Doc, Id } from "./_generated/dataModel";
export interface idSearchResult {
    _id: Id<"userSearches">;
    _score: number;
}

export const addSearch = internalMutation({
    
    args: { query: v.string() },
    handler: async (ctx, args) => {

        const user = await getCurrentUser(ctx);
        if (!user) return null;

        const newTaskId = await ctx.db.insert("userSearches", {
            userId: user._id,
            query: args.query,
        });

        return newTaskId;
    },
  });


//Adds a user-search save to the table
export const save = mutation({
    args: { 
        query: v.string(),
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
      const user = await getCurrentUser(ctx);
    // const user = args.userId

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

  export const getQueryById = query({
    args: { id: v.id("userSearches") },
    handler: async (ctx, args) => {
      const search = await ctx.db.get(args.id);
      return search?.query;
    },
  });
