"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const widgetScriptId = "chatarai-widget-script";
const widgetSrc = "https://chatarai.com/widget.js?v=chatarai-canonical-20260610a";

export default function ChataraiWidget() {
  const pathname = usePathname();
  const hidden = pathname?.startsWith('/admin') || pathname?.startsWith('/driver-pipeline');

  useEffect(() => {
    if (hidden) return;
    const existingScript = document.getElementById(widgetScriptId);
    if (existingScript) return;

    // Defer the third-party widget until after the page has loaded and the
    // browser is idle, so it never delays the hero (LCP).
    let cancelled = false;
    let idleId: number | undefined;
    const inject = () => {
      if (cancelled || document.getElementById(widgetScriptId)) return;
      const script = document.createElement("script");
      script.id = widgetScriptId;
      script.src = widgetSrc;
      script.setAttribute("data-site-id", "saffhire");
      script.async = true;
      document.body.appendChild(script);
    };
    const schedule = () => {
      const w = window as any;
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(inject, { timeout: 4000 });
      else idleId = window.setTimeout(inject, 2000);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      const w = window as any;
      if (idleId !== undefined) (w.cancelIdleCallback ? w.cancelIdleCallback(idleId) : clearTimeout(idleId));
    };
  }, [hidden]);

  return null;
}
