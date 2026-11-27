"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** The page's dealt moment: the safety promise lights up word by word as you scroll. */
export function SafetyMoment({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".sm-word",
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        },
      );
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className="text-balance font-display text-[clamp(2.1rem,4.6vw,4.4rem)] leading-[1.06] tracking-[-0.025em] text-white">
      {text.split(" ").map((w, i) => (
        <span key={i} className="sm-word">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
