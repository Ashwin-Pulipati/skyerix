import { Skeleton } from "./ui/skeleton";


const LoadingSkeleton = () => {
  return (
    <>
      <div className="flex gap-6">
        <Skeleton className="h-[100px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
        <Skeleton className="h-[100px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
        <Skeleton className="h-[100px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
        <Skeleton className="h-[100px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[300px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
        <Skeleton className="h-[300px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-[300px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
        <Skeleton className="h-[300px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
      </div>
    </>
  );
}

export default LoadingSkeleton