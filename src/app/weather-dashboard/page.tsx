"use client";

import { Suspense } from "react";
import CitySearch from "@/components/city-search";
import LocationRequired from "@/components/dashboard/location-required";
import WeatherError from "@/components/dashboard/weather-error";
import WeatherLoading from "@/components/dashboard/weather-loading";
import WeatherView from "@/components/dashboard/dashboard-view";
import { useWeatherData } from "@/hooks/use-weather-data";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";

const FavoriteCities = dynamic(
  () => import("@/components/favorites/favorite-cities"),
  { ssr: false }
);

function WeatherDashboardInner() {
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

  if (isLoading) return <WeatherLoading />;
  if (error)
    return <WeatherError error={error.message} onRetry={handleRefresh} />;

  const displayLocation =
    city && locationData
      ? {
          ...locationData,
          name: city,
          lat: locationData.lat,
          lon: locationData.lon,
        }
      : locationData;

  return (
    <div>
      <div className="mb-4 block md:hidden">
        <CitySearch />
      </div>
      <FavoriteCities />
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
}

export default function WeatherDashboard() {
  return (
    <Suspense fallback={<WeatherLoading />}>
      <WeatherDashboardInner />
    </Suspense>
  );
}
