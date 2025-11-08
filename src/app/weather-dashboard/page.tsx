"use client";
import LocationRequired from "@/components/weather/LocationRequired";
import WeatherError from "@/components/weather/WeatherError";
import WeatherLoading from "@/components/weather/WeatherLoading";
import WeatherView from "@/components/weather/WeatherView";
import { useWeatherData } from "@/hooks/use-weather-data";

const WeatherDashboard = () => {
  const {
    weatherData,
    forecastData,
    locationData,
    isLoading,
    error,
    handleRefresh,
    getLocation,
    coordinates,
  } = useWeatherData();

  if (isLoading) {
    return <WeatherLoading />;
  }

  if (error) {
    return <WeatherError error={error.message} onRetry={handleRefresh} />;
  }

  if (!coordinates) {
    return <LocationRequired onEnableLocation={getLocation} />;
  }

  if (!weatherData || !forecastData) {
    return <WeatherLoading />;
  }

  return (
    <WeatherView
      weatherData={weatherData}
      forecastData={forecastData}
      locationData={locationData}
      isRefreshing={isLoading}
      onRefresh={handleRefresh}
    />
  );
};

export default WeatherDashboard;
