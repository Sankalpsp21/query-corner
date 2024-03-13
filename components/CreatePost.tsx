import { CreateNewPostForm } from "./CreateNewPostForm";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { Tag } from "@/components/ui/tag-input";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

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
            tags: postData.tags?.map(tag => tag.text),
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="hover"
                    className="mt-5"
                >
                    Create New Prompt +
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Post a Prompt</DialogTitle>
                    <DialogDescription>
                        Share your prompt with the community
                    </DialogDescription>
                </DialogHeader>
                <CreateNewPostForm onSubmit={handleCreatePost}/>
            </DialogContent>
        </Dialog>
    )
}

export default CreatePost;
