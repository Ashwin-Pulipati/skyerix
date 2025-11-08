import LoadingSkeleton from "@/components/loading-skeleton";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const WeatherLoading = () => (
  <div className="space-y-6">
    <div className="mt-7 md:mt-0 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button variant="default" size="icon-lg">
          <RefreshCcw size={20} />
        </Button>
      </div>
      <LoadingSkeleton />
    </div>
  </div>
);

export default WeatherLoading;