"use client";

import dynamic from "next/dynamic";

const WorldFavoritesMapInner = dynamic(
  () => import("./world-favorites-map-inner"),
  { ssr: false }
);

export default function WorldFavoritesMap() {
  return <WorldFavoritesMapInner />;
}
