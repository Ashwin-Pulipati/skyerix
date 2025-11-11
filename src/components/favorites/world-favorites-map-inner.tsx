"use client";

import { useMemo, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L, { LatLngBoundsExpression, DivIcon } from "leaflet";
import { useFavorites } from "@/hooks/use-favorites";
import useGeolocation from "@/hooks/use-geolocation";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

function FitToPoints({
  points,
}: {
  points: Array<{ lat: number; lon: number }>;
}) {
  const map = useMap();
  useEffect(() => {
    if (!map || points.length === 0) return;
    const bounds: LatLngBoundsExpression = points.map((p) => [
      p.lat,
      p.lon,
    ]) as any;
    map.fitBounds(bounds, { padding: [32, 32], maxZoom: 8 });
  }, [map, points]);
  return null;
}

function createPinOutline(colorVar: string): DivIcon {
  return L.divIcon({
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"
        style="color:${colorVar}">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    `,
    className: "",
    iconSize: [26, 26],
    iconAnchor: [13, 24],
    popupAnchor: [0, -20],
  });
}

function createPinFilled(colorVar: string): DivIcon {
  return L.divIcon({
    html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
        style="color:${colorVar}; display:block; filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.25));">
        <!-- solid pin -->
        <path d="M12 22s-9-6-9-12a9 9 0 1 1 18 0c0 6-9 12-9 12z"
          fill="currentColor" stroke="none"/>
        <!-- inner dot contrasts with background -->
        <circle cx="12" cy="10" r="3.2" fill="var(--background)"/>
      </svg>
    `,
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 26],
    popupAnchor: [0, -22],
  });
}

export default function WorldFavoritesMapInner() {
  const router = useRouter();
  const { favorites } = useFavorites();
  const { coordinates } = useGeolocation();

  const hasFavorites = (favorites?.length ?? 0) > 0;

  const points = useMemo(() => {
    if (hasFavorites) return favorites.map((f) => ({ lat: f.lat, lon: f.lon }));
    return coordinates ? [{ lat: coordinates.lat, lon: coordinates.lon }] : [];
  }, [favorites, hasFavorites, coordinates]);

  const initialCenter = useMemo<[number, number]>(() => {
    if (hasFavorites && favorites[0])
      return [favorites[0].lat, favorites[0].lon];
    if (coordinates) return [coordinates.lat, coordinates.lon];
    return [20, 0];
  }, [favorites, hasFavorites, coordinates]);

  const favoriteIcon = useMemo(() => createPinOutline("var(--secondary)"), []);
  const currentIcon = useMemo(() => createPinFilled("var(--primary)"), []);

  return (
    <Card className="font-sans text-md leading-[var(--line-height)] text-foreground mt-10">
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-xl sm:text-2xl tracking-tight">
          World Map
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div
          className="rounded-lg border bg-card"
          aria-label="World map highlighting favorite cities or current location"
        >
          <MapContainer
            center={initialCenter}
            zoom={hasFavorites || coordinates ? 4 : 2}
            scrollWheelZoom
            className="h-[500px] w-full rounded-lg z-40"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            />

            {points.length > 0 && <FitToPoints points={points} />}
           
            {hasFavorites &&
              favorites.map((f) => (
                <Marker
                  key={f.id}
                  position={[f.lat, f.lon]}
                  icon={favoriteIcon}
                  eventHandlers={{
                    click: () => {
                      const cityParam = encodeURIComponent(f.name);
                      router.push(
                        `/weather-dashboard?lat=${f.lat}&lon=${f.lon}&city=${cityParam}`
                      );
                    },
                    keypress: (e: any) => {
                      const key = e.originalEvent?.key;
                      if (key === "Enter" || key === " ") {
                        const cityParam = encodeURIComponent(f.name);
                        router.push(
                          `/weather-dashboard?lat=${f.lat}&lon=${f.lon}&city=${cityParam}`
                        );
                      }
                    },
                  }}
                >
                  <Tooltip direction="top" offset={[0, -4]}>
                    <div className="font-sans text-xs">
                      <div className="font-medium">{f.name}</div>
                      <div className="text-muted-foreground">
                        {f.country}
                        {f.state ? `, ${f.state}` : ""}
                      </div>
                      <div className="text-muted-foreground">★ Favorite</div>
                    </div>
                  </Tooltip>
                </Marker>
              ))}
            
            {!hasFavorites && coordinates && (
              <Marker
                position={[coordinates.lat, coordinates.lon]}
                icon={currentIcon}
              >
                <Tooltip direction="top" offset={[0, -4]}>
                  <div className="font-sans text-xs">
                    <div className="font-medium">Your current location</div>
                  </div>
                </Tooltip>
              </Marker>
            )}
          </MapContainer>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <div
          className="inline-flex flex-wrap items-center gap-4 rounded-md border px-3 py-2 text-xs"
          aria-label="Map legend"
        >
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-2.5 w-5 rounded-sm"
              style={{ background: "var(--secondary)" }}
            />
            <span className="font-medium">Favorite</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-2.5 w-5 rounded-sm"
              style={{ background: "var(--primary)" }}
            />
            <span className="font-medium">Current location</span>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
