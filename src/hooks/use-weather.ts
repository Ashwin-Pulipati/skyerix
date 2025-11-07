import { Coordinates } from "@/app/api/types";
import { weatherAPI } from "@/app/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
} as const;

export const useWeatherQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates!),
    queryFn: () => weatherAPI.getCurrentWeather(coordinates!),
    enabled: !!coordinates,
  });
};

export const useForecastQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates!),
    queryFn: () => weatherAPI.getForecast(coordinates!),
    enabled: !!coordinates,
  });
};

export const useReverseGeoCodeQuery = (coordinates: Coordinates | null) => {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates!),
    queryFn: () => weatherAPI.reverseGeoCode(coordinates!),
    enabled: !!coordinates,
  });
};
