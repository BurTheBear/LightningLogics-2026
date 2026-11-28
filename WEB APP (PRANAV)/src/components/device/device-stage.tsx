"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PyroView } from "./pyro-scene";

gsap.registerPlugin(ScrollTrigger);

const PyroScene = dynamic(() => import("./pyro-scene"), { ssr: false });

/** Loads the 3D robot only in the browser and turns it as its section scrolls by. */
export function DeviceStage({ view = "hero", className }: { view?: PyroView; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    // Only mount WebGL once the stage is near the screen
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { rootMargin: "200px" });
    io.observe(el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const st = reduce
      ? null
      : ScrollTrigger.create({
          trigger: el,
          start: view === "hero" ? "top top" : "top bottom",
          end: "bottom top",
          onUpdate: (s) => (progress.current = s.progress),
        });
    return () => {
      io.disconnect();
      st?.kill();
    };
  }, [view]);

  return (
    <div ref={wrap} className={className}>
      {visible && <PyroScene progress={progress} view={view} className="!absolute inset-0" />}
    </div>
  );
}
