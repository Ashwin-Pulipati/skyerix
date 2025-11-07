"use client";
import LoadingSkeleton from '@/components/main/loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton';
import useGeolocation from '@/hooks/use-geolocation';
import { AlertTriangle, MapPin, RefreshCcw } from 'lucide-react'


const WeatherDashboard = () => {
    const { coordinates, error: locationError, getLocation, isLoading: locationLoading } = useGeolocation();
    
    const handleRefresh = () => {
        getLocation();
        if (coordinates) {
            
        }
    }

    if (locationLoading) {
        return (
          <div className="space-y-6">
            <div className="mt-7 md:mt-0 space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold tracking-tight">
                  My Location
                </h1>
                <Button variant="default" size="icon-lg">
                  <RefreshCcw size={20} />
                </Button>
              </div>
              <LoadingSkeleton/>
            </div>
          </div>
        );
  }
  
  if (locationError) {
    return (
      <Alert variant="destructive" className='mt-7 md:mt-0 space-y-4'>
        <AlertTriangle size={20} />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant="destructive" className="mt-7 md:mt-0 space-y-4">
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
    return (
      <div className='mt-7 md:mt-0 space-y-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
          <Button variant="default" size="icon-lg">
            <RefreshCcw size={20} />
          </Button>
        </div>
      </div>
    );
}

export default WeatherDashboard