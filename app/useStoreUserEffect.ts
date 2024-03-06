import { useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";

export default function useStoreUserEffect() {
  const { isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  const [userId, setUserId] = useState<Id<"users"> | null>(null);
  const getUser = useMutation(api.users.getCurrentUserId);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    async function getUserId() {

      // Just get the user ID.
      // The webhook takes care of creating the user. 
      // They literally can't get here without being logged in.
      const id = await getUser();
      setUserId(id);
    }
    getUserId();
    return () => setUserId(null);
  }, [isAuthenticated, getUser, user?.id]);
  return userId;
}