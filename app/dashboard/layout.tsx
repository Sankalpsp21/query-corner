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

function SidebarNavButton(props: { href: string; children: React.ReactNode }) {
  return (
    <Link href={props.href}>
      <Button variant="outline" style={{ minWidth: "100%" }}>
        <span className="flex justify-between gap-1 items-center">
          {props.children}
        </span>
      </Button>
    </Link>
  );
}

export default function Dashboard(props: { children: React.ReactNode }) {
  return (
    <main>
      <div className="grid grid-cols-[240px_minmax(0,1fr)]">
        <StickySidebar className="top-[calc(2.5rem+1px)] h-[calc(100vh-(5rem+2px))] p-3 rounded-md bg-primary-foreground border">
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
    </main>
  );
}
