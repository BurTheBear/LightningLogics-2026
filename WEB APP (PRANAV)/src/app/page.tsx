import Link from "next/link";
import { ArrowRight, Camera, MessagesSquare, Bot, Hand, ClipboardList, ShieldCheck } from "lucide-react";
import { SmoothScroll } from "@/components/smooth-scroll";
import { EnterOnLoad } from "@/components/enter";
import { SiteNav } from "@/components/landing/site-nav";
import { ProductFrame } from "@/components/landing/product-frame";
import { SafetyMoment } from "@/components/landing/safety-moment";
import { PhotoSlot } from "@/components/photo-slot";
import { Logo } from "@/components/brand/logo";

const wrap = "mx-auto w-full max-w-[1200px] px-5 md:px-8";

export default function Home() {
  return (
    <SmoothScroll>
      <EnterOnLoad />
      <SiteNav />
      <main id="top">
        {/* Hero */}
        <section className={`${wrap} grid min-h-[calc(100svh-4rem)] items-center gap-12 py-14 lg:grid-cols-[1fr_1.12fr] lg:gap-14 lg:py-10`}>
          <div className="max-w-[560px]">
            <h1
              data-enter="0"
              className="text-balance font-display text-[clamp(2.6rem,5.4vw,4.6rem)] leading-[1.02] tracking-[-0.03em] text-ink"
            >
              The kitchen safety robot for independent restaurants.
            </h1>
            <p data-enter="120" className="mt-6 max-w-[48ch] text-[17px] leading-[1.6] text-ink-2">
              PyroBot patrols your kitchen floor and watches for small fires and spills. It knocks down a flare-up with a short
              burst of water, mops up a spill, and tells your supervisor and chefs what it did.
            </p>
            <div data-enter="220" className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/sign-up"
                className="press inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-[15px] font-medium text-white hover:bg-[#a9380a]"
              >
                Book a demo <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/dashboard"
                className="press inline-flex items-center rounded-full border border-line bg-surface px-5 py-3 text-[15px] font-medium text-ink hover:border-[#d3ccc2]"
              >
                Open the live dashboard
              </Link>
            </div>
            <p data-enter="300" className="mt-8 flex items-center gap-2 text-[14px] text-ink-2">
              <Hand className="size-4 text-ember" />
              Every water burst waits for a person to tap confirm.
            </p>
          </div>
          <div data-enter="160" className="relative">
            <PhotoSlot
              file="robot-kitchen.png"
              alt="The PyroBot robot on the tile floor of a busy restaurant kitchen"
              priority
              className="aspect-[16/10] rounded-2xl"
            />
            <div className="relative -mt-24 ml-auto w-[94%] sm:-mt-32">
              <ProductFrame />
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
          <PhotoSlot
            file="spill-floor.png"
            alt="Cooking oil spreading across a kitchen's tile floor next to a dropped pan"
            className="absolute inset-0 -z-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#14120f]/85 via-[#14120f]/35 to-transparent" />
          <div className={`${wrap} pb-20 pt-40`}>
            <h2 className="max-w-[16ch] text-balance font-display text-[clamp(2.2rem,4.8vw,4.2rem)] leading-[1.04] tracking-[-0.03em] text-white">
              A busy line has no time to watch the floor.
            </h2>
            <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-white/85">
              Oil, water and grease hit the tiles every service. Slips and burns are among the most common injuries in
              restaurant kitchens, and one flare-up can close a room for the night. A small team can&apos;t spare
              someone to stand and watch.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className={`${wrap} flex min-h-[100svh] flex-col justify-center gap-14 py-24`}>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <h2 className="max-w-[14ch] text-balance font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.04] tracking-[-0.03em]">
              See it, check it, handle it.
            </h2>
            <p className="max-w-[50ch] text-[17px] leading-[1.6] text-ink-2 lg:justify-self-end">
              A camera spots trouble, the assistant decides what to do and asks a person when it matters, and the robot
              drives over to deal with it. Three parts, one loop, about as long as it takes to plate a dish.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            <ol className="relative flex flex-col rounded-2xl border border-line bg-surface">
              {[
                { icon: Camera, title: "Camera and AI vision", body: "Watches each station and flags fire, smoke or a spill, with where it is and how sure it is." },
                { icon: MessagesSquare, title: "Pyro assistant", body: "Spills get mopped straight away. Fire waits for a supervisor or chef to tap confirm." },
                { icon: Bot, title: "The robot", body: "Drives to the spot, fires a short burst of water or mops, then reports back and docks." },
              ].map((s, i, arr) => (
                <li key={s.title} className="relative flex gap-5 px-6 py-6 sm:px-8">
                  <div className="relative flex flex-col items-center">
                    <span className="grid size-11 place-items-center rounded-xl border border-line bg-paper text-ink">
                      <s.icon className="size-5" strokeWidth={1.6} />
                    </span>
                    {i < arr.length - 1 && (
                      <span className="relative mt-2 w-px flex-1 overflow-hidden bg-line">
                        <span className="lane-pulse absolute -left-px top-0 block h-8 w-[3px] bg-gradient-to-b from-transparent via-ember to-transparent" style={{ animationDelay: `${i * 1.6}s` }} />
                      </span>
                    )}
                  </div>
                  <div className="pb-2 pt-1.5">
                    <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">{s.title}</h3>
                    <p className="mt-1.5 max-w-[46ch] text-[15px] leading-[1.6] text-ink-2">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <PhotoSlot
              file="robot-detail.png"
              alt="Close-up of PyroBot's water nozzle, camera dome and mop pad on wet tile"
              className="min-h-[340px] rounded-2xl"
            />
          </div>
        </section>

        {/* Assistant */}
        <section id="assistant" className="border-y border-line bg-surface">
          <div className={`${wrap} flex min-h-[100svh] flex-col justify-center gap-12 py-24`}>
            <div className="max-w-[640px]">
              <h2 className="text-balance font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.04] tracking-[-0.03em]">
                Ask Pyro what happened tonight.
              </h2>
              <p className="mt-5 max-w-[54ch] text-[17px] leading-[1.6] text-ink-2">
                The dashboard&apos;s assistant answers in plain words: what happened, where, and what the robot did about it.
                Send Pyro to a station, pause it during a rush, or pull last night&apos;s report.
              </p>
            </div>
            <ProductFrame />
            <Link href="/dashboard" className="press inline-flex w-fit items-center gap-2 text-[15px] font-medium text-ink underline decoration-ember/50 underline-offset-[6px] hover:decoration-ember">
              Try the assistant in the demo dashboard <ArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* Roles */}
        <section id="roles" className={`${wrap} grid min-h-[100svh] items-center gap-12 py-24 lg:grid-cols-[1fr_1fr]`}>
          <PhotoSlot
            file="supervisor-chef.png"
            alt="A kitchen supervisor and a line chef checking a tablet together at the pass"
            className="aspect-[4/5] rounded-2xl lg:aspect-[4/4.6]"
          />
          <div>
            <h2 className="max-w-[15ch] text-balance font-display text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[1.04] tracking-[-0.03em]">
              Built for the supervisor and the line.
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="flex items-center gap-2 text-[16px] font-semibold"><ClipboardList className="size-4 text-ember" /> Supervisor</h3>
                <ul className="mt-3 space-y-2.5 text-[15px] leading-[1.5] text-ink-2">
                  <li>Draw zones and set patrol schedules</li>
                  <li>Choose who confirms a water burst</li>
                  <li>Tune how sensitive each station is</li>
                  <li>Shift reports and the full incident log</li>
                </ul>
              </div>
              <div>
                <h3 className="flex items-center gap-2 text-[16px] font-semibold"><Hand className="size-4 text-ember" /> Chefs</h3>
                <ul className="mt-3 space-y-2.5 text-[15px] leading-[1.5] text-ink-2">
                  <li>Alerts for their own station only</li>
                  <li>One tap to confirm or dismiss</li>
                  <li>Pause Pyro during a rush</li>
                  <li>Ask the robot to clear their floor</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Safety moment */}
        <section id="safety" className="bg-[#171512]">
          <div className={`${wrap} flex min-h-[100svh] flex-col justify-center gap-14 py-28`}>
            <SafetyMoment text="Pyro never fires water on its own. A person always confirms, and a big red button on the robot stops it cold." />
            <div className="grid gap-8 border-t border-white/10 pt-10 text-[15px] leading-[1.6] text-white/70 sm:grid-cols-3">
              <p><span className="font-medium text-white">Small flare-ups only.</span> Pyro handles the first seconds of a small fire. It works alongside your extinguishers and hood system and never replaces them.</p>
              <p><span className="font-medium text-white">Every event logged.</span> Who confirmed, what Pyro saw, how sure it was, and what it did, ready for your health inspector.</p>
              <p><span className="font-medium text-white">Stays out of the way.</span> It patrols the aisles, parks at its dock, and pauses whenever a chef asks.</p>
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className={`${wrap} flex min-h-[70svh] flex-col items-start justify-center gap-8 py-24`}>
          <h2 className="max-w-[18ch] text-balance font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02] tracking-[-0.03em]">
            Put Pyro on your kitchen floor.
          </h2>
          <p className="max-w-[50ch] text-[17px] leading-[1.6] text-ink-2">
            We set up the robot, map your stations with you, and train your team in one afternoon.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/sign-up" className="press inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 text-[15px] font-medium text-white hover:bg-[#a9380a]">
              Book a demo <ArrowRight className="size-4" />
            </Link>
            <Link href="/dashboard" className="press inline-flex items-center rounded-full border border-line bg-surface px-5 py-3 text-[15px] font-medium text-ink hover:border-[#d3ccc2]">
              Open the live dashboard
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className={`${wrap} flex flex-col gap-6 py-10 text-[13px] text-ink-2 md:flex-row md:items-center md:justify-between`}>
          <Logo />
          <p className="flex items-center gap-2"><ShieldCheck className="size-4" /> Built by LightningLogics for the Gaicom AI Hackathon 2026.</p>
          <p>Photographs are AI-generated stand-ins.</p>
        </div>
      </footer>
    </SmoothScroll>
  );
}
