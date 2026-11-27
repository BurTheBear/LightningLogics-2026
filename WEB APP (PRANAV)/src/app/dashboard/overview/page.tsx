import type { Metadata } from "next";
import Link from "next/link";
import { BatteryMedium, Droplet, Layers, MapPin, ArrowRight } from "lucide-react";
import { PageHeader, StatusPill } from "@/components/dashboard/shell";
import { KitchenMap } from "@/components/kitchen-map";
import { robot, zones, incidents } from "@/lib/demo-data";

export const metadata: Metadata = { title: "Overview" };

export default function OverviewPage() {
  const recent = incidents.filter((i) => i.day === "Today");
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Overview">
        <StatusPill tone="ok">{robot.name} is {robot.state.toLowerCase()}</StatusPill>
      </PageHeader>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto grid max-w-[1200px] gap-6 p-6 xl:grid-cols-[1.6fr_1fr]">
          <section aria-labelledby="floor" className="rounded-2xl border border-line p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="floor" className="text-[16px] font-semibold">Kitchen floor</h2>
              <Link href="/dashboard/map" className="inline-flex items-center gap-1 text-[13.5px] font-medium text-ink-2 hover:text-ink">
                Open map <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <KitchenMap />
          </section>

          <section aria-labelledby="robot" className="rounded-2xl border border-line p-5">
            <h2 id="robot" className="text-[16px] font-semibold">{robot.model}</h2>
            <p className="mt-1 text-[14px] text-ink-2">Last seen {robot.lastSeen} in the center aisle</p>
            <dl className="mt-5 divide-y divide-line text-[14.5px]">
              {[
                { icon: BatteryMedium, label: "Battery", value: `${robot.battery}%`, bar: robot.battery },
                { icon: Droplet, label: "Water tank", value: `${robot.water}%`, bar: robot.water },
                { icon: Layers, label: "Mop pad", value: robot.mopPad },
                { icon: MapPin, label: "Position", value: "Center aisle" },
              ].map((r) => (
                <div key={r.label} className="py-3">
                  <div className="flex items-center justify-between">
                    <dt className="flex items-center gap-2.5 text-ink-2"><r.icon className="size-4" /> {r.label}</dt>
                    <dd className="tabular font-medium text-ink">{r.value}</dd>
                  </div>
                  {r.bar !== undefined && (
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#efebe5]">
                      <div className="h-full rounded-full bg-ink" style={{ width: `${r.bar}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="stations" className="rounded-2xl border border-line p-5">
            <h2 id="stations" className="text-[16px] font-semibold">Stations</h2>
            <ul className="mt-3 divide-y divide-line">
              {zones.map((z) => (
                <li key={z.id} className="flex items-center justify-between gap-4 py-3 text-[14.5px]">
                  <div>
                    <p className="font-medium text-ink">{z.name}</p>
                    <p className="text-[13.5px] text-ink-2">{z.note}</p>
                  </div>
                  <StatusPill tone={z.status === "clear" ? "ok" : z.status === "watch" ? "warn" : "alert"}>
                    {z.status === "clear" ? "Clear" : z.status === "watch" ? "Watching" : "Alert"}
                  </StatusPill>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="tonight" className="rounded-2xl border border-line p-5">
            <div className="flex items-center justify-between">
              <h2 id="tonight" className="text-[16px] font-semibold">Tonight</h2>
              <Link href="/dashboard/incidents" className="inline-flex items-center gap-1 text-[13.5px] font-medium text-ink-2 hover:text-ink">
                All incidents <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <ol className="mt-4 space-y-4 border-l border-line pl-5">
              {recent.map((i) => (
                <li key={i.id} className="relative">
                  <span className={`absolute -left-[25px] top-1.5 size-2 rounded-full ${i.kind === "Fire" ? "bg-alert" : i.kind === "Smoke" ? "bg-warn" : "bg-ink-2"}`} />
                  <p className="tabular text-[12.5px] text-ink-3">{i.time} · {i.zone}</p>
                  <p className="text-[14.5px] font-medium text-ink">{i.kind}: {i.action}</p>
                  <p className="text-[13.5px] text-ink-2">Confirmed by {i.confirmedBy}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
}
