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

    const script = document.createElement("script");
    script.id = widgetScriptId;
    script.src = widgetSrc;
    script.setAttribute("data-site-id", "saffhire");
    script.async = true;

    document.body.appendChild(script);
  }, [hidden]);

  return null;
}
