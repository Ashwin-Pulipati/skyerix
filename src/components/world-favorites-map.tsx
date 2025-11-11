"use client";

import dynamic from "next/dynamic";

const WorldFavoritesMapInner = dynamic(
  () => import("./favorites/world-favorites-map-inner"),
  { ssr: false }
);

export default function WorldFavoritesMap() {
  return <WorldFavoritesMapInner />;
}
