import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { CopyIcon, HeartIcon, HeartFilledIcon, BookmarkIcon, BookmarkFilledIcon } from "@radix-ui/react-icons"
import { Button } from "./ui/button";

const PromptCard = (props: {
  prompt: {
    _id: string;
    _creationTime: number;
    authorId: string | null;
    tags: string[] | null;
    platform: string | null;
    title: string;
    description: string;
    prompt: string;
    likes: number;
    embedding: number[];
  };
}) => {
  return (
    <Card className="p-4 bg-primary-foreground shadow hover:cursor-pointer">
      <h2 className="text-xl font-medium line-clamp-1 mb-2 hover:underline hover:cursor-pointer">
        {props.prompt.title}
      </h2>

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

      {props.prompt.tags?.map((tag) => {
        return (
          <div className="flex flex-row gap-2">
            <Badge key={tag}>
              {tag}
            </Badge>
          </div>
        );
      })}

      <div className="flex justify-between items-center mt-2">
        {/* not liked? */}
        <div className="text-2xl flex">
          <HeartIcon style={{minWidth: "1.3rem", minHeight: "1.3rem"}}/>
        </div>
        {/* liked? */}
        <div className="text-2xl">
          <HeartFilledIcon style={{minWidth: "1.3rem", minHeight: "1.3rem", color: "red"}}/>
        </div>
        {/* Not Saved? */}
        <div className="text-2xl">
          <BookmarkIcon style={{minWidth: "1.3rem", minHeight: "1.3rem"}}/>
        </div>
        {/* Saved? */}
        <div className="text-2xl">
          <BookmarkFilledIcon style={{minWidth: "1.3rem", minHeight: "1.3rem", color: "purple"}}/>
        </div>
        <div className="text-2xl">
        </div>

        <p>Posted by /username</p>
      </div>
      <div>
        <p>
          {props.prompt.likes} likes
        </p>
      </div>
    </Card>
  );
};

export default PromptCard;