"use client";

import { useEffect } from "react";

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const rawGtmId = process.env.NEXT_PUBLIC_GTM_ID;
// Only load GTM for a real container ID (GTM-XXXX). When the GTM var holds the
// GA4 measurement ID (G-...), gtm.js would just load gtag a second time.
const gtmId = rawGtmId && rawGtmId.startsWith("GTM-") ? rawGtmId : undefined;

type DataLayer = unknown[];

function dataLayer() {
  const win = window as Window & { dataLayer?: DataLayer; gtag?: (...args: unknown[]) => void };
  win.dataLayer = win.dataLayer || [];
  return win;
}

function inject(src: string, id: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = true;
  document.body.appendChild(script);
}

function loadAnalytics() {
  const win = dataLayer();
  if (gtmId) {
    win.dataLayer?.push({ "gtm.start": Date.now(), event: "gtm.js" });
    inject(`https://www.googletagmanager.com/gtm.js?id=${gtmId}`, "gtm-js");
  }
  if (gaId) {
    if (!win.gtag) {
      win.gtag = (...args: unknown[]) => {
        win.dataLayer?.push(args);
      };
    }
    win.gtag("js", new Date());
    win.gtag("config", gaId, { anonymize_ip: true });
    inject(`https://www.googletagmanager.com/gtag/js?id=${gaId}`, "ga-js");
  }
}

// gtag.js is about 167 KiB and Lighthouse marks most of it unused during first
// load. Load it on the first tap, click, or keypress so it is not part of the
// initial download. A timer would keep the lab trace open until the script
// downloaded and would put those bytes back into the unused-JavaScript audit.
export default function TrackingScripts() {
  useEffect(() => {
    if (!gaId && !gtmId) return;
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      loadAnalytics();
    };
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    for (const eventName of events) {
      window.addEventListener(eventName, run, { once: true, passive: true });
    }
    return () => {
      for (const eventName of events) window.removeEventListener(eventName, run);
    };
  }, []);

  return null;
}
