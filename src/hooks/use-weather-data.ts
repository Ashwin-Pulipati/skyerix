"use client";
import useGeolocation from "@/hooks/use-geolocation";
import {
  useForecastQuery,
  useReverseGeoCodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { Coordinates } from "@/app/api/types";

export const useWeatherData = (passedCoordinates?: Coordinates) => {
  const {
    coordinates: geoCoordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  const coordinates = passedCoordinates || geoCoordinates;

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeoCodeQuery(coordinates);

  const handleRefresh = () => {
    if (!passedCoordinates) {
      getLocation();
    }
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  const isLoading =
    (locationLoading && !passedCoordinates) ||
    weatherQuery.isFetching ||
    forecastQuery.isFetching;
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
