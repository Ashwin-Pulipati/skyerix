import LoadingSkeleton from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const WeatherLoading = () => (
  <div className="space-y-6">
    <div className="mt-7 md:mt-0 space-y-4">
      <h1 className="text-xl font-bold tracking-tight font-display">
        Favorites
      </h1>
      <div className="flex gap-6">
        <Skeleton className="h-[100px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
        <Skeleton className="h-[100px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
        <Skeleton className="h-[100px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
        <Skeleton className="h-[100px] w-full rounded-lg bg-muted-foreground/30 animate-pulse" />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight font-display">
          My Location
        </h1>
        <Button variant="outline" size="icon-lg" className="rounded-full">
          <RefreshCcw size={20} />
        </Button>
      </div>
      <LoadingSkeleton />
    </div>
  </div>
);

export default WeatherLoading;