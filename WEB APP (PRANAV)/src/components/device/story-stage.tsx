"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const PyroScene = dynamic(() => import("./pyro-scene"), { ssr: false });

const steps = [
  { at: 0, title: "Patrols the aisles", body: "Pyro drives the kitchen floor between stations, camera on." },
  { at: 0.22, title: "Spots a pan fire", body: "AI vision flags flame at the grill and sends an alert to that station." },
  { at: 0.4, title: "Waits for a person", body: "Nothing happens until a chef or supervisor taps confirm." },
  { at: 0.56, title: "Lays the fire blanket", body: "The arm swings out and drops the blanket over the pan, cutting off the air." },
  { at: 0.8, title: "Backs off and reports", body: "The fire is out. Pyro logs what happened and returns to patrol." },
];

/**
 * Scroll story: the section is tall, the robot stays pinned on screen,
 * and scrolling plays the whole fire response.
 */
export function StoryStage() {
  const section = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setMounted(true), { rootMargin: "300px" });
    io.observe(el);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (s) => {
        progress.current = s.progress;
        let i = 0;
        steps.forEach((x, n) => s.progress >= x.at && (i = n));
        setStep(i);
        setConfirmed(s.progress >= 0.5);
      },
    });
    return () => {
      io.disconnect();
      st.kill();
    };
  }, []);

  return (
    <section ref={section} aria-label="How Pyro handles a pan fire" className="relative h-[460vh]">
      <div className="sticky top-2 h-[calc(100svh-1rem)] overflow-hidden rounded-[28px] bg-[radial-gradient(ellipse_at_55%_75%,#ffffff_0%,#ece8e1_50%,#d9d2c7_100%)] md:top-3 md:h-[calc(100svh-1.5rem)]">
        {mounted && <PyroScene progress={progress} view="story" className="!absolute inset-0" />}

        {/* Step captions */}
        <div className="pointer-events-none absolute left-6 top-8 max-w-[420px] md:left-10 md:top-12">
          <ol className="relative">
            {steps.map((s, i) => (
              <li
                key={s.title}
                aria-hidden={i !== step}
                className={cn(
                  "absolute left-0 top-0 transition-[opacity,transform,filter] duration-500 ease-[var(--ease-out-quint)]",
                  i === step ? "opacity-100 blur-0" : "translate-y-3 opacity-0 blur-[4px]",
                  i === 0 && "relative",
                )}
              >
                <h2 className="text-balance text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-ink">{s.title}</h2>
                <p className="mt-3 max-w-[34ch] text-[16px] leading-[1.55] text-ink-2">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Progress rail */}
        <div className="absolute bottom-8 left-6 flex gap-1.5 md:left-10">
          {steps.map((s, i) => (
            <span key={s.title} className={cn("h-1 rounded-full transition-all duration-500", i <= step ? "w-8 bg-ink" : "w-4 bg-ink/20")} />
          ))}
        </div>

        {/* The chef's confirm card */}
        <div
          className={cn(
            "absolute bottom-8 right-6 w-[260px] rounded-2xl border border-line bg-surface p-4 shadow-[0_20px_40px_-20px_rgba(27,25,22,0.35)] transition-[opacity,transform] duration-500 ease-[var(--ease-out-quint)] md:right-10",
            step >= 1 && step <= 3 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <p className="flex items-center gap-2 text-[12px] font-medium text-alert">
            <span className="size-2 rounded-full bg-alert" /> Grill · fire detected · 97%
          </p>
          <p className="mt-1.5 text-[14px] text-ink">Lay the fire blanket over the pan?</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[13px] font-medium">
            <span className="rounded-lg border border-line py-1.5 text-center text-ink-2">Dismiss</span>
            <span className={cn("rounded-lg py-1.5 text-center text-white transition-colors", confirmed ? "bg-ok" : "bg-ink")}>
              {confirmed ? "Confirmed" : "Confirm"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
