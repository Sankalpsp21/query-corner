"use client";

import { StickySidebar } from "@/components/layout/sticky-sidebar";
import { Button } from "@/components/ui/button";
import {
  BookmarkFilledIcon,
  CounterClockwiseClockIcon,
  DashboardIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { usePathname } from 'next/navigation'

function SidebarNavButton(props: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  
  return (
    <Link href={props.href}>
      <Button 
        variant = {pathname === props.href ? "hover" : "outline"}
        style={{ minWidth: "100%" }}

        >
        <span className="flex justify-between gap-1 items-center">
          {props.children}
        </span>
      </Button>
    </Link>
  );
}

export default function Dashboard(props: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="grid grid-cols-[240px_minmax(0,1fr)]">
      <StickySidebar className="top-[calc(4.75rem+1px)] h-[calc(100vh-(5rem+2px))] p-3 rounded-md bg-primary-foreground border">
        <div className="flex flex-col gap-2">
          <SidebarNavButton href="/dashboard">
            <DashboardIcon
              style={{
                minWidth: "1.5rem",
                minHeight: "1.5rem",
                color: "grey",
              }}
            />
            Dashboard
          </SidebarNavButton>
          <SidebarNavButton href="/dashboard/my-prompts">
            <PersonIcon
              style={{
                minWidth: "1.5rem",
                minHeight: "1.5rem",
                color: "grey",
              }}
            />
            My Prompts
          </SidebarNavButton>
          <SidebarNavButton href="/dashboard/saved">
            <BookmarkFilledIcon
              style={{
                minWidth: "1.5rem",
                minHeight: "1.5rem",
                color: "grey",
              }}
            />
            Saved Prompts
          </SidebarNavButton>
          <SidebarNavButton href="/dashboard/history">
            <CounterClockwiseClockIcon
              style={{
                minWidth: "1.5rem",
                minHeight: "1.5rem",
                color: "grey",
              }}
            />
            Search History
          </SidebarNavButton>
        </div>
      </StickySidebar>
      {props.children}
    </div>
  );
}
