"use client";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react"; //As opposed to useQuery which doesn't support pagination
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { idResult } from "@/convex/posts";
import SearchResults from "@/components/SearchResults";
import CreatePost from "@/components/CreatePost";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Tag, TagInput } from "@/components/ui/tag-input";
import { useEffect } from "react";

const searchFormSchema = z.object({
  query: z.string().min(0).max(300),
  tags: z.optional(
    z.array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
  ),
});

export interface SearchParams {
  results: idResult[];
  tags?: string[];
}

export default function Dashboard({ params }: { params: { slug: string } }) {
  const search = useAction(api.search.similarPosts);

  const [searchLoading, setSearchLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [queryTags, setQueryTags] = useState<string[] | undefined>();
  const [fetchedIds, setFetchedIds] = useState<idResult[]>([]);
  const [searchResults, setSearchResults] = useState<SearchParams>({
    results: [],
  });
    
  // Optional route parameter for search redirection
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (params.slug && params.slug.length > 0) { // Check if params.slug exists and has a length greater than 0
          const searchTerm = decodeURIComponent(params.slug[0]);
          setSearchLoading(true);
          const res = await search({ query: searchTerm });
          setFetchedIds(res);
        }
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
  }, [params.slug]);


  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
  });

  const { setValue } = form;

  useEffect(() => {
    console.log(queryTags);
  }, [queryTags]);

  useEffect(() => {
    const searchParams: SearchParams = { results: fetchedIds };
    if (queryTags) {
      searchParams.tags = queryTags;
    }
    setSearchResults(searchParams);
    // console.log("Created search Params", searchParams);
  }, [fetchedIds, queryTags]);

  const onSubmit = async (values: z.infer<typeof searchFormSchema>) => {
    setSearchLoading(true);

    const searchTerm = values.query;
    setQueryTags(values.tags?.map((tag) => tag.text));

    // Do vector search and get matching post ids and scores
    const res = await search({ query: searchTerm });
    setFetchedIds(res);
  };

  return (
    <div className="h-full overflow-y-auto m-1 p-4 rounded-md ">
      <h1 className="text-3xl mb-4 font-semibold">Dashboard</h1>
      {/* Search Bar */}
      <div className="flex items-start" style={{ minHeight: "7rem" }}>
        <div className=" mx-auto pt-3 rounded-2xl px-8 shadow-input bg-primary-foreground border">
          <Form {...form}>
            <form
              onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
              className="flex items-start mt-2 mb-3 gap-5"
              id="search-input-form"
            >
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem style={{ flexGrow: 3 }}>
                    <FormControl>
                      <Input
                        id="search-input"
                        placeholder="Search for a prompt"
                        {...field}
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

              {/* if searchLoading is false, button test says search, else shows loading spinner */}
              <Button
                type="submit"
                disabled={searchLoading}
              >
                {searchLoading ? "Loading" : "Search"}
              </Button>
              {fetchedIds && fetchedIds.length > 0 && (
                <Button
                  onClick={() => {
                    form.reset()
                    setFetchedIds([]);
                    setTags([]);
                    setQueryTags(undefined);
                  }}
                >
                  Reset
                </Button>
              )}
            </form>
          </Form>
        </div>
        <CreatePost />
      </div>

      <SearchResults searchParams={searchResults} setLoading={setSearchLoading}/>
    </div>
  );
}
