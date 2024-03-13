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
import { Input } from "@/components/ui/input";
import React from "react";

interface CreateNewPostFormProps {
  onSubmit: (data: FormData) => void;
  onClose: () => void;
}

interface FormData {
  title: string;
  description: string;
  prompt: string;
  tags: Tag[];
}

const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  prompt: z.string(),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    })
  ),
});

export function CreateNewPostForm({ onSubmit, onClose }: CreateNewPostFormProps) {

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

    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Create a New Post
        </h2>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          X
        </button>
      </div>
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
                    placeholder="Enter tags seperated by commas"
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
          <Button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}