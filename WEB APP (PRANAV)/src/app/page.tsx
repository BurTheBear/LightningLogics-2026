import Link from "next/link";
import { ArrowRight, ArrowUpRight, Camera, MessagesSquare, Bot, Hand, ClipboardList } from "lucide-react";
import { SmoothScroll } from "@/components/smooth-scroll";
import { EnterOnLoad } from "@/components/enter";
import { DeviceHero } from "@/components/landing/device-hero";
import { DeviceStage } from "@/components/device/device-stage";
import { ProductFrame } from "@/components/landing/product-frame";
import { SafetyMoment } from "@/components/landing/safety-moment";
import { PhotoSlot } from "@/components/photo-slot";
import { VideoSlot } from "@/components/video-slot";
import { Logo } from "@/components/brand/logo";

const card = "relative overflow-hidden rounded-[28px]";
const inner = "mx-auto w-full max-w-[1200px] px-6 md:px-10";
const h2 = "text-balance font-semibold leading-[0.98] tracking-[-0.05em]";

const parts = [
  { name: "Camera dome", body: "AI vision watches the line for flame, smoke and anything wet on the floor." },
  { name: "Fire-blanket arm", body: "Lays a fire blanket over a small pan fire. No water, because water spreads grease fires." },
  { name: "Sensor band", body: "Heat and smoke sensors all the way round, with a light strip that shows what Pyro is doing." },
  { name: "Mop pad", body: "Wipes up oil and water the moment a spill is spotted, then drives back to its dock." },
  { name: "Emergency stop", body: "One red button on top stops everything, instantly." },
];

export default function Home() {
  return (
    <SmoothScroll>
      <EnterOnLoad />
      <div className="flex flex-col gap-2 bg-[#1c1b19] p-2 md:gap-3 md:p-3">
        <DeviceHero />

        {/* Demo video */}
        <section id="demo" className={`${card} bg-[#0f1115] text-white`}>
          <div className={`${inner} grid gap-10 py-20 md:py-28 lg:grid-cols-[0.8fr_1.4fr] lg:items-center`}>
            <div>
              <h2 className={`${h2} text-[clamp(2.2rem,4.4vw,3.8rem)]`}>See Pyro put out a pan fire.</h2>
              <p className="mt-5 max-w-[42ch] text-[17px] leading-[1.6] text-white/70">
                Our working prototype spots the flame, waits for a chef to tap confirm, then lays its fire blanket over the
                pan and mops up after.
              </p>
            </div>
            <VideoSlot file="pyro-demo.mp4" label="Prototype demo video" className="aspect-video rounded-2xl ring-1 ring-white/10" />
          </div>
        </section>

        {/* Anatomy */}
        <section id="anatomy" className={`${card} bg-paper`}>
          <div className={`${inner} grid gap-10 py-20 md:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center`}>
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_50%_70%,#ffffff_0%,#ece8e1_55%,#ddd7cd_100%)]">
              <DeviceStage view="anatomy" className="absolute inset-0" />
            </div>
            <div>
              <h2 className={`${h2} text-[clamp(2.2rem,4.4vw,3.8rem)]`}>Small enough to fit under the pass.</h2>
              <dl className="mt-10 divide-y divide-line border-y border-line">
                {parts.map((p) => (
                  <div key={p.name} className="grid gap-1 py-4 sm:grid-cols-[170px_1fr] sm:gap-6">
                    <dt className="text-[15px] font-semibold text-ink">{p.name}</dt>
                    <dd className="text-[15px] leading-[1.55] text-ink-2">{p.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className={`${card} isolate flex min-h-[90svh] items-end`}>
          <PhotoSlot
            file="spill-floor.png"
            alt="Cooking oil spreading across a kitchen's tile floor next to a dropped pan"
            className="absolute inset-0 -z-10"
            sizes="100vw"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0b0a09]/90 via-[#0b0a09]/40 to-transparent" />
          <div className={`${inner} pb-16 pt-40`}>
            <h2 className={`${h2} max-w-[15ch] text-[clamp(2.4rem,5vw,4.6rem)] text-white`}>A busy line has no time to watch the floor.</h2>
            <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.6] text-white/80">
              Oil, water and grease hit the tiles every service. Slips and burns are among the most common injuries in
              restaurant kitchens, and one flare-up can close a room for the night. A small team can&apos;t spare someone
              to stand and watch.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className={`${card} bg-surface`}>
          <div className={`${inner} flex flex-col gap-14 py-20 md:py-28`}>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
              <h2 className={`${h2} max-w-[12ch] text-[clamp(2.2rem,4.4vw,3.8rem)]`}>See it, check it, handle it.</h2>
              <p className="max-w-[50ch] text-[17px] leading-[1.6] text-ink-2 lg:justify-self-end">
                A camera spots trouble, the assistant decides what to do and asks a person when it matters, and the robot
                drives over to deal with it.
              </p>
            </div>
            <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
              {[
                { icon: Camera, title: "Camera and AI vision", body: "Watches each station and flags fire, smoke or a spill, with where it is and how sure it is." },
                { icon: MessagesSquare, title: "Pyro assistant", body: "Spills get mopped straight away. Fire waits for a supervisor or chef to tap confirm." },
                { icon: Bot, title: "The robot", body: "Drives to the spot, lays a fire blanket with its arm or mops, then reports back and docks." },
              ].map((s, i) => (
                <li key={s.title} className="relative bg-surface p-7">
                  <s.icon className="size-6 text-ink" strokeWidth={1.5} />
                  <h3 className="mt-10 text-[18px] font-semibold tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-ink-2">{s.body}</p>
                  {i < 2 && (
                    <span aria-hidden className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 overflow-hidden md:block">
                      <span className="lane-pulse-x absolute top-0 block h-px w-16 bg-gradient-to-r from-transparent via-ember to-transparent" style={{ animationDelay: `${i * 1.6}s` }} />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Assistant */}
        <section id="assistant" className={`${card} bg-[#efece6]`}>
          <div className={`${inner} flex flex-col gap-12 py-20 md:py-28`}>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className={`${h2} max-w-[14ch] text-[clamp(2.2rem,4.4vw,3.8rem)]`}>Ask Pyro what happened tonight.</h2>
              <Link href="/dashboard" className="press inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-3 text-[15px] font-medium text-white hover:bg-[#2c2925]">
                Open the dashboard <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <ProductFrame />
          </div>
        </section>

        {/* Roles */}
        <section id="roles" className={`${card} bg-paper`}>
          <div className={`${inner} grid gap-12 py-20 md:py-28 lg:grid-cols-2 lg:items-center`}>
            <PhotoSlot
              file="supervisor-chef.png"
              alt="A kitchen supervisor and a line chef checking a tablet together at the pass"
              className="aspect-[4/4.4] rounded-3xl"
            />
            <div>
              <h2 className={`${h2} max-w-[14ch] text-[clamp(2.2rem,4.4vw,3.8rem)]`}>Built for the supervisor and the line.</h2>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-2 text-[16px] font-semibold"><ClipboardList className="size-4 text-ember" /> Supervisor</h3>
                  <ul className="mt-3 space-y-2.5 text-[15px] leading-[1.5] text-ink-2">
                    <li>Draw zones and set patrol schedules</li>
                    <li>Choose who confirms the fire blanket</li>
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
          </div>
        </section>

        {/* Safety moment */}
        <section id="safety" className={`${card} bg-[#07090d]`}>
          <div className={`${inner} flex min-h-[90svh] flex-col justify-center gap-14 py-28`}>
            <SafetyMoment text="Pyro never drops its fire blanket on its own. A person always confirms, and a big red button on the robot stops it cold." />
            <div className="grid gap-8 border-t border-white/10 pt-10 text-[15px] leading-[1.6] text-white/65 sm:grid-cols-3">
              <p><span className="font-medium text-white">Small flare-ups only.</span> Pyro handles the first seconds of a small pan fire. It works alongside your extinguishers and hood system and never replaces them.</p>
              <p><span className="font-medium text-white">Every event logged.</span> Who confirmed, what Pyro saw, how sure it was, and what it did, ready for your health inspector.</p>
              <p><span className="font-medium text-white">Stays out of the way.</span> It patrols the aisles, parks at its dock, and pauses whenever a chef asks.</p>
            </div>
          </div>
        </section>

        {/* Closing CTA + footer */}
        <section className={`${card} bg-surface`}>
          <div className={`${inner} flex flex-col gap-10 py-20 md:flex-row md:items-end md:justify-between md:py-28`}>
            <div>
              <h2 className={`${h2} max-w-[13ch] text-[clamp(2.6rem,5.5vw,5rem)]`}>Put Pyro on your kitchen floor.</h2>
              <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.6] text-ink-2">
                We set up the robot, map your stations with you, and train your team in one afternoon.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/sign-up" className="press inline-flex items-center gap-2 bg-ember px-6 py-3.5 text-[15px] font-medium uppercase tracking-[0.02em] text-white hover:bg-[#a9380a]">
                Reserve a pilot unit <ArrowRight className="size-4" />
              </Link>
              <Link href="/dashboard" className="press inline-flex items-center border border-line px-6 py-3.5 text-[15px] font-medium uppercase tracking-[0.02em] text-ink hover:border-[#cfc6ba]">
                Live dashboard
              </Link>
            </div>
          </div>
          <footer className={`${inner} flex flex-col gap-4 border-t border-line py-8 text-[13px] text-ink-2 md:flex-row md:items-center md:justify-between`}>
            <Logo />
            <p>Built by LightningLogics for the Gaicom AI Hackathon 2026.</p>
            <p>Robot shown is a 3D model of our prototype. Photographs are AI-generated stand-ins.</p>
          </footer>
        </section>
      </div>
    </SmoothScroll>
  );
}
