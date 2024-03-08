import {
    internalMutation,
    internalQuery,
    query,
    QueryCtx,
  } from "./_generated/server";
  import { v } from "convex/values";
  import { Doc, Id } from "./_generated/dataModel";
  import { UserJSON } from "@clerk/backend";
  

  /** These three functions work together to create the currentUser constant.
      The current user, containing user preferences and Clerk user info. */
  export const currentUser = query((ctx: QueryCtx) => mustGetCurrentUser(ctx));

  //Guaranteed to return a user record, or throw an error.
  export async function mustGetCurrentUser(ctx: QueryCtx): Promise<Doc<"users">> {
    const userRecord = await getCurrentUser(ctx);
    if (!userRecord) throw new Error("Can't get current user");
    return userRecord;
  }

  //Return the user record for the current Clerk user, or null if not found.
  async function getCurrentUser(ctx: QueryCtx): Promise<Doc<"users"> | null> {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      return null;
    }
    return await userQuery(ctx, identity.subject);
  }

  // ----------------------------------------------------------------------------------
  
  
  // Get the username given an identity object
  function getUserName(identity: any) {
    if (identity.nickname){
      return identity.nickname;
    }
    //return the first part of the email address as the username
    return identity.email.split("@")[0];
  }

  /**These two functions work to be able to retrieve a user by username */
  export const get = query({
    args: {
      username: v.string(),
    },
    handler: async (ctx, args) => {
      return await getUserByUsername(ctx, args.username);
    },
  });

  export async function getUserByUsername(ctx: QueryCtx, username: string) {
    return await ctx.db
      .query("users")
      .withIndex("by_userName", (q) => q.eq("username", username))
      .unique();
  }



// Helper Functions  ------------------------------------------------------------

  /** Get User by Clerk id (AKA "subject" on auth)  */
  export const getUser = internalQuery({
    args: { subject: v.string() },
    async handler(ctx, args) {
      return await userQuery(ctx, args.subject);
    },
  });

  /** Create a new user or update existing Clerk user data. 
   * Takes a clerk user object as an arg from the hook*/
  export const updateOrCreateUser = internalMutation({
    args: { clerkUser: v.any() }, // no runtime validation, trust Clerk
    async handler(ctx, { clerkUser }: { clerkUser: UserJSON }) {

      const userRecord = await userQuery(ctx, clerkUser.id);

      // If the user doesn't exist, create it.
      if (userRecord === null) {
        
        //Create a var name that is either the first and last name, whichever is not null, or if they're both null, the username
        let name = clerkUser.first_name;
        if (clerkUser.last_name) {
          name = name + " " + clerkUser.last_name;
        } else if (clerkUser.username) {
          name = clerkUser.username;
        } else {
          name = clerkUser.email_addresses[0].email_address.split("@")[0];
        }

        await ctx.db.insert("users", 
        { 
          name: name, 
          username: clerkUser.username ?? clerkUser.email_addresses[0].email_address.split("@")[0], 
          pictureUrl: clerkUser.image_url, 
          clerkUser: clerkUser 
        });

      } else {

        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
          throw new Error("Called storeUser without authentication present");
        }
  
        const username = getUserName(identity);

        // If the user exists, update it.
        await ctx.db.patch(userRecord._id, 
          { 
            name: userRecord.name, 
            username: username, 
            pictureUrl: userRecord.pictureUrl, 
            clerkUser: userRecord.clerkUser 
          });
      }
    },
  });
  
  /** Delete a user by clerk user ID. */
  export const deleteUser = internalMutation({
    args: { id: v.string() },
    async handler(ctx, { id }) {
      const userRecord = await userQuery(ctx, id);
  
      if (userRecord === null) {
        console.warn("can't delete user, does not exist", id);
      } else {
        //First, delete all posts by this user

        //Then delete the user
        await ctx.db.delete(userRecord._id);
      }
    },
  });
  
  
  // This is THE function that gets the user from the database
  //Return the user record for the given Clerk user id (identity.subject), or null if not found.
  export async function userQuery(
    ctx: QueryCtx,
    clerkUserId: string
  ): Promise<(Omit<Doc<"users">, "clerkUser"> & { clerkUser: UserJSON }) | null> {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkUser.id", clerkUserId))
      .unique();
  }
  

