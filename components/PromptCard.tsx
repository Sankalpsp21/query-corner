import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { CopyIcon, HeartIcon, HeartFilledIcon, BookmarkIcon, BookmarkFilledIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

const PromptCard = (props: {
  prompt: {
    _id: Id<"posts">;
    _score: number;
    _creationTime: number;
    authorId: Id<"users"> | null;
    tags: string[] | null;
    platform: string | null;
    title: string;
    description: string;
    prompt: string;
    likes: number;
  },
  likeCallback: (postId: Id<"posts">) => void;
  unlikeCallback: (postId: Id<"posts">) => void;
  saveCallback: (postId: Id<"posts">) => void;
  unsaveCallback: (postId: Id<"posts">) => void;
}) => {
  //If the authorId is not null, get the user object, else set user as null
  const user =  props.prompt.authorId ? useQuery(api.users.getUserById, { id: props.prompt.authorId }) : null;

  //If null, post is not liked by the user, else it is liked
  const liked = useQuery(api.userLikes.isLiked, { postId: props.prompt._id});
  const saved = useQuery(api.userSaves.isSaved, { postId: props.prompt._id});

  return (
    <Card className="p-4 bg-primary-foreground shadow">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-medium line-clamp-1 hover:underline hover:cursor-pointer">
          {props.prompt.title}
        </h2>
        <p className="text-sm rounded-md py-1 px-2 bg-muted">
          {(props.prompt._score * 100).toFixed(1)}%
        </p>
      </div>

      <div className="flex flex-row gap-2">
        {props.prompt.tags?.map((tag) => {
          return (
              <Badge key={tag}>
                {tag}
              </Badge>
          );
        })}
      </div>

      <p className="text-s text-ellipsis overflow-hidden line-clamp-3 mb-2">
        {props.prompt.description}
      </p>

      <Card className="text-xs p-3 bg-muted">
          <div className="flex justify-apart gap-2">
            <p className="text-ellipsis overflow-hidden line-clamp-5">
              {props.prompt.prompt}
            </p>
            <Button variant="outline" className="p-2">
              <CopyIcon />
            </Button>
          </div>
      </Card>


      <div className="flex items-center gap-2 mt-2">
        {liked ? (
          <HeartFilledIcon 
            onClick={(e) => props.unlikeCallback(props.prompt._id)}
            style={{minWidth: "1.3rem", minHeight: "1.3rem", color: "red"}}
          />
        ) : (
          <HeartIcon 
            onClick={(e) => props.likeCallback(props.prompt._id)}
            style={{minWidth: "1.3rem", minHeight: "1.3rem"}}
          />
        )}
        {saved ? (
          <BookmarkFilledIcon 
            onClick={(e) => props.unsaveCallback(props.prompt._id)}
            style={{minWidth: "1.3rem", minHeight: "1.3rem", color: "purple"}}
          />
        ) : (
          <BookmarkIcon 
            onClick={(e) => props.saveCallback(props.prompt._id)}
            style={{minWidth: "1.3rem", minHeight: "1.3rem"}}
          />
        )}
      </div>


      <div className="flex justify-between items-center mt-2">
        <p>
          {props.prompt.likes} likes
        </p>
        {/* If the user is not null, lis ttheir username, else list autogenerated */}
        <p className="font-normal text-sm">
          Posted by u/{user ? user.username : "Autogenerated"}
        </p>
      </div>
    </Card>
  );
};

export default PromptCard;