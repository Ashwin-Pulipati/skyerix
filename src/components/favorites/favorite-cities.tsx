"use client";

import { useCallback } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useFavorites } from "@/hooks/use-favorites";
import FavoriteCityTablet from "./favorite-city-tablet";

export function FavoriteCities() {
  const { favorites, removeFavorite } = useFavorites();

  const onRemove = useCallback(
    (id: string) => removeFavorite.mutate(id),
    [removeFavorite]
  );

  if (!favorites || favorites.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="favorites-heading"
      className="
    space-y-3
    text-md leading-[var(--line-height)] text-foreground
  "
    >
      <h2
        id="favorites-heading"
        className="
      text-xl md:text-2xl font-bold tracking-tight
      text-foreground font-display
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
                onRemove={onRemove}
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
