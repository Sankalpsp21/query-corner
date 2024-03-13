import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tag, TagInput } from "@/components/ui/tag-input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostData } from "@/components/CreatePost";
import React from "react";
import { DialogClose } from "@/components/ui/dialog"
interface CreateNewPostFormProps {
  onSubmit: (data: PostData) => void;
}

const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  prompt: z.string(),
  tags: z.optional(z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }))
  ),
});

export function CreateNewPostForm({ onSubmit }: CreateNewPostFormProps) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      prompt: "",
      tags: [],
    },
  });

  const [tags, setTags] = React.useState<Tag[]>([]);

  const { setValue } = form;

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    onSubmit(data);
    console.log("Form data submitted:", data);
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="my-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start mb-4">
                <FormLabel className="text-left">Title</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Enter your title here"
                    {...field}
                    className="border rounded-md p-2 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start mb-4">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Enter your description here"
                    {...field}
                    className="border rounded-md p-2 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start mb-4">
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Enter your prompt here"
                    {...field}
                    className="border rounded-md p-2 w-full"
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
              <FormItem className="flex flex-col items-start mb-4">
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <TagInput
                    placeholder="Enter tags (optional)"
                    {...field}
                    tags={tags}
                    setTags={(newTags) => {
                      setTags(newTags);
                      setValue("tags", newTags as [Tag, ...Tag[]]);
                    }}
                    className="border rounded-md p-2 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogClose asChild>
            <Button 
              className="w-full"
              variant="hover" 
              type="submit"
            >
            Submit
            </Button>
          </DialogClose>
        </form>
      </Form>
  );
}