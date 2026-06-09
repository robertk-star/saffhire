/*
 * Google Maps helper component retained from the original Manus site.
 * Converted for Next.js by replacing Vite import.meta.env usage with NEXT_PUBLIC env access.
 */

/// <reference types="@types/google.maps" />

import { useEffect, useRef } from "react";
import { usePersistFn } from "@/hooks/usePersistFn";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    google?: typeof google;
  }
}

const API_KEY = process.env.NEXT_PUBLIC_FORGE_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
const FORGE_BASE_URL = process.env.NEXT_PUBLIC_FORGE_API_URL || "https://forge.butterfly-effect.dev";
const MAPS_PROXY_URL = `${FORGE_BASE_URL}/v1/maps/proxy`;

type MapProps = {
  className?: string;
  center?: google.maps.LatLngLiteral;
  zoom?: number;
};

function loadMapScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return resolve(null);
    if (window.google?.maps) return resolve(null);
    if (!API_KEY) return resolve(null);

    const script = document.createElement("script");
    script.src = `${MAPS_PROXY_URL}/maps/api/js?key=${API_KEY}&v=weekly&libraries=marker,places,geocoding,geometry`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => {
      resolve(null);
      script.remove();
    };
    script.onerror = () => reject(new Error("Could not load Google Maps."));
    document.head.appendChild(script);
  });
}

export default function Map({ className, center = { lat: 33.1507, lng: -96.8236 }, zoom = 11 }: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const initializeMap = usePersistFn(async () => {
    if (!mapRef.current) return;
    await loadMapScript();
    if (!window.google?.maps) return;
    new window.google.maps.Map(mapRef.current, { center, zoom, mapId: "saffhire-map" });
  });

  useEffect(() => {
    void initializeMap();
  }, [initializeMap]);

  return <div ref={mapRef} className={cn("min-h-[320px] w-full rounded-lg bg-slate-100", className)} />;
}
