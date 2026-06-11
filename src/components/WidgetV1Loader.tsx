"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    AIManagerConfig?: { token: string };
  }
}

/** Плавающий AI-виджет (v1) — подключается только на главной странице. */
export function WidgetV1Loader() {
  useEffect(() => {
    if (document.getElementById("aim-widget-script")) return;
    window.AIManagerConfig = { token: "avangard-demo" };
    const s = document.createElement("script");
    s.id = "aim-widget-script";
    s.src = "/avangard-clone/widget.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);
  return null;
}
