import Link from "next/link";
import { Flame, Droplets, Eye, Hand } from "lucide-react";
import { DeviceStage } from "@/components/device/device-stage";
import { Logo } from "@/components/brand/logo";

const tags = [
  { icon: Flame, label: "Fire-blanket arm" },
  { icon: Droplets, label: "Spill mop" },
  { icon: Eye, label: "AI vision" },
  { icon: Hand, label: "Human confirm" },
];

/** Product hero: the robot at the center, lit on a horizon, name set huge behind it. */
export function DeviceHero() {
  return (
    <section className="relative isolate h-[min(100svh-1rem,980px)] min-h-[640px] overflow-hidden rounded-[28px] bg-[#07090d] text-white">
      {/* Horizon: a lit floor rising from the bottom */}
      <div
        aria-hidden
        className="absolute inset-x-[-30%] bottom-[-62%] -z-10 h-[110%] rounded-[50%] bg-[#e9e7e2]"
        style={{ boxShadow: "0 -40px 120px 30px rgba(140,170,220,0.35), 0 -8px 30px rgba(255,255,255,0.5)" }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.18] mix-blend-overlay" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0 1px, transparent 1px 3px)" }} />

      {/* Nav */}
      <header className="relative z-20 flex items-center justify-between px-6 pt-5 text-[12px] font-medium uppercase tracking-[0.08em] text-white/80 md:px-8">
        <nav aria-label="Main" className="flex gap-5">
          <a href="#demo" className="hover:text-white">Demo</a>
          <a href="#anatomy" className="hidden hover:text-white md:inline">Inside</a>
          <a href="#safety" className="hidden hover:text-white md:inline">Safety</a>
          <Link href="/dashboard" className="hidden hover:text-white md:inline">Dashboard</Link>
        </nav>
        <Link href="/" aria-label="PyroBot home" className="absolute left-1/2 -translate-x-1/2 normal-case tracking-normal"><Logo tone="light" /></Link>
        <Link href="/sign-up" className="text-[#ff7a3d] hover:text-[#ff9a66]">Reserve</Link>
      </header>

      {/* Name, set huge behind the device */}
      <div aria-hidden data-enter="0" className="pointer-events-none absolute inset-x-0 top-[13%] z-0 flex justify-between px-[6%] font-sans text-[clamp(4.5rem,15vw,13rem)] font-extralight leading-none text-[#dbe4f2]">
        {"PYRO".split("").map((c, i) => (
          <span key={i} style={{ textShadow: "0 0 40px rgba(170,200,255,0.25)" }}>{c}</span>
        ))}
      </div>

      {/* Device */}
      <DeviceStage view="hero" className="absolute inset-x-0 bottom-[27%] top-[12%] z-10 md:bottom-[6%] md:top-[10%]" />

      {/* Product line */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-6 px-6 pb-7 text-ink md:flex-row md:items-end md:justify-between md:px-10 md:pb-9">
        <div data-enter="200">
          <h1 className="text-[clamp(2rem,4.2vw,3.6rem)] font-semibold leading-[0.95] tracking-[-0.055em]">The kitchen safety robot</h1>
          <ul className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <li key={t.label} className="flex items-center gap-1.5 border border-[#2f5fd0]/70 px-2.5 py-1.5 text-[11.5px] font-medium uppercase tracking-[0.04em] text-[#2448a8]">
                <t.icon className="size-3.5" strokeWidth={1.8} /> {t.label}
              </li>
            ))}
          </ul>
        </div>
        <div data-enter="300" className="flex items-end gap-5">
          <p className="hidden text-right text-[13px] leading-snug text-ink-2 lg:block">
            Pilot program<br />for independent restaurants
          </p>
          <div className="flex flex-col">
            <span className="border border-b-0 border-ember px-4 py-1 text-center text-[12.5px] font-medium text-ember">Working prototype · Gaicom 2026</span>
            <Link href="/sign-up" className="press bg-ember px-6 py-3.5 text-center text-[clamp(1rem,1.6vw,1.35rem)] font-medium uppercase tracking-[0.02em] text-white hover:bg-[#a9380a]">
              Reserve a pilot unit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
