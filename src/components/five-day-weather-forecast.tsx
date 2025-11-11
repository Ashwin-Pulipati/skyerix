import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { format } from "date-fns";
import { ForecastData } from "@/app/api/types";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";


interface FiveDayWeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

export function FiveDayWeatherForecast ({ data }: FiveDayWeatherForecastProps) {
  // Group forecast by day and get daily min/max
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecast>);

  // Get next 5 days
  const nextDays = Object.values(dailyForecasts).slice(1, 6);

  // Format temperature
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <Card className="font-sans text-md leading-[var(--line-height)] text-foreground">
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-xl sm:text-2xl tracking-tight">
          5-Day Forecast
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Responsive container: keeps table readable on mobile */}
        <div className="w-full overflow-x-auto">
          <Table>
            <TableCaption className="text-sm text-muted-foreground">
              Daily outlook with highs, lows, humidity, and wind speed.
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%] min-w-[220px]">
                  Date &amp; Summary
                </TableHead>
                <TableHead className="min-w-[160px] text-center">
                  Temperatures
                </TableHead>
                <TableHead className="min-w-[180px] text-right">
                  Humidity / Wind
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {nextDays.map((day) => (
                <TableRow key={day.date}>
                  {/* Date + description */}
                  <TableCell className="align-middle">
                    <div className="flex flex-col">
                      <p className="font-medium">
                        {format(new Date(day.date * 1000), "EEE, MMM d")}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {day.weather.description}
                      </p>
                    </div>
                  </TableCell>

                  {/* Temps: low (primary), high (destructive) */}
                  <TableCell className="align-middle">
                    <div className="flex items-center justify-center gap-4">
                      <span
                        className="flex items-center text-primary font-mono"
                        aria-label={`Low ${formatTemp(day.temp_min)}`}
                        title={`Low ${formatTemp(day.temp_min)}`}
                      >
                        <ArrowDown
                          className="mr-1 h-4 w-4"
                          aria-hidden="true"
                        />
                        {formatTemp(day.temp_min)}
                      </span>
                      <span
                        className="flex items-center text-destructive font-mono"
                        aria-label={`High ${formatTemp(day.temp_max)}`}
                        title={`High ${formatTemp(day.temp_max)}`}
                      >
                        <ArrowUp className="mr-1 h-4 w-4" aria-hidden="true" />
                        {formatTemp(day.temp_max)}
                      </span>
                    </div>
                  </TableCell>

                  {/* Humidity + wind, right-aligned */}
                  <TableCell className="align-middle">
                    <div className="ml-auto flex items-center justify-end gap-6">
                      <span
                        className="flex items-center gap-1"
                        aria-label={`Humidity ${day.humidity}%`}
                        title={`Humidity ${day.humidity}%`}
                      >
                        <Droplets
                          className="h-4 w-4 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-mono">
                          {day.humidity}%
                        </span>
                      </span>
                      <span
                        className="flex items-center gap-1"
                        aria-label={`Wind ${day.wind} m/s`}
                        title={`Wind ${day.wind} m/s`}
                      >
                        <Wind
                          className="h-4 w-4 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-mono">
                          {day.wind} m/s
                        </span>
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
