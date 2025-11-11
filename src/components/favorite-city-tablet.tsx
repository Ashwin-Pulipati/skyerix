import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useWeatherQuery } from "@/hooks/use-weather";
import { toast } from "sonner";
import { memo, useCallback } from "react";

interface FavoriteCityTabletProps {
  readonly id: string;
  readonly name: string;
  readonly lat: number;
  readonly lon: number;
  readonly onRemove: (id: string) => void;
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
        group relative m-2 min-w-72
        font-sans text-md leading-[var(--line-height)] text-foreground
      "
      aria-label={`Open weather for ${name}`}
    >
      {/* full-bleed interactive surface */}
      <button
        type="button"
        onClick={goToCity}
        className="
          block w-full text-left
          rounded-xl border bg-card shadow-sm
          px-4 pr-10 py-4 md:pt-9
          transition-shadow
          hover:shadow-md motion-safe:hover:ring-2 motion-safe:hover:ring-primary
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-ring
          focus-visible:ring-offset-2 focus-visible:ring-offset-background
        "
        aria-label={`Open weather for ${name}`}
      >
        {isLoading ? (
          <div className="z-10 flex h-8 items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          </div>
        ) : weather ? (
          <div className="flex items-center gap-3">
            <div className="z-10 flex min-w-0 items-center gap-2">
              <img
                src={`https://openweathermap.org/img/wn/${
                  weather.weather?.[0]?.icon ?? "01d"
                }@2x.png`}
                alt={weather.weather?.[0]?.description ?? "weather icon"}
                className="h-8 w-8 md:h-10 md:w-10"
                loading="lazy"
                decoding="async"
              />
              <div className="min-w-0">
                {/* city name: body font, fluid md */}
                <p className="truncate text-md font-medium" title={name}>
                  {name}
                </p>
                {/* country: muted, fluid xs */}
                <p className="text-xs text-muted-foreground">
                  {weather.sys?.country}
                </p>
              </div>
            </div>

            <div className="z-10 ml-auto text-right">
              {/* temp: display font, fluid 2xl, tight tracking */}
              <p className="font-display text-2xl font-bold tracking-tight">
                {Math.round(weather.main?.temp ?? 0)}°
              </p>
              <p
                className="max-w-[10rem] truncate text-xs capitalize text-muted-foreground"
                title={weather.weather?.[0]?.description ?? ""}
              >
                {weather.weather?.[0]?.description ?? ""}
              </p>
            </div>
          </div>
        ) : null}
      </button>

      {/* remove button as separate sibling (no nesting) */}
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
    </div>
  );
}

export default memo(FavoriteCityTablet);
