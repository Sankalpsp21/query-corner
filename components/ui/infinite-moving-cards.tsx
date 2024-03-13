"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { CopyIcon, HeartIcon, HeartFilledIcon, BookmarkIcon, BookmarkFilledIcon } from "@radix-ui/react-icons"

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    title: string;
    description: string;
    prompt: string;
    liked: boolean;
    saved: boolean;
    likes: number;
    username: string;
    tags: string[];
    score: number
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  min-w-full overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <Card key={idx} className="w-[350px] max-w-full relative rounded-2xl flex-shrink-0 px-8 py-6 md:w-[450px]">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-medium line-clamp-1 hover:underline hover:cursor-pointer">
                {item.title}
              </h2>
              <p className={`text-sm rounded-md py-1 px-2 text-white ${
                item.score >= 0.6
                          ? 'bg-green-700'
                          : item.score >= 0.3
                          ? 'bg-yellow-600'
                          : 'bg-red-700'
                      }`}>
                {(item.score * 100).toFixed(1)}%
              </p>
            </div>

            <div className="flex flex-row gap-2 mb-2">
              {item.tags?.map((tag) => {
                return (
                    <Badge key={tag}>
                      {tag}
                    </Badge>
                );
              })}
            </div>

            <p className="text-s text-ellipsis overflow-hidden line-clamp-3 mb-2">
              {item.description}
            </p>

            <Card className="text-xs p-3 bg-muted">
                <div className="flex justify-apart gap-2">
                  <p className="text-ellipsis overflow-hidden line-clamp-5">
                    {item.prompt}
                  </p>
                  <Button variant="outline" className="p-2">
                    <CopyIcon />
                  </Button>
                </div>
            </Card>


            <div className="flex items-center gap-2 mt-2">
              {item.liked ? (
                <HeartFilledIcon 
                  style={{minWidth: "1.5rem", minHeight: "1.5rem", color: "red"}}
                />
              ) : (
                <HeartIcon 
                  style={{minWidth: "1.5rem", minHeight: "1.5rem"}}
                />
              )}
              {item.saved ? (
                <BookmarkFilledIcon 
                  style={{minWidth: "1.5rem", minHeight: "1.5rem", color: "purple"}}
                />
              ) : (
                <BookmarkIcon 
                  style={{minWidth: "1.5rem", minHeight: "1.5rem"}}
                />
              )}
            </div>


            <div className="flex justify-between items-center mt-2">
              <p>
                {item.likes} likes
              </p>
              {/* If the user is not null, lis ttheir username, else list autogenerated */}
              <p className="font-normal text-sm">
                Posted by u/{item.username}
              </p>
            </div>
          </Card>
        ))}
      </ul>
    </div>
  );
};
