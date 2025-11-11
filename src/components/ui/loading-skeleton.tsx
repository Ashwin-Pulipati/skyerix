import { Skeleton } from "../ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6 font-sans">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="grid gap-6 sm:grid-cols-2">
          <Skeleton className="h-[280px] w-full rounded-xl bg-muted-foreground/30 animate-pulse" />
          <Skeleton className="h-[280px] w-full rounded-xl bg-muted-foreground/30 animate-pulse" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <Skeleton className="h-[280px] w-full rounded-xl bg-muted-foreground/30 animate-pulse" />
          <Skeleton className="h-[280px] w-full rounded-xl bg-muted-foreground/30 animate-pulse" />
        </div>
      </div>
      <Skeleton className="h-[460px] w-full rounded-xl bg-muted-foreground/30 animate-pulse" />
    </div>
  );
};

export default LoadingSkeleton;
