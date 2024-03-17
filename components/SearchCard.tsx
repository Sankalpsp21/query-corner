"use client";

import { Card } from "./ui/card";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useEffect, useRef, useState } from "react";
import { HistoryResultVector } from "@/convex/userSearches";


const SearchCard = (props: {
    query: HistoryResultVector;
}) => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const toggleDrawer = () => {
//     setIsDrawerOpen(!isDrawerOpen);
//   };

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        // setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //If the userId is not null, get the user object, else set user as null
  const user = useQuery(
    api.users.getUserById,
    props.query.userId ? { id: props.query.userId } : "skip"
  );

    const date = new Date(props.query._creationTime);
    const searchTime = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', day: 'numeric', month: 'short'}); 


  const redirectToSearch = () => {
    window.location.href = '/dashboard';  

    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('search-input-form');
        if (!form) return;
        const queryInput = form.querySelector('search-input');
        if (queryInput instanceof HTMLInputElement) {
            queryInput.value = 'Your string here';
        } else {
            console.error('Query input field not found');
        }
        });
        console.log('Redirecting to search');
    };

  return (
    <>
      <Card className="p-4 bg-primary-foreground shadow">
        <div className="flex items-center justify-between mb-2">
          <h2
            className="text-xl font-medium line-clamp-1 hover:underline hover:cursor-pointer"
            onClick={redirectToSearch}
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
      {/*  */}
    </>
  );
};

export default SearchCard;
