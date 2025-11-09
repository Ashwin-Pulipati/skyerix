"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Search, Loader2, Clock, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { useSearchHistory } from "@/hooks/use-search-history";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";


export function CitySearchComponent() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(searchRef, () => setOpen(false));

  const { data: locations, isLoading } = useLocationSearch(query);
  const { history, clearHistory, addToHistory } = useSearchHistory();

  const handleSelect = (cityData: string) => {
    const [ lat, lon, name, country] = cityData.split("|");

    // Add to search history
    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    setQuery(""); // Clear query after selection
    router.push(`/weather-dashboard?lat=${lat}&lon=${lon}&city=${name}`);
  };

  return (
    <div className="relative flex items-center w-full max-w-lg" ref={searchRef}>
      <Command
        role="combobox"
        aria-expanded={open}
        aria-label="Search for a city"
        className="
        rounded-l-md rounded-r-none border border-border
        transition
        hover:border-ring
        focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-0
        focus-within:border-primary
      "
      >
        <CommandInput
          placeholder="Search cities..."
          value={query}
          onValueChange={setQuery}
          onFocus={() => setOpen(true)}
        />

        {open && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md bg-background shadow-lg">
            <CommandList>
              {query.length > 2 && !isLoading && (
                <CommandEmpty role="status">No cities found.</CommandEmpty>
              )}

              {/* Search History Section */}
              {history.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <div className="flex items-center justify-between px-2 py-1.5">
                      <p className="text-sm font-medium text-muted-foreground px-2">
                        Recent Searches
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => clearHistory.mutate()}
                        className="!bg-transparent !text-destructive hover:!bg-destructive hover:!text-primary-foreground"
                      >
                        <XCircle className="mr-1 h-4 w-4" aria-hidden="true" />
                        Clear
                      </Button>
                    </div>
                    {history.map((item) => (
                      <CommandItem
                        key={`history-${item.id}`}
                        value={`history|${item.lat}|${item.lon}|${item.name}|${item.country}`}
                        onSelect={handleSelect}
                      >
                        <Clock
                          className="mr-2 h-4 w-4 text-current"
                          aria-hidden="true"
                        />

                        <span className="text-sm">
                          {item.name}
                          {item.state ? `, ${item.state}` : ""}
                          {`, ${item.country}`}
                        </span>

                        <span className="ml-auto text-xs ">
                          {format(item.searchedAt, "MMM d, h:mm a")}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}

              {/* Search Results */}
              {locations && locations.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup heading="Suggestions">
                    {isLoading && (
                      <div
                        className="flex items-center justify-center p-4"
                        aria-live="polite"
                        role="status"
                      >
                        <Loader2
                          className="h-4 w-4 animate-spin text-current"
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    {locations.map((location) => (
                      <CommandItem
                        key={`suggestion-${location.lat}-${location.lon}`}
                        value={`suggestion|${location.lat}|${location.lon}|${location.name}|${location.country}`}
                        onSelect={handleSelect}
                      >
                        <Search
                          className="mr-2 h-4 w-4 text-current"
                          aria-hidden="true"
                        />
                        <span className="text-sm">
                          {location.name}
                          {location.state ? `, ${location.state}` : ""}
                          {`, ${location.country}`}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </div>
        )}
      </Command>
      <Button variant="default" className="rounded-l-none rounded-r-md">
        Search
      </Button>
    </div>
  );
}
