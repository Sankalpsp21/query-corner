import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { incrementLikes, decrementLikes } from "./posts";
import { getCurrentUser } from "./users";

//Adds a user-post like to the table
export const like = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);

    if (!user) return null;

    const newTaskId = await ctx.db.insert("userLikes", {
      userId: user._id,
      postId: args.postId,
    });
    await incrementLikes(ctx, { _id: args.postId });

    return newTaskId;
  },
});

//Returns true if post is liked, false if post is not liked, null if user auth failed
export const isLiked = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);

    if (!user) return null;

    const results = await ctx.db
      .query("userLikes")
      .withIndex("by_user_post", (q) =>
        q.eq("userId", user._id).eq("postId", args.postId)
      )
      .unique();

    return results ? true : false;
  },
});

//Removes a user-post like from the table given the user and post id
export const unlike = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);

    if (!user) return null;

    const results = await ctx.db
      .query("userLikes")
      .withIndex("by_user_post", (q) =>
        q.eq("userId", user._id).eq("postId", args.postId)
      )
      .unique();

    if (results) {
      await ctx.db.delete(results._id);
      await decrementLikes(ctx, { _id: args.postId });
      return true;
    } else {
      return false;
    }
  },
});
