import { Skeleton } from "@/components/ui/skeleton"


export default function SkeletonGrid() {


 return (
   <div className="p-4 grid grid-cols-4 gap-x-10 md:gap-x-4 md:p-2 gap-y-4">
       {Array.from({ length: 12 }).map((_, index) => (
           <Skeleton key={index} className="rounded-xl h-72 w-96 md:w-80 md:h-80 flex flex-col justify-evenly items-center" >
             <Skeleton className="rounded-xl bg-muted h-12 w-80 md:w-64 mt-5"/>
             <Skeleton className="rounded-xl bg-muted h-12 w-80 md:w-64 mt-1"/>
             <Skeleton className="rounded-xl bg-muted h-24 w-80 md:w-64 mt-1"/>
           </Skeleton>
       ))}
   </div>
 );
}
