"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Search, Loader2, Clock, XCircle, Star } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useSearchHistory } from "@/hooks/use-search-history";
import { useFavorites } from "@/hooks/use-favorites";

export function CitySearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const { data: locations, isLoading } = useLocationSearch(query);
  const { favorites } = useFavorites();
  const { history, clearHistory, addToHistory } = useSearchHistory();

  // Press "/" to open the search
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleSelect = (raw: string) => {
    // raw = "lat|lon|name|country"
    const [latStr, lonStr, name, country] = raw.split("|");
    const lat = parseFloat(latStr);
    const lon = parseFloat(lonStr);

    if (!Number.isFinite(lat) || !Number.isFinite(lon) || !name) {
      console.error("Invalid selection payload:", raw);
      return;
    }

    addToHistory.mutate({ query, name, lat, lon, country });

    setOpen(false);
    setQuery("");

    const cityParam = encodeURIComponent(name);
    router.push(`/weather-dashboard?lat=${lat}&lon=${lon}&city=${cityParam}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 rounded-full"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Search className="mr-2 h-4 w-4" aria-hidden="true" />
        Search cities...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder="Search cities..."
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            {query.length > 2 && !isLoading && (
              <CommandEmpty role="status">No cities found.</CommandEmpty>
            )}
            <CommandSeparator/>

            {favorites.length > 0 && (
              <CommandGroup heading="Favorites">
                {favorites.map((city) => (
                  <CommandItem
                    key={city.id}
                    value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
                    onSelect={handleSelect}
                    className="text-current group"
                  >
                    <Star
                      className="mr-2 h-4 w-4 text-secondary group-data-[selected=true]:text-current"
                      aria-hidden="true"
                    />
                    <span className="flex-1 text-sm">
                      {city.name}
                      {city.state ? `, ${city.state}` : ""}
                      {`, ${city.country}`}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* Search History */}
            {history.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <div className="my-2 flex items-center justify-between px-2">
                    <p className="text-xs text-muted-foreground">
                      Recent Searches
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearHistory.mutate()}
                      aria-label="Clear recent searches"
                      className="
                        text-destructive
      hover:bg-destructive hover:text-destructive-foreground
      dark:hover:bg-destructive dark:hover:text-destructive-foreground rounded-full
                      "
                    >
                      <XCircle
                        className="h-4 w-4 text-current"
                        aria-hidden="true"
                      />
                      Clear
                    </Button>
                  </div>

                  {history.map((item) => (
                    <CommandItem
                      key={`history-${item.id}`}
                      value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                      onSelect={handleSelect}
                      className="text-current"
                    >
                      <Clock
                        className="mr-2 h-4 w-4 text-current"
                        aria-hidden="true"
                      />
                      <span className="flex-1 text-sm">
                        {item.name}
                        {item.state ? `, ${item.state}` : ""}
                        {`, ${item.country}`}
                      </span>
                      <span className="ml-auto whitespace-nowrap text-xs">
                        {format(item.searchedAt, "MMM d, h:mm a")}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            {/* Search Results */}
            <CommandSeparator />
            {locations && locations.length > 0 && (
              <CommandGroup heading="Suggestions">
                {isLoading && (
                  <div
                    className="flex items-center justify-center p-4"
                    role="status"
                    aria-live="polite"
                  >
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  </div>
                )}

                {locations.map((location) => (
                  <CommandItem
                    key={`suggestion-${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                    className="text-current group"
                  >
                    <Search
                      className="mr-2 h-4 w-4 text-primary group-data-[selected=true]:text-current"
                      aria-hidden="true"
                    />
                    <span className="flex-1 text-sm">
                      {location.name}
                      {location.state ? `, ${location.state}` : ""}
                      {`, ${location.country}`}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

export default CitySearch;
