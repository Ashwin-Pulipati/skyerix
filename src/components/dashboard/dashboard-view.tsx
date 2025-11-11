"use client";

import { ForecastData, GeocodingResponse, WeatherData } from "@/app/api/types";
import { CurrentWeather } from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-weather";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MapPin, RefreshCw } from "lucide-react";
import { FavoriteButton } from "../favorites/favorite-button";
import { FiveDayWeatherForecast } from "../five-day-weather-forecast";
import WeatherDetails from "../weather-details";
import WorldFavoritesMap from "../world-favorites-map";

interface WeatherViewProps {
  weatherData: WeatherData;
  forecastData: ForecastData;
  locationData?: GeocodingResponse;
  isRefreshing: boolean;
  onRefresh: () => void;
  onCurrentLocation: () => void;
}

const WeatherView = ({
  weatherData,
  forecastData,
  locationData,
  isRefreshing,
  onRefresh,
  onCurrentLocation,
}: WeatherViewProps) => {
  return (
    <div className="mt-7 md:mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold tracking-tight">
          {locationData?.name || "My Location"}
        </h1>

        <div className="flex items-center gap-4">
          {/* Favorite */}
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex">
                <FavoriteButton
                  data={weatherData}
                  aria-label="Toggle favorite"
                />
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom">Toggle favorite</TooltipContent>
          </Tooltip>

          {/* Current location */}
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex">
                <Button
                  variant="outline"
                  size="icon-lg"
                  onClick={onCurrentLocation}
                  aria-label="Use current location"
                  className="rounded-full"
                >
                  <MapPin size={20} aria-hidden="true" />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom">Use current location</TooltipContent>
          </Tooltip>

          {/* Refresh (works even when disabled) */}
          <Tooltip>
            <TooltipTrigger asChild>
              {/* Wrap disabled buttons so Radix can still receive pointer events */}
              <span
                className="inline-flex"
                tabIndex={isRefreshing ? 0 : undefined}
                aria-disabled={isRefreshing || undefined}
              >
                <Button
                  variant="outline"
                  size="icon-lg"
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  aria-label={isRefreshing ? "Refreshing" : "Refresh weather"}
                  className="rounded-full"
                >
                  <RefreshCw
                    size={20}
                    className={isRefreshing ? "animate-spin" : ""}
                    aria-hidden="true"
                  />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {isRefreshing ? "Refreshing…" : "Refresh"}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <CurrentWeather data={weatherData} locationName={locationData} />
        <HourlyTemperature data={forecastData} />
        <WeatherDetails data={weatherData} />
        <FiveDayWeatherForecast data={forecastData} />
      </div>
      <WorldFavoritesMap />
    </div>
  );
};

export default WeatherView;
