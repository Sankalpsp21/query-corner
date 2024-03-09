"use client";

import { Paragraph } from "@/components/layout/paragraph";
import { StickySidebar } from "@/components/layout/sticky-sidebar";

export default function Dashboard() {
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

        <main className="h-full overflow-y-auto p-4">
          <div className="h-full">
            <div className="p-4 bg-muted border">
              <Paragraph>
                Main content. This is where the cards and maybe the search bar w filter will go
              </Paragraph>
            </div>
          </div>
        </main>
      </div>
    </main>
  );
}