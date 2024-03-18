import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    username: v.string(),
    pictureUrl: v.string(),
    searchHistory: v.optional(v.array(v.string())),  
    // This is UserJSON from @clerk/backend. It's basically all the data that clerk provides about a user. 
    // See https://clerk.com/docs/integrations/webhooks/overview#payload-structure
    clerkUser: v.any(),  
  })
    .index("by_userName", ["username"])
    .index("by_clerk_id", ["clerkUser.id"]),
  
  posts: defineTable({
    authorId: v.optional(v.id("users")), 
    title: v.string(),
    description: v.string(),    
    prompt: v.string(),
    likes: v.number(),
    tags: v.optional(v.array(v.string())),
    platform: v.optional(v.string()),   
    embedding: v.array(v.float64()),  
  })
    .index("authorId", ["authorId"])
    .index("likes", ["likes"])
    .vectorIndex("by_embedding", {
      vectorField: "embedding",
      dimensions: 1536,
      filterFields: ["tags"],
    }),
  
    userLikes: defineTable({
      userId: v.id("users"),
      postId: v.id("posts"),
    })
      .index("by_user_post", ["userId", "postId"]),
    
    userSaves: defineTable({
      userId: v.id("users"),
      postId: v.id("posts"),
    })
      .index("by_user_post", ["userId", "postId"]),
    userSearches: defineTable({
      userId: v.id("users"),
      query: v.string(),
    })
      .index("by_user_query", ["userId", "query"]),
});