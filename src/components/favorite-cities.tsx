"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useWeatherQuery } from "@/hooks/use-weather";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";
import { toast } from "sonner";

interface FavoriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

function FavoriteCityTablet({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavoriteCityTabletProps) {
  const router = useRouter();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  const goToCity = useCallback(() => {
    const cityParam = encodeURIComponent(name);
    // Navigate to your existing Weather Dashboard route with query params
    router.push(`/weather-dashboard?lat=${lat}&lon=${lon}&city=${cityParam}`);
    // If you prefer /city/[name]:
    // router.push(`/city/${cityParam}?lat=${lat}&lon=${lon}`);
  }, [router, name, lat, lon]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      goToCity();
    }
  };

  return (
    <div
      onClick={goToCity}
      onKeyDown={onKeyDown}
      className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
      role="button"
      tabIndex={0}
      aria-label={`Open weather for ${name}`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from Favorites`);
        }}
        aria-label={`Remove ${name} from favorites`}
      >
        <X className="h-4 w-4" />
      </Button>

      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${
                weather.weather?.[0]?.icon ?? "01d"
              }@2x.png`}
              alt={weather.weather?.[0]?.description ?? "weather icon"}
              className="h-8 w-8"
            />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">
                {weather.sys?.country}
              </p>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xl font-bold">
              {Math.round(weather.main?.temp ?? 0)}°
            </p>
            <p className="text-xs capitalize text-muted-foreground">
              {weather.weather?.[0]?.description ?? ""}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export function FavoriteCities() {
  const { favorites, removeFavorite } = useFavorites();

  if (!favorites || favorites.length === 0) {
    return null;
  }

  return (
    <>
      <h1 className="text-xl font-bold tracking-tight">Favorites</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
          {favorites.map((city) => (
            <FavoriteCityTablet
              key={city.id}
              id={city.id}
              name={city.name}
              lat={city.lat}
              lon={city.lon}
              onRemove={() => removeFavorite.mutate(city.id)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </>
  );
}

export default FavoriteCities;
