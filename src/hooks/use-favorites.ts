"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocalStorage } from "./use-local-storage";

export interface FavoriteCity {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteCity[]>(
    "favorites",
    []
  );
  const qc = useQueryClient();

  useEffect(() => {
    qc.setQueryData(["favorites"], favorites);
  }, [favorites, qc]);

  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity, 
  });

  const addFavorite = useMutation({
    mutationFn: async (city: Omit<FavoriteCity, "id" | "addedAt">) => {
      const newFav: FavoriteCity = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };
      setFavorites((prev) =>
        prev.some((f) => f.id === newFav.id) ? prev : [...prev, newFav]
      );
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      setFavorites((prev) => prev.filter((c) => c.id !== cityId));
    },
  });

  return {
    favorites: favoritesQuery.data ?? [],
    addFavorite,
    removeFavorite,
    isFavorite: (lat: number, lon: number) =>
      (favoritesQuery.data ?? []).some((c) => c.lat === lat && c.lon === lon),
  };
}
