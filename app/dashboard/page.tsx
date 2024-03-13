'use client';
import { StickySidebar } from "@/components/layout/sticky-sidebar";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react"; //As opposed to useQuery which doesn't support pagination
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { idResult } from "@/convex/posts";
import SearchResults from "@/components/SearchResults"
import CreatePost from "@/components/CreatePost";
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
import { useEffect } from "react"
import { Minus, Plus } from "lucide-react"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

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

export interface SearchParams {
  results: idResult[];
  tags?: string[]; 
}

export default function Dashboard() {
  const search = useAction(api.search.similarPosts); 

  const [tags, setTags] = useState<Tag[]>([]);
  const [queryTags, setQueryTags] = useState<string[] | undefined>();
  const [fetchedIds, setFetchedIds] = useState<idResult[]>([]);
  const [searchResults, setSearchResults] = useState<SearchParams>({results: []})
  
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema)
  })

  const { setValue } = form;

  useEffect(() => {
    console.log(queryTags)
  }, [queryTags]);


  useEffect(() => {
      const searchParams: SearchParams = { results: fetchedIds };
      if (queryTags) {
        searchParams.tags = queryTags;
      }
      setSearchResults(searchParams);
      console.log("Created search Params", searchParams);
  }, [fetchedIds]);

  
  const onSubmit = async (values: z.infer<typeof searchFormSchema>) => {
    console.log(values);
  
    const searchTerm = values.query;
    setQueryTags(values.tags?.map(tag => tag.text));
  
    // Do vector search and get matching post ids and scores
    const res = await search({ query: searchTerm });
    setFetchedIds(res);
  };

  return (
    <main>
      <div className="grid grid-cols-[240px_minmax(0,1fr)]">

        <StickySidebar className="top-[calc(2.5rem+1px)] h-[calc(100vh-(5rem+2px))] m-1 p-3 rounded-md bg-primary-foreground border flex flex-col items-start">
          <div>Sticky Sidebar</div>
          <div>Example link #1</div>
          <div>Example link</div>
          <div>Example link</div>
          <div>Example link</div>
        </StickySidebar>

        <div className="h-full overflow-y-auto m-1 p-4 rounded-md ">

          {/* Search Bar */}
          <div className="flex items-start" style={{ minHeight:"7rem" }}>
            
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
            <CreatePost/>
          </div>

          <SearchResults
            searchParams={searchResults}
          />
        </div>
      </div>
    </main>
  );
}
