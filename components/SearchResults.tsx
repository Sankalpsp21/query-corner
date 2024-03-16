"use client";

import PromptCard from "@/components/PromptCard";
import { api } from "@/convex/_generated/api";
import { useMutation, usePaginatedQuery, useQuery } from "convex/react"; //As opposed to useQuery which doesn't support pagination
import { Id } from "@/convex/_generated/dataModel";
import SkeletonGrid from "@/components/SkeletonGrid";
import { SearchParams } from "@/app/dashboard/page";
import { copyText } from "@/lib/utils";
import { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef } from "react";

export default function SearchResults(props: { 
  searchParams: SearchParams,
  setLoading: Dispatch<SetStateAction<boolean>>
}) {
  //default posts for when not viewing search results
  const { results, status, loadMore } = usePaginatedQuery(
    api.posts.list,
    {},
    { initialNumItems: 20 }
    );

  const posts = useQuery(api.posts.fetchResults, props.searchParams);
    
  // Ref for the bottom of the page
  const bottomOfPageRef = useRef<HTMLDivElement>(null);

  // Function to load more posts when scrolled to the bottom
  const handleScroll = () => {
    if (
      bottomOfPageRef.current &&
      window.innerHeight + window.scrollY >= bottomOfPageRef.current.offsetTop
    ) {
      if (status === "CanLoadMore") {
        loadMore(8);
      }
    }
  };

  // Effect to listen to scroll events
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [status]); // Re-register listener when status changes

  useEffect(() => {
    if (status === "LoadingFirstPage") {
      props.setLoading(true);
    } else {
      props.setLoading(false);
    }
  }, [posts]);



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
      {/* Loading skeleton */}
      {props.searchParams.results.length === 0 &&
        status === "LoadingFirstPage" && (
          <div className="h-full overflow-y-auto m-1 p-4 rounded-md ">
            <SkeletonGrid />
          </div>
        )}

      {/* If no search yet, show all posts */}
      {props.searchParams.results.length == 0 && (
        <>
          <div className="p-4 grid grid-cols-4 gap-4 overflow-y-auto">
            {results?.map((p) => {
                return (
                  <PromptCard
                    key={p._id}
                    prompt={{
                      ...p,
                      _authorId: p.authorId ?? null,
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
          <div ref={bottomOfPageRef}></div>
        </>
      )}

      {/* If search, show results */}
      {props.searchParams.results.length != 0 && (
        <div className="p-4 grid grid-cols-4 gap-4 overflow-y-auto">
          {posts?.map((p) => {
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
      )}
    </>
  );
}
