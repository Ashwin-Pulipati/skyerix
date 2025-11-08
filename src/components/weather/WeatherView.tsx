"use client";

import { ForecastData, GeocodingResponse, WeatherData } from "@/app/api/types";
import { CurrentWeather } from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-weather";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import WeatherDetails from "../weather-details";
import { FiveDayWeatherForecast } from "../five-day-weather-forecast";


interface WeatherViewProps {
  weatherData: WeatherData;
  forecastData: ForecastData;
  locationData?: GeocodingResponse;
  isRefreshing: boolean;
  onRefresh: () => void;
}

const WeatherView = ({
  weatherData,
  forecastData,
  locationData,
  isRefreshing,
  onRefresh,
}: WeatherViewProps) => {
  return (
    <div className="mt-7 md:mt-0 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">
          {locationData?.name || "My Location"}
        </h1>
        <Button
          variant="outline"
          size="icon-lg"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`${isRefreshing ? "animate-spin" : ""}`}
            size={20}
          />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <CurrentWeather data={weatherData} locationName={locationData} />
        <HourlyTemperature data={forecastData} />
        <WeatherDetails data={weatherData} />
        <FiveDayWeatherForecast data={forecastData} />
      </div>
    </div>
  );
};

export default WeatherView;
