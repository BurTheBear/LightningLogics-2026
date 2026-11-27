"use client";

import { useEffect } from "react";

/** Reveals every [data-enter] element once, staggered by its data-enter value (ms). */
export function EnterOnLoad() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-enter]"));
    const timers = els.map((el) =>
      window.setTimeout(() => el.classList.add("is-in"), 60 + Number(el.dataset.enter || 0)),
    );
    return () => timers.forEach(clearTimeout);
  }, []);
  return null;
}
