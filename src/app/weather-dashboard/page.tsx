"use client";

import CitySearch from "@/components/city-search";
import LocationRequired from "@/components/weather/LocationRequired";
import WeatherError from "@/components/weather/WeatherError";
import WeatherLoading from "@/components/weather/WeatherLoading";
import WeatherView from "@/components/weather/WeatherView";
import { useWeatherData } from "@/hooks/use-weather-data";
import { useSearchParams, useRouter } from "next/navigation";

const WeatherDashboard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const city = searchParams.get("city");

  const location =
    lat && lon ? { lat: parseFloat(lat), lon: parseFloat(lon) } : undefined;

  const {
    weatherData,
    forecastData,
    locationData,
    isLoading,
    error,
    handleRefresh,
    getLocation,
    coordinates,
  } = useWeatherData(location);

  const handleCurrentLocation = () => {
    router.push("/weather-dashboard");
  };

  if (isLoading) {
    return <WeatherLoading />;
  }

  if (error) {
    return <WeatherError error={error.message} onRetry={handleRefresh} />;
  }

  const displayLocation =
    city && locationData
      ? { ...locationData, name: city, lat: locationData.lat, lon: locationData.lon }
      : locationData;

  return (
    <div>
      <div className="block md:hidden mb-4">
        <CitySearch />
      </div>
      {!coordinates && <LocationRequired onEnableLocation={getLocation} />}
      {coordinates && weatherData && forecastData && (
        <WeatherView
          weatherData={weatherData}
          forecastData={forecastData}
          locationData={displayLocation}
          isRefreshing={isLoading}
          onRefresh={handleRefresh}
          onCurrentLocation={handleCurrentLocation}
        />
      )}
    </div>
  );
};

export default WeatherDashboard;
