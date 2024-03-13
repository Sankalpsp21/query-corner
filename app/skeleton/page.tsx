"use client";
import { StickySidebar } from "@/components/layout/sticky-sidebar";
import SkeletonGrid from "@/components/SkeletonGrid"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const { toast } = useToast()
  return (
    <main>
      {/* For Footer to appear at the bottom, and the page
        to not have unnecessary scrollbar, the subtrahend
        inside calc() must be the same height as the header + footer */}
      <div className="grid grid-cols-[240px_minmax(0,1fr)]">

        <StickySidebar className="top-[calc(2.5rem+1px)] h-[calc(100vh-(5rem+2px))] m-1 p-3 rounded-md bg-primary-foreground border flex flex-col items-start">
          <div>Sticky sidebar</div>
          <div>Example link</div>
          <div>Example link</div>
          <div>Example link</div>
          <div>Example link</div>
        </StickySidebar>

        <div className="h-full overflow-y-auto m-1 p-4 rounded-md ">
        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            })
          }}
        >
          Show Toast
        </Button>
            <SkeletonGrid />
        </div>
      </div>
    </main>
  );
}