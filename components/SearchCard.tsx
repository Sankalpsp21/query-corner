"use client";

import { Card } from "./ui/card";
import { HistoryResultVector } from "@/convex/userSearches";


const SearchCard = (props: {
    query: HistoryResultVector;
}) => {

    const date = new Date(props.query._creationTime);
    const searchTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', day: 'numeric', month: 'short'}); 

    const redirectToSearch = (query: string) => {
        window.location.href = `/dashboard/${query}`;
    };

  return (
    <Card className="p-4 bg-primary-foreground shadow">
      <div className="flex items-center justify-between mb-2">
        <h2
          className="text-xl font-medium line-clamp-1 hover:underline hover:cursor-pointer"
          onClick={() => redirectToSearch(props.query.query)}
        >
          {props.query.query}
        </h2>
      </div>

      <div className="flex justify-between items-center mt-2">
        
        <p className="font-normal text-sm">
          {searchTime}
        </p>
      </div>
    </Card>
  );
};

export default SearchCard;
