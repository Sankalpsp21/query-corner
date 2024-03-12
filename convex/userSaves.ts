import { v } from "convex/values";
import {
  query,
  mutation,
} from "./_generated/server";
import { mustGetCurrentUser } from "./users";


//Adds a user-post save to the table
export const save = mutation({
    args: { 
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
      const user = await mustGetCurrentUser(ctx);
      const newTaskId = await ctx.db.insert("userSaves", { userId: user._id, postId: args.postId });

      return newTaskId;
    },
  });

  //Returns the id of the user-post save if found, null if not found
  export const isSaved = query({
    args: { 
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        const user = await mustGetCurrentUser(ctx);

        const results = await ctx.db
        .query("userSaves")
        .withIndex("by_user_post", (q) => q.eq("userId", user._id).eq("postId", args.postId))
        .unique();

        return results ? results._id : null;
    },
  });

  //Removes a user-post save from the table given the user and post id
  export const unsave = mutation({
    args: { 
        postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        const user = await mustGetCurrentUser(ctx);
        const results = await ctx.db
        .query("userSaves")
        .withIndex("by_user_post", (q) => q.eq("userId", user._id).eq("postId", args.postId))
        .unique();

        if (results) {
            await ctx.db.delete(results._id);
            return true;
        } else {
            return false;
        }
    },
  });


