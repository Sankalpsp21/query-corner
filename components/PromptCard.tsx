"use client";

import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import {
  CopyIcon,
  HeartIcon,
  HeartFilledIcon,
  BookmarkIcon,
  BookmarkFilledIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect, useRef, useState } from "react";
import { SearchResultVector } from "@/convex/posts";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "./ui/scroll-area";

const PromptCard = (props: {
  prompt: SearchResultVector;
  likeCallback: (postId: Id<"posts">) => void;
  unlikeCallback: (postId: Id<"posts">) => void;
  saveCallback: (postId: Id<"posts">) => void;
  unsaveCallback: (postId: Id<"posts">) => void;
  copyCallback: (promptText: string) => void;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //If the authorId is not null, get the user object, else set user as null
  const user = useQuery(
    api.users.getUserById,
    props.prompt._authorId ? { id: props.prompt._authorId } : "skip"
  );

  //If null, post is not liked by the user, else it is liked
  const liked = useQuery(api.userLikes.isLiked, { postId: props.prompt._id });
  const saved = useQuery(api.userSaves.isSaved, { postId: props.prompt._id });

  const [localLikes, setLocalLikes] = useState(0);
  const [localIsLiked, setLocalIsLiked] = useState(liked ? true : false);
  const [localIsSaved, setLocalIsSaved] = useState(saved ? true : false);

  useEffect(() => {
    setLocalLikes(props.prompt.likes);
  }, [props.prompt.likes]);

  useEffect(() => {
    setLocalIsLiked(liked ? true : false);
  }, [liked]);

  useEffect(() => {
    setLocalIsSaved(saved ? true : false);
  }, [saved]);

  function heartAndBookmarkIcon(iconSize: string) {
    return (
      <div className="flex items-center gap-2 mt-2">
        {localIsLiked ? (
          <HeartFilledIcon
            onClick={() => {
              props.unlikeCallback(props.prompt._id);
              setLocalLikes((prevLikes) => prevLikes - 1);
              setLocalIsLiked(false);
            }}
            style={{
              minWidth: iconSize,
              minHeight: iconSize,
              color: "red",
              cursor: "pointer",
            }}
          />
        ) : (
          <HeartIcon
            onClick={() => {
              props.likeCallback(props.prompt._id);
              setLocalLikes((prevLikes) => prevLikes + 1);
              setLocalIsLiked(true);
            }}
            className="color-grey"
            style={{
              minWidth: iconSize,
              minHeight: iconSize,
              cursor: "pointer",
            }}
          />
        )}
        {localIsSaved ? (
          <BookmarkFilledIcon
            onClick={() => {
              props.unsaveCallback(props.prompt._id);
              setLocalIsSaved(false);
            }}
            style={{
              minWidth: iconSize,
              minHeight: iconSize,
              color: "purple",
              cursor: "pointer",
            }}
          />
        ) : (
          <BookmarkIcon
            onClick={() => {
              props.saveCallback(props.prompt._id);
              setLocalIsSaved(true);
            }}
            className="color-grey"
            style={{
              minWidth: iconSize,
              minHeight: iconSize,
              cursor: "pointer",
            }}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <Card className="p-4 bg-primary-foreground shadow">
        <div className="flex items-center justify-between mb-2">
          <h2
            className="text-xl font-medium line-clamp-1 hover:underline hover:cursor-pointer"
            onClick={toggleDrawer}
          >
            {props.prompt.title}
          </h2>
          {props.prompt._score && (
            <p
              className={`text-sm rounded-md py-1 px-2 text-white ${
                props.prompt._score >= 0.6
                  ? "bg-green-700"
                  : props.prompt._score >= 0.3
                  ? "bg-yellow-600"
                  : "bg-red-700"
              }`}
            >
              {(props.prompt._score * 100).toFixed(1)}%
            </p>
          )}
        </div>

        <div className="flex flex-row gap-2 mb-1 hover:cursor-pointer">
          {props.prompt.tags?.map((tag) => {
            return <Badge key={tag}>{tag}</Badge>;
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
            <Button
              variant="outline"
              className="p-2"
              onClick={() => props.copyCallback(props.prompt.prompt)}
            >
              <CopyIcon />
            </Button>
          </div>
        </Card>
        {heartAndBookmarkIcon("1.5rem")}

        <div className="flex justify-between items-center mt-2">
          <p>{localLikes} likes</p>
          {/* If the user is not null, lis ttheir username, else list autogenerated */}
          <p className="font-normal text-sm hover:underline hover:cursor-pointer">
            Posted by u/{user ? user.username : "Autogenerated"}
          </p>
        </div>
      </Card>
      {/* Popup Drawer */}
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        direction="right"
      >
        <DrawerContent
          ref={drawerRef}
          className="top-0 right-0 left-auto mt-0 w-[600px] rounded-none"
        >
          <ScrollArea>
            <DrawerHeader>
              <DrawerTitle
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              >
                {props.prompt.title}
                <p className="font-normal text-sm">
                  u/{user ? user.username : "Autogenerated"}
                </p>
              </DrawerTitle>
              <DrawerDescription style={{ marginBottom: "2rem" }}>
                <div className="flex flex-row gap-2 mb-1">
                  {props.prompt.tags?.map((tag) => {
                    return <Badge key={tag}>{tag}</Badge>;
                  })}
                </div>
                {heartAndBookmarkIcon("3rem")}
                <p>{localLikes} likes</p>
              </DrawerDescription>
              <DrawerDescription style={{ marginBottom: "2rem" }}>
                <p
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    marginBottom: "0.75rem",
                  }}
                >
                  Description:
                </p>
                <p style={{ fontSize: "1.2rem" }}>{props.prompt.description}</p>
              </DrawerDescription>
              <DrawerDescription style={{ marginBottom: "2rem" }}>
                <p
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    marginBottom: "0.75rem",
                  }}
                >
                  Prompt:{" "}
                  <Button
                    variant="outline"
                    className="p-2"
                    onClick={() => props.copyCallback(props.prompt.prompt)}
                  >
                    <CopyIcon />
                  </Button>
                </p>
                <p style={{ fontSize: "1.2rem" }}>{props.prompt.prompt}</p>
              </DrawerDescription>
            </DrawerHeader>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PromptCard;
