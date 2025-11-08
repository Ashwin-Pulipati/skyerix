"use client";
import useGeolocation from "@/hooks/use-geolocation";
import {
  useForecastQuery,
  useReverseGeoCodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";

export const useWeatherData = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeoCodeQuery(coordinates);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  const isLoading =
    locationLoading || weatherQuery.isFetching || forecastQuery.isFetching;
  const error = locationError
    ? new Error(locationError)
    : weatherQuery.error || forecastQuery.error;

  return {
    weatherData: weatherQuery.data,
    forecastData: forecastQuery.data,
    locationData: locationQuery.data?.[0],
    isLoading,
    error,
    handleRefresh,
    getLocation,
    coordinates,
  };
};
