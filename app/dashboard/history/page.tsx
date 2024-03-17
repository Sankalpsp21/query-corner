"use client";

import SearchCard from "@/components/SearchCard";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { copyText } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";

export default function SearchHistoryPage() {

    const searches = useQuery(api.userSearches.getMySearches, {});

  return (
    <div className="h-full overflow-y-auto m-1 p-4 rounded-md">
      <h1 className="text-3xl font-semibold">Search History</h1>
      <div className="p-4 grid grid-cols-1 gap-4 overflow-y-auto">
        {searches &&
          searches.reverse().map((p) => {
            return (
              <SearchCard
              query={p}
                key={p._id}
              ></SearchCard>
            );
          })}
      </div>
    </div>
  );
}
