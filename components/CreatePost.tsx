import React, { useState } from "react";
import { CreateNewPostForm } from "./CreateNewPostForm";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { Tag } from "@/components/ui/tag-input";

interface PostData {
    title: string;
    description: string;
    prompt: string;
    tags: Tag[];
}

const CreatePost = () => {
    const [showModal, setShowModal] = useState(false);

    const addPostsAction = useAction(api.posts.addPosts);

    const handleCreatePost = async (postData: PostData) => {
        await addPostsAction({
            ...postData,
            tags: postData.tags.map(tag => tag.text),
        });
        setShowModal(false);
    };

    const handleClick = () => {
        setShowModal(!showModal);
    }

    return (
        <div>
            <button
                className="border border-black p-4 rounded-md text-white bg-gray-800 hover:bg-blue-600"
                onClick={handleClick}
            >
                Create New Prompt +
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-2 rounded-md z-10 w-full md:max-w-md"> {/* Adjusted width */}
                        <CreateNewPostForm onSubmit={handleCreatePost} onClose={() => setShowModal(false)} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreatePost;
