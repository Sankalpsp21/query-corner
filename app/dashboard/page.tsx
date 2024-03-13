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

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Tag, TagInput } from "@/components/ui/tag-input";

const searchFormSchema = z.object({
  query: z.string().min(0).max(300),
  tags: z.optional(
      z.array(
      z.object({
        id: z.string(),
        text: z.string(),
      }))
  )
})

interface SearchParams {
  query: string;
  tags?: string[]; 
}

export default function Dashboard() {
  const search = useAction(api.search.similarPosts);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<SearchResultVector[]>([]);
  
  useEffect(() => {
    search({query: ""}).then((res) => {
      setPosts(res);
      setLoading(false);
    });
  }, []);
  
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema)
  })

  const { setValue } = form;

  const onSubmit = (values: z.infer<typeof searchFormSchema>) => {
    setLoading(true);
    const searchTerm = values.query
    const tags = values.tags?.map(tag => tag?.text)

    const searchParams: SearchParams = { query: searchTerm };
    if (tags) {
      searchParams['tags'] = tags;
    }

    console.log("Searching", searchParams)

    search(searchParams).then((res) => {
      setPosts(res);
    });
    
    setLoading(false);
    setTags([])
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
          <div style={{ minHeight:"5rem" }}>
            <div className="min-w-3xl max-w-3xl mx-auto pt-3 rounded-2xl px-8 shadow-input bg-primary-foreground border" >
              <Form {...form}>
                <form 
                  onSubmit={form.handleSubmit(onSubmit)} 
                  className="flex items-start mt-2 mb-3 gap-5"  
                  
                >
                  <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                      <FormItem style={{flexGrow: 3}}>
                        <FormControl>
                          <Input 
                            placeholder="Search for a prompt" {...field}
                            className="hover:border-primary hover:cursor-pointer"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormControl>
                          <TagInput
                            {...field}
                            placeholder="Enter a topic (optional)"
                            inputFieldPostion="top"
                            className="hover:border-primary hover:cursor-pointer"
                            size="sm"
                            tags={tags}
                            setTags={(newTags) => {
                              setTags(newTags);
                              setValue("tags", newTags as [Tag, ...Tag[]]);
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Search</Button>
                </form>
              </Form>
            </div>

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
        </div>
      </div>
    </main>
  );
}
