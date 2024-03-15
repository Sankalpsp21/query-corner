import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getCurrentUser } from "./users";
import { paginationOptsValidator } from "convex/server";

//Adds a user-post save to the table
export const save = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) return null;

    const newTaskId = await ctx.db.insert("userSaves", {
      userId: user._id,
      postId: args.postId,
    });

    return newTaskId;
  },
});

//Returns the id of the user-post save if found, null if not found or not signed in
export const isSaved = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) return null;

    const results = await ctx.db
      .query("userSaves")
      .withIndex("by_user_post", (q) =>
        q.eq("userId", user._id).eq("postId", args.postId)
      )
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
    const user = await getCurrentUser(ctx);
    if (!user) return null;

    const results = await ctx.db
      .query("userSaves")
      .withIndex("by_user_post", (q) =>
        q.eq("userId", user._id).eq("postId", args.postId)
      )
      .unique();

    if (results) {
      await ctx.db.delete(results._id);
      return true;
    } else {
      return false;
    }
  },
});

//Returns a list of the user saved post 
export const savedPosts = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
      const user = await getCurrentUser(ctx);

      const docs = await ctx.db
          .query("userSaves")
          .filter((q) => q.eq(q.field("userId"), user?._id))
          .order("desc")
          .paginate(args.paginationOpts);
          
      return docs;
  }
});
