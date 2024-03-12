import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export function CreateNewPostForm({ onSubmit, onClose }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [prompt, setPrompt] = useState("");

    const tagArray = tags.split(",").map(tag => tag.trim());

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            title,
            description,
            prompt,
            tags: tagArray,
            platform: "ChatGPT",
        };
        onSubmit(formData);
    };

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
            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        placeholder="Your title here"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        placeholder="Your description here"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="prompt">Prompt</Label>
                    <Input
                        id="prompt"
                        placeholder="Enter prompt here" // Placeholder for prompt input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                        id="tags"
                        placeholder="Enter tags here"
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </LabelInputContainer>
                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
