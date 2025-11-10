"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Search, Loader2, Clock, XCircle } from "lucide-react";
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

export function CitySearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const { data: locations, isLoading } = useLocationSearch(query);
  const { history, clearHistory, addToHistory } = useSearchHistory();

  // Nice UX: press "/" to open the search
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

    addToHistory.mutate({
      query,
      name,
      lat,
      lon,
      country,
    });

    setOpen(false);
    setQuery("");

    // Navigate with Next.js router
    const cityParam = encodeURIComponent(name);
    router.push(`/weather-dashboard?lat=${lat}&lon=${lon}&city=${cityParam}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
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
              <CommandEmpty>No cities found.</CommandEmpty>
            )}

            {/* Search History */}
            {history.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <div className="flex items-center justify-between px-2 my-2">
                    <p className="text-xs text-muted-foreground">
                      Recent Searches
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearHistory.mutate()}
                      className="gap-1"
                    >
                      <XCircle className="h-4 w-4" aria-hidden="true" />
                      Clear
                    </Button>
                  </div>

                  {history.map((item) => (
                    <CommandItem
                      key={`history-${item.id}`}
                      value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                      onSelect={handleSelect}
                    >
                      <Clock
                        className="mr-2 h-4 w-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <span>{item.name}</span>
                      {item.state && (
                        <span className="text-sm text-muted-foreground">
                          , {item.state}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        , {item.country}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground">
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
                  <div className="flex items-center justify-center p-4">
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
                  >
                    <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>{location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {location.country}
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
