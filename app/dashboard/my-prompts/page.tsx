"use client";

import PromptCard from "@/components/PromptCard";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { copyText } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";

export default function MyPromptsPage() {
  const posts = useQuery(api.posts.getMyPosts, {});

  const likePost = useMutation(api.userLikes.like);
  const unlikePost = useMutation(api.userLikes.unlike);
  const savePost = useMutation(api.userSaves.save);
  const unsavePost = useMutation(api.userSaves.unsave);

  function clickedLike(postId: Id<"posts">) {
    void likePost({ postId: postId });
  }

  function clickedUnlike(postId: Id<"posts">) {
    void unlikePost({ postId: postId });
  }

  function clickedSave(postId: Id<"posts">) {
    void savePost({ postId: postId });
  }

  function clickedUnsave(postId: Id<"posts">) {
    void unsavePost({ postId: postId });
  }

  return (
    <div className="h-full overflow-y-auto m-1 p-4 rounded-md">
      <h1 className="text-3xl font-semibold">My Prompts</h1>
      <div className="p-4 grid grid-cols-4 gap-4 overflow-y-auto">
        {posts &&
          posts.map((p) => {
            return (
              <PromptCard
                key={p._id}
                prompt={p}
                likeCallback={clickedLike}
                unlikeCallback={clickedUnlike}
                saveCallback={clickedSave}
                unsaveCallback={clickedUnsave}
                copyCallback={copyText}
              ></PromptCard>
            );
          })}
      </div>
    </div>
  );
}
