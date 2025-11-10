"use client";
import {
  useForecastQuery,
  useReverseGeoCodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import useGeolocation from "./use-geolocation";

export const useWeatherData = (location?: { lat: number; lon: number }) => {
  const {
    coordinates: geoCoordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  const coordinates = location || geoCoordinates;

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeoCodeQuery(coordinates);

  const handleRefresh = () => {
    if (!location && !coordinates) {
      getLocation();
    }
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  const isLoading =
    (location ? false : locationLoading) ||
    weatherQuery.isFetching ||
    forecastQuery.isFetching;
  const error = location
    ? weatherQuery.error || forecastQuery.error
    : locationError
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
