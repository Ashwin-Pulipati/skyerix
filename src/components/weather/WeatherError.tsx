import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface WeatherErrorProps {
  error: string;
  onRetry: () => void;
}

const WeatherError = ({ error, onRetry }: WeatherErrorProps) => (
  <Alert variant="destructive" className="mt-7 md:mt-0">
    <AlertTriangle size={20} />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription className="flex flex-col gap-4">
      <p>{error}</p>
      <Button variant="outline" onClick={onRetry} className="w-fit">
        <RefreshCw className="mr-2" size={20} />
        Retry
      </Button>
    </AlertDescription>
  </Alert>
);

export default WeatherError;