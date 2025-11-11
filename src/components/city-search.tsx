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
import { useDebounce } from "@/hooks/use-debounce";

export function CitySearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 300);
  const router = useRouter();

  const { data: locations, isLoading } = useLocationSearch(debounced);
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
      {/* Launcher */}
      <Button
        variant="outline"
        className="
      relative w-full md:w-40 lg:w-64
      justify-start rounded-full
      text-md leading-[var(--line-height)] font-sans
      text-muted-foreground
      sm:pr-12
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
    "
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Search className="mr-2 h-4 w-4" aria-hidden="true" />
        Search cities...
      </Button>

      {/* Dialog */}
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
            <CommandSeparator />

            {/* Favorites */}
            {favorites.length > 0 && (
              <CommandGroup heading="Favorites">
                {favorites.map((city) => (
                  <CommandItem
                    key={city.id}
                    value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
                    onSelect={handleSelect}
                    className="
                  group text-current
                  text-sm leading-[var(--line-height)] font-sans
                "
                  >
                    <Star
                      className="
                    mr-2 h-4 w-4 text-secondary
                    group-data-[selected=true]:text-current
                  "
                      aria-hidden="true"
                    />
                    <span className="flex-1 truncate">
                      {city.name}
                      {city.state ? `, ${city.state}` : ""}
                      {`, ${city.country}`}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {/* History */}
            {history.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <div className="my-2 flex items-center justify-between px-2">
                    <p className="text-xs text-muted-foreground font-sans">
                      Recent Searches
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearHistory.mutate()}
                      aria-label="Clear recent searches"
                      className="
                    rounded-full
                    text-destructive
                    hover:bg-destructive hover:text-destructive-foreground dark:hover:bg-destructive
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
                      className="
                    text-current
                    text-sm leading-[var(--line-height)] font-sans
                  "
                    >
                      <Clock
                        className="mr-2 h-4 w-4 text-current"
                        aria-hidden="true"
                      />
                      <span className="flex-1 truncate">
                        {item.name}
                        {item.state ? `, ${item.state}` : ""}
                        {`, ${item.country}`}
                      </span>
                      <span className="ml-auto whitespace-nowrap text-xs text-current">
                        {format(item.searchedAt, "MMM d, h:mm a")}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            {/* Results */}
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
                    className="
                  group text-current
                  text-sm leading-[var(--line-height)] font-sans
                "
                  >
                    <Search
                      className="
                    mr-2 h-4 w-4 text-primary
                    group-data-[selected=true]:text-current
                  "
                      aria-hidden="true"
                    />
                    <span className="flex-1 truncate">
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
