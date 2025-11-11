import { Skeleton } from "./ui/skeleton";


const LoadingSkeleton = () => {
  return (
    <>
      <div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
          <Skeleton className="h-[300px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
          <Skeleton className="h-[300px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
        </div>
      </div>
      <Skeleton className="h-[500px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
    </>
  );
}

export default LoadingSkeleton