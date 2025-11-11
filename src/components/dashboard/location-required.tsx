import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface LocationRequiredProps {
  onEnableLocation: () => void;
}

const LocationRequired = ({ onEnableLocation }: LocationRequiredProps) => (
  <Alert variant="destructive" className="mt-7 md:mt-0">
    <MapPin size={20} />
    <AlertTitle>Location Required</AlertTitle>
    <AlertDescription className="flex flex-col gap-4">
      <p>Please enable location access to see your local weather.</p>
      <Button variant="outline" onClick={onEnableLocation} className="w-fit">
        <MapPin className="mr-2" size={20} />
        Enable Location
      </Button>
    </AlertDescription>
  </Alert>
);

export default LocationRequired;