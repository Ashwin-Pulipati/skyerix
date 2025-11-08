import { ForecastData } from "@/app/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format } from "date-fns";

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyWeather = ({ data }: HourlyTemperatureProps) => {
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feelsLike: Math.round(item.main.feels_like),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display">Today&apos;s Hourly Weather</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart data={chartData}>
              <XAxis
                dataKey={"time"}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
              <Line
                type={"monotone"}
                dataKey={"temp"}
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type={"monotone"}
                dataKey={"feelsLike"}
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
                strokeDasharray={"5 5"}
              />
              <Tooltip content={({ active, payload }) => {
                if(active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground font-sans">
                            Temperature
                          </span>
                          <span className="font-bold font-mono">{payload[0].value}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground font-sans">
                            FeelsLike
                          </span>
                          <span className="font-bold font-mono">{payload[1].value}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyWeather;
