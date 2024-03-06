import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// This is the schema for the Convex database. Currently, It is just a simple table with the user's name, username, picture URL, and Clerk user JSON.

export default defineSchema({
  users: defineTable({
    name: v.string(),
    username: v.string(),
    pictureUrl: v.string(),
    
    // this is UserJSON from @clerk/backend. It's basically all the data that clerk provides about a user. See https://clerk.com/docs/integrations/webhooks/overview#payload-structure
    clerkUser: v.any(),
  })
  .index("by_userName", ["username"])
  .index("by_clerk_id", ["clerkUser.id"]),
});