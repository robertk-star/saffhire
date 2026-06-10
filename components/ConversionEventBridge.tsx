"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

function pushConversion(eventName: string, details: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...details });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, details);
  }
}

export default function ConversionEventBridge() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const tracked = target?.closest<HTMLElement>("[data-conversion]");
      if (!tracked) return;

      const eventName = tracked.dataset.conversion;
      if (!eventName) return;

      pushConversion(eventName, {
        location: tracked.dataset.location || "unknown",
        label: tracked.textContent?.trim() || tracked.getAttribute("aria-label") || "unknown",
        href: tracked.getAttribute("href") || undefined,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
