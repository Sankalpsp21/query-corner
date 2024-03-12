"use client";

import { StickySidebar } from "@/components/layout/sticky-sidebar";
import PromptCard from "@/components/PromptCard";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery, useMutation, useAction } from "convex/react"; //As opposed to useQuery which doesn't support pagination
import { Id } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { SearchResultVector } from "@/convex/posts";
import SkeletonGrid from "@/components/SkeletonGrid";

export default function Dashboard() {

  const search = useAction(api.search.similarPosts);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<SearchResultVector[]>([]);

  useEffect(() => {
    search({query: query}).then((res) => {
      setPosts(res);
      setLoading(false);
    });
  }, []);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    console.log("searching")

    e.preventDefault();
    search({query: query}).then((res) => {
      setPosts(res);
    });
    
    setQuery("");
    setLoading(false);
    console.log("done searching")
  };

  const likePost = useMutation(api.userLikes.like);
  const unlikePost = useMutation(api.userLikes.unlike); 
  const savePost = useMutation(api.userSaves.save);
  const unsavePost = useMutation(api.userSaves.unsave);

function clickedLike(postId: Id<"posts">) {
    likePost({ postId: postId });
}

function clickedUnlike(postId: Id<"posts">) {
    unlikePost({ postId: postId });
}

function clickedSave(postId: Id<"posts">) {
    savePost({ postId: postId });
}

function clickedUnsave(postId: Id<"posts">) {
    unsavePost({ postId: postId });
}


  return (
    <main>
      <div className="grid grid-cols-[240px_minmax(0,1fr)]">

        <StickySidebar className="top-[calc(2.5rem+1px)] h-[calc(100vh-(5rem+2px))] m-1 p-3 rounded-md bg-primary-foreground border flex flex-col items-start">
          <div>Sticky sidebar</div>
          <div>Example link</div>
          <div>Example link</div>
          <div>Example link</div>
          <div>Example link</div>
        </StickySidebar>

        <div className="h-full overflow-y-auto m-1 p-4 rounded-md ">

          {/* Search Bar */}
          <div className="min-w-xl max-w-xl mx-auto rounded-2xl px-8 shadow-input bg-primary-foreground border">
            <form className="my-4" onSubmit={handleSubmit}>

              <div className="flex items-center md:space-x-2 mb-4">
                <div className="flex items-center w-full border hover:border-primary rounded-xl px-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:ring-1 active:ring-ring">
                  <MagnifyingGlassIcon className="w-6 h-6 text-primary" />
                  <Input 
                    id="query" 
                    placeholder="Search for a prompt" 
                    type="text" 
                    value = {query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border-transparent focus-visible:border-transparent" 
                  />
                </div>
                <Button
                >
                  Search
                  <BottomGradient />
                </Button>
              </div>
            </form>
          </div>

          {loading && (
            <div className="h-full overflow-y-auto m-1 p-4 rounded-md ">
              <SkeletonGrid />
            </div>
          )}

          {!loading && (
            <div className="p-4 grid grid-cols-4 gap-4 overflow-y-auto">
              {posts &&
                posts.map((p) => {
                  return (
                    <PromptCard
                      prompt={{
                        ...p,
                        authorId: p._authorId ?? null,
                        tags: p.tags ?? null,
                        platform: p.platform ?? null,
                      }}
                      likeCallback={clickedLike}
                      unlikeCallback={clickedUnlike}
                      saveCallback={clickedSave}
                      unsaveCallback={clickedUnsave}
                      key={p._id}
                    ></PromptCard>
                  );
              })}
            </div>
          )}

          {/* Prompt Cards
          <div className="p-4 grid grid-cols-4 gap-4">
 
            {posts &&
              posts.map((p) => {
                return (
                  <PromptCard
                    prompt={{
                      ...p,
                      authorId: p._authorId ?? null,
                      tags: p.tags ?? null,
                      platform: p.platform ?? null,
                    }}
                    likeCallback={clickedLike}
                    unlikeCallback={clickedUnlike}
                    saveCallback={clickedSave}
                    unsaveCallback={clickedUnsave}
                    key={p._id}
                  ></PromptCard>
                );
            })}
          </div> */}
        </div>
      </div>
    </main>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};