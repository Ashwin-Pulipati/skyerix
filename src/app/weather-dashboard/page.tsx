"use client";
import { CitySearchComponent } from "@/components/ui/city-search-component";
import LocationRequired from "@/components/weather/LocationRequired";
import WeatherError from "@/components/weather/WeatherError";
import WeatherLoading from "@/components/weather/WeatherLoading";
import WeatherView from "@/components/weather/WeatherView";
import { useWeatherData } from "@/hooks/use-weather-data";
import { useSearchParams } from "next/navigation";

const WeatherDashboard = () => {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const coordinates = lat && lon ? { lat: Number(lat), lon: Number(lon) } : undefined;

  const {
    weatherData,
    forecastData,
    locationData,
    isLoading,
    error,
    handleRefresh,
    getLocation,
    coordinates: weatherCoordinates,
  } = useWeatherData(coordinates);

  if (isLoading) {
    return <WeatherLoading />;
  }

  if (error) {
    return <WeatherError error={error.message} onRetry={handleRefresh} />;
  }

  if (!weatherCoordinates) {
    return <LocationRequired onEnableLocation={getLocation} />;
  }

  if (!weatherData || !forecastData) {
    return <WeatherLoading />;
  }

  return (
    <div>
      <div className="block md:hidden">
        <CitySearchComponent />
      </div>
      <WeatherView
      weatherData={weatherData}
      forecastData={forecastData}
      locationData={locationData}
      isRefreshing={isLoading}
      onRefresh={handleRefresh}
    />
    </div>
    
  );
};

export default WeatherDashboard;
