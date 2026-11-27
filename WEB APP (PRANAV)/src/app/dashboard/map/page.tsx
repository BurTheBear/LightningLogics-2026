import type { Metadata } from "next";
import { PageHeader, StatusPill } from "@/components/dashboard/shell";
import { KitchenMap } from "@/components/kitchen-map";
import { robot } from "@/lib/demo-data";

export const metadata: Metadata = { title: "Kitchen map" };

export default function MapPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Kitchen map">
        <StatusPill tone="ok">{robot.state} · {robot.battery}%</StatusPill>
      </PageHeader>
      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-[1100px]">
          <KitchenMap />
          <div className="mt-5 flex flex-wrap gap-5 text-[13.5px] text-ink-2">
            <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-ok" /> Clear</span>
            <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-warn" /> Watching</span>
            <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-alert" /> Alert</span>
            <span className="flex items-center gap-2"><span className="h-0 w-5 border-t border-dashed border-ember" /> Tonight&apos;s route</span>
            <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-ink" /> Pyro</span>
          </div>
        </div>
      </div>
    </div>
  );
}
