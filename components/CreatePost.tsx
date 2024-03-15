import { CreateNewPostForm } from "./CreateNewPostForm";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { Tag } from "@/components/ui/tag-input";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface PostData {
  title: string;
  description: string;
  prompt: string;
  tags?: Tag[] | undefined;
}

const CreatePost = () => {
  const addPostsAction = useAction(api.posts.addPosts);

  const handleCreatePost = async (postData: PostData) => {
    await addPostsAction({
      ...postData,
      tags: postData.tags?.map((tag) => tag.text),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-5">
          Create New Prompt <PlusIcon style={{marginLeft: "0.5rem", minWidth: "1rem", minHeight: "1rem"}}/> 
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Post a Prompt</DialogTitle>
          <DialogDescription>
            Share your prompt with the community
          </DialogDescription>
        </DialogHeader>
        <CreateNewPostForm onSubmit={(...e) => void handleCreatePost(...e)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
