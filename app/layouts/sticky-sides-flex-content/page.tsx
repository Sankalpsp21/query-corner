import { FakeParagraphs } from "@/components/helpers/FakeParagraphs";
import { FakeWordList } from "@/components/helpers/FakeWordList";
import { Paragraph } from "@/components/layout/paragraph";
import { Footer } from "@/components/layout/footer";
import { StickySidebar } from "@/components/layout/sticky-sidebar";

// This layout extends `sticky-header-sidebar-sticky-footer`,
// in case you need to switch between it and this one dynamically.
//
// If you don't, you can use the simpler
// `stick-sides-flex-content-simple` layout.
export default function Layout() {
  return (
    <>
      {/* For Footer to appear at the bottom, and the page
        to not have unnecessary scrollbar, the subtrahend
        inside calc() must be the same height as the header + footer */}
      <div className="grid grid-cols-[240px_minmax(0,1fr)]">
        <StickySidebar className="top-[calc(2.5rem+1px)] h-[calc(100vh-(5rem+2px))]">
          <div>Sticky Sidebar</div>
          <FakeWordList count={60} length={[4, 15]} />
        </StickySidebar>
        <main className="h-full overflow-y-auto p-4">
          <div className="h-full">
            <div className="p-4 bg-muted">
              <Paragraph>Main content</Paragraph>
              <FakeParagraphs words={80} count={4} />
            </div>
          </div>
        </main>
      </div>
      <Footer>Footer below fold inside the main column</Footer>
    </>
  );
}
