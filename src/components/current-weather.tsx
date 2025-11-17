import { GeocodingResponse, WeatherData } from "@/app/api/types";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

interface CurrentWeatherProps {
  readonly data: WeatherData;
  readonly locationName?: GeocodingResponse;
}

export function CurrentWeather({ data, locationName }: CurrentWeatherProps) {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card className="overflow-hidden font-sans text-md leading-[var(--line-height)] text-foreground h-fit">
      <CardContent className="p-4 sm:p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex min-w-0 items-baseline gap-1">
                <h2
                  className="font-display text-2xl font-bold tracking-tight truncate"
                  title={[locationName?.name, locationName?.state]
                    .filter(Boolean)
                    .join(", ")}
                >
                  {locationName?.name}
                </h2>
                {locationName?.state && (
                  <span className="text-md text-muted-foreground truncate font-sans">
                    , {locationName.state}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground font-sans">
                {locationName?.country}
              </p>
            </div>

            <div className="flex items-end gap-3 mt-8">
              <p className="font-display text-6xl sm:text-7xl font-bold tracking-tighter leading-[0.9]">
                {formatTemp(temp)}
              </p>
              <div className="space-y-1 pb-1 font-sans">
                <p className="text-sm font-medium text-muted-foreground">
                  Feels like {formatTemp(feels_like)}
                </p>
                <div className="flex gap-3 text-sm font-medium">
                  <span
                    className="flex items-center gap-1 text-primary"
                    aria-label={`Low ${formatTemp(temp_min)}`}
                  >
                    <ArrowDown className="h-3 w-3" aria-hidden="true" />
                    {formatTemp(temp_min)}
                  </span>
                  <span
                    className="flex items-center gap-1 text-destructive"
                    aria-label={`High ${formatTemp(temp_max)}`}
                  >
                    <ArrowUp className="h-3 w-3" aria-hidden="true" />
                    {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 font-sans mt-8">
              <div className="flex items-center gap-2 min-w-0">
                <Droplets
                  className="h-4 w-4 text-primary shrink-0"
                  aria-hidden="true"
                />
                <div className="space-y-0.5 min-w-0">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm text-muted-foreground">{humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2 min-w-0">
                <Wind
                  className="h-4 w-4 text-primary shrink-0"
                  aria-hidden="true"
                />
                <div className="space-y-0.5 min-w-0">
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-sm text-muted-foreground">{speed} m/s</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <figure
              className="relative flex aspect-square w-full max-w-[180px] sm:max-w-[200px] items-center justify-center"
              aria-label={currentWeather.description}
            >
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="h-full w-full object-contain"
                loading="lazy"
              />
              <figcaption className="absolute bottom-0 w-full text-center">
                <p className="text-sm font-medium capitalize font-mono">
                  {currentWeather.description}
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
