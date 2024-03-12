import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonGrid() {

  return (
    <div className="p-4 grid grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="rounded-xl h-72 w-96" />
        ))}
    </div>
  );
}