"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { usePaginatedQuery } from "convex/react"; 
import { useState, useEffect } from "react"
import SavedPostResults from "@/components/SavedPostResults"
import SkeletonGrid from "@/components/SkeletonGrid";

export default function SavedPromptsPage() {
  const [savedIds, setSavedIds] = useState<Id<"posts">[]>([])
  const { results: savedList, status: status1, loadMore: loadMore1 } = usePaginatedQuery(
    api.userSaves.savedPosts,
    {},
    { initialNumItems: 12 }
  );

  useEffect(() => {
    setSavedIds(savedList.map(item => item.postId))
  }, [savedList]);
      

  return (
    <div className="h-full overflow-y-auto m-1 p-4 rounded-md">
      <h1 className="text-3xl font-semibold">Saved Prompts</h1>
      {!savedList && (
        <div className="h-full overflow-y-auto m-1 p-4 rounded-md ">
          <SkeletonGrid />
        </div>
      )}
      {savedList && (
        <SavedPostResults savedPostIds={savedIds}/>
      )}
    </div>
  );
}
