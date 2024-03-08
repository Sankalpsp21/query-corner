import { v } from "convex/values";
import {
  query,
  action,
  mutation,
  internalMutation,
  internalQuery,
} from "./_generated/server";
import { internal } from "./_generated/api";
import { EXAMPLE_DATA } from "./constants";


//For initially populating the posts table with the example data
  export const populate = action({
    args: {},
    handler: async (ctx) => {

      for (const doc of EXAMPLE_DATA) {
        const embedding = await embed(doc);
        await ctx.runMutation(internal.posts.insertRow, {
        //   authorId: author._id,
          title: doc.title,
          description: doc.description,
          prompt: doc.prompt,
          likes: 0,
          embedding: embedding,
        });
      }
    },
  });

  // Helper function, given a title, description, and prompt, returns the embedding of the text using the OpenAI API
  export async function embed({ title, description, prompt }: { title: string; description: string; prompt: string }): Promise<number[]> {
    const key = process.env.OPENAI_KEY;
    if (!key) {
      throw new Error("OPENAI_KEY environment variable not set!");
    }

    // Compute the embedding of the text using the OpenAI API
    const req = { input: title + description + prompt, model: "text-embedding-3-small" };
    const resp = await fetch("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(req),
    });

    if (!resp.ok) {
      const msg = await resp.text();
      throw new Error(`OpenAI API error: ${msg}`);
    }
    const json = await resp.json();
    const vector = json["data"][0]["embedding"];
    console.log(`Computed embedding of "${title}" post: ${vector.length} dimensions`);
    return vector;
  }

  //Helper for adding a new post to the posts table
  export const insertRow = internalMutation({
    args: {
      description: v.string(),
      prompt: v.string(),
      title: v.string(),
      likes: v.number(),
      tags: v.optional(v.array(v.string())),
      platform: v.optional(v.string()),
      embedding: v.array(v.float64()),
    },
    handler: async (ctx, args) => {
      await ctx.db.insert("posts", args);
    },
  });

  //For getting the top 10 posts by likes
  export const list = query(async (ctx) => {
    const docs = await ctx.db.query("posts").order("desc").take(10);
    return docs.map((doc) => {
      return { 
        _id: doc._id, 
        title: doc.title, 
        description: doc.description,
        prompt: doc.prompt,
        likes: doc.likes,
        platform: doc.platform !== undefined ? doc.platform : null,
        tags: doc.tags !== undefined ? doc.tags : null
     };
    });
  });

  //Function to add a post from the client 
  // Generates a the embedding of the post and adds it to the posts table
  export const addPosts = action({
    args: {
      title: v.string(),
      description: v.string(),
      prompt: v.string(),
      tags: v.optional(v.array(v.string())),
      platform: v.optional(v.string()),    
    },
    handler: async (ctx, args) => {

      const embedding = await embed({ 
        title: args.title, 
        description: args.description, 
        prompt: args.prompt 
      });

      await ctx.runMutation(internal.posts.insertRow, {
      //   authorId: author._id,
        title: args.title,
        description: args.description,
        prompt: args.prompt,
        likes: 0,
        tags: args.tags,
        platform: args.platform,
        embedding: embedding,
      });
    },
  });