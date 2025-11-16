"use client";

import * as React from "react";
import { ForecastData } from "@/app/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, isSameDay, addDays } from "date-fns";

function TokenTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; name?: string }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const temp = payload.find((p) => p.dataKey === "temp")?.value;
  const feels = payload.find((p) => p.dataKey === "feelsLike")?.value;

  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-lg border bg-background p-2 shadow-sm"
    >
      <p className="mb-1 font-sans text-xs text-muted-foreground">{label}</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <span className="font-sans text-xs text-muted-foreground">
            Temperature
          </span>
          <span className="font-mono font-bold">
            {typeof temp === "number" ? `${temp}°` : "—"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-sans text-xs text-muted-foreground">
            Feels like
          </span>
          <span className="font-mono font-bold">
            {typeof feels === "number" ? `${feels}°` : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

interface HourlyTemperatureProps {
  data: ForecastData;
}

const HourlyWeather = ({ data }: HourlyTemperatureProps) => {
  const chartData = React.useMemo(() => {
    const rows = data.list.slice(0, 8).map((item) => {
      const d = new Date(item.dt * 1000);
      return {
        date: d,
        time: format(d, "ha"),
        temp: Math.round(item.main.temp),
        feelsLike: Math.round(item.main.feels_like),
        dayLabel: format(d, "EEE"),
      };
    });

    if (rows.length === 0) return rows;

    const firstDay = rows[0].date;
    const tomorrow = addDays(firstDay, 1);

    const withDay = rows.map((r) => {
      let dayLabel: string;
      if (isSameDay(r.date, firstDay)) dayLabel = "Today";
      else if (isSameDay(r.date, tomorrow)) dayLabel = "Tomorrow";
      else dayLabel = format(r.date, "EEE"); // Mon, Tue ...
      return { ...r, dayLabel };
    });

    return withDay;
  }, [data.list]);

  return (
    <Card className="font-sans text-md leading-[var(--line-height)] text-foreground">
      <Tabs defaultValue="table" className="font-sans">
        <CardHeader className="pb-2 sm:pb-3">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="font-display text-xl tracking-tight sm:text-2xl">
              Today&apos;s Hourly Weather
            </CardTitle>
            <TabsList aria-label="Toggle hourly weather view">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="chart">Chart</TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>

        <CardContent>
          <TabsContent value="table">
            <div className="w-full overflow-x-auto">
              <Table>
                <TableCaption className="text-sm text-muted-foreground">
                  Hourly temperature and feels-like for today (with day
                  context).
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px] min-w-[88px]">
                      Time
                    </TableHead>
                    <TableHead className="w-[120px] min-w-[88px]">
                      Day
                    </TableHead>
                    <TableHead className="min-w-[120px]">Temperature</TableHead>
                    <TableHead className="min-w-[120px]">Feels like</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chartData.map((row) => (
                    <TableRow key={`${row.dayLabel}-${row.time}`}>
                      <TableCell className="font-medium">{row.time}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.dayLabel}
                      </TableCell>
                      <TableCell className="font-mono">{row.temp}°</TableCell>
                      <TableCell className="font-mono">
                        {row.feelsLike}°
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="chart">
            <div
              className="h-[220px] w-full sm:h-[240px]"
              role="img"
              aria-label="Line chart of hourly temperature and feels-like temperature for today"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 8, right: 12, bottom: 16, left: 8 }}
                >
                  <Legend
                    verticalAlign="top"
                    align="center"
                    iconType="line"
                    iconSize={24}
                    wrapperStyle={{
                      color: "var(--foreground)",
                      lineHeight: 1.2,
                    }}
                    formatter={(value) => (
                      <span
                        style={{
                          fontFamily: "var(--font-poppins)",
                          fontSize: "var(--font-size-sm)",
                        }}
                      >
                        {value}
                      </span>
                    )}
                  />
                  <XAxis
                    dataKey="time"
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={4}
                    label={{
                      value: "Time →",
                      position: "insideBottomRight",
                      offset: -6,
                      style: {
                        fill: "var(--muted-foreground)",
                        fontFamily: "var(--font-poppins)",
                        fontSize: "var(--font-size-sm)",
                      },
                    }}
                  />
                  <YAxis
                    stroke="var(--muted-foreground)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={36}
                    tickFormatter={(v: number) => `${v}°`}
                    label={{
                      value: "Temp (°) →",
                      angle: -90,
                      position: "insideLeft",
                      offset: -2,
                      style: {
                        fill: "var(--muted-foreground)",
                        fontFamily: "var(--font-poppins)",
                        fontSize: "var(--font-size-sm)",
                      },
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={false}
                    name="Temperature"
                  />
                  <Line
                    type="monotone"
                    dataKey="feelsLike"
                    stroke="var(--secondary)"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="5 5"
                    name="Feels like"
                  />
                  <Tooltip content={<TokenTooltip />} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default React.memo(HourlyWeather);
