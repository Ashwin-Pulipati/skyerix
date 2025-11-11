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
    router.push(`/weather-dashboard?lat=${lat}&lon=${lon}&city=${cityParam}`);
  }, [router, name, lat, lon]);

  return (
    <div
      className="
    group relative m-2
    flex items-center gap-3
    rounded-xl border bg-card shadow-sm
    px-4 pr-10 py-4 md:pt-9
    transition-shadow motion-safe:hover:ring-2 motion-safe:hover:ring-primary
    min-w-72
    font-sans text-md leading-[var(--line-height)] text-foreground
  "
      aria-label={`Open weather for ${name}`}
    >
      <button
        type="button"
        onClick={goToCity}
        className="
      absolute inset-0 rounded-xl
      focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-ring
      focus-visible:ring-offset-2 focus-visible:ring-offset-background
    "
        aria-label={`Open weather for ${name}`}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="
      absolute right-2 top-2 z-20 h-7 w-7 rounded-full p-0
      text-foreground bg-muted/90
      hover:bg-destructive hover:text-destructive-foreground
      dark:hover:bg-destructive dark:hover:text-destructive-foreground 
    "
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from Favorites`);
        }}
        aria-label={`Remove ${name} from favorites`}
        title={`Remove ${name} from favorites`}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </Button>

      {isLoading ? (
        <div className="z-10 flex h-8 items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        </div>
      ) : weather ? (
        <>
          <div className="z-10 flex min-w-0 items-center gap-2">
            <img
              src={`https://openweathermap.org/img/wn/${
                weather.weather?.[0]?.icon ?? "01d"
              }@2x.png`}
              alt={weather.weather?.[0]?.description ?? "weather icon"}
              className="h-8 w-8 md:h-10 md:w-10"
            />
            <div className="min-w-0">
              <p className="truncate text-md font-medium" title={name}>
                {name}
              </p>
              <p className="text-xs text-muted-foreground">
                {weather.sys?.country}
              </p>
            </div>
          </div>

          <div className="z-10 ml-auto text-right">
            <p className="text-2xl font-bold">
              {Math.round(weather.main?.temp ?? 0)}°
            </p>
            <p
              className="max-w-[10rem] truncate text-xs capitalize text-muted-foreground"
              title={weather.weather?.[0]?.description ?? ""}
            >
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
    <section
      aria-labelledby="favorites-heading"
      className="
    space-y-3
    font-sans text-md leading-[var(--line-height)] text-foreground
  "
    >
      <h2
        id="favorites-heading"
        className="
      text-xl md:text-2xl font-semibold tracking-tight
      text-foreground
    "
      >
        Favorites
      </h2>

      <ScrollArea
        className="
      w-full pb-2 md:pb-3
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
    "
      >
        <div
          className="
        flex gap-3 md:gap-4 pr-2
        snap-x snap-mandatory
        scroll-smooth
      "
          aria-label="Favorite cities"
        >
          {favorites.map((city) => (
            <div key={city.id} className="snap-start">
              <FavoriteCityTablet
                id={city.id}
                name={city.name}
                lat={city.lat}
                lon={city.lon}
                onRemove={() => removeFavorite.mutate(city.id)}
              />
            </div>
          ))}
        </div>

        <ScrollBar
          orientation="horizontal"
          className="mt-2 opacity-75 hover:opacity-100 transition-opacity"
        />
      </ScrollArea>
    </section>
  );
}

export default FavoriteCities;
