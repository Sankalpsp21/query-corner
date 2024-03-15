"use client";

import PromptCard from "@/components/PromptCard";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react"; 
import { Id } from "@/convex/_generated/dataModel";
import { copyText } from "@/lib/utils";

export default function SavedPostResults(props: { savedPostIds: Id<"posts">[] }) {

  const posts = useQuery(api.posts.getSavedPosts, { postIds: props.savedPostIds });
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
    <>
      {/* Show the saved posts*/}
      {posts && (
        <div className="p-4 grid grid-cols-4 gap-4 overflow-y-auto">
          {posts.map((p) => {
              return (
                <PromptCard
                  key={p._id}
                  prompt={{
                    ...p,
                    _authorId: p._authorId ?? null,
                    _score: null,
                    tags: p.tags ?? null,
                    platform: p.platform ?? null,
                  }}
                  likeCallback={clickedLike}
                  unlikeCallback={clickedUnlike}
                  saveCallback={clickedSave}
                  unsaveCallback={clickedUnsave}
                  copyCallback={copyText}
                ></PromptCard>
              );
            })}
        </div>
      )}
    </>
  );
}
