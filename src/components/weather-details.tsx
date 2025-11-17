import { WeatherData } from "@/app/api/types";
import { format } from "date-fns";
import { Sunrise, Sunset, Compass, Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { memo } from "react";


interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
    const { main, sys, wind } = data

    const formatTime = (timestamp: number) => {
        return format(new Date(timestamp * 1000), "h:mm a");
    }

    const getWindDirection = (degree: number) => {
      const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
      const index =
        Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
      return directions[index];
    };

    const details = [
      {
        title: "Sunrise",
        value: formatTime(sys.sunrise),
        icon: Sunrise,
        color: "text-orange-500",
      },
      {
        title: "Sunset",
        value: formatTime(sys.sunset),
        icon: Sunset,
        color: "text-blue-500",
      },
      {
        title: "Wind Direction",
        value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
        icon: Compass,
        color: "text-green-500",
      },
      {
        title: "Pressure",
        value: `${main.pressure} hPa`,
        icon: Gauge,
        color: "text-purple-500",
      },
    ];

  return (
    <Card className="font-sans text-md leading-[var(--line-height)] text-foreground h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-xl sm:text-2xl tracking-tight">
          Weather Details
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              role="group"
              aria-label={`${detail.title}: ${detail.value}`}
              className="flex items-center gap-3 rounded-lg border bg-card p-4 shadow-xs"
            >
              <detail.icon
                className={`h-5 w-5 ${detail.color}`}
                aria-hidden="true"
              />

              <div className="min-w-0">
                <p className="text-sm font-medium leading-none">
                  {detail.title}
                </p>
                <p className="text-sm text-muted-foreground font-mono">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(WeatherDetails);