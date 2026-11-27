import { ArrowUp, Plus, CircleCheck, Droplets, Flame } from "lucide-react";
import { KitchenMap } from "@/components/kitchen-map";
import { LogoMark } from "@/components/brand/logo";

/** The dashboard, as live HTML, shown on the landing page. */
export function ProductFrame() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_60px_-30px_rgba(27,25,22,0.35),0_2px_6px_rgba(27,25,22,0.05)]">
      <div className="flex items-center gap-2 border-b border-line bg-[#faf9f7] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#e2ddd5]" />
        <span className="size-2.5 rounded-full bg-[#e2ddd5]" />
        <span className="size-2.5 rounded-full bg-[#e2ddd5]" />
        <span className="ml-3 font-mono text-[11px] text-ink-3">app.pyrobot.example/dashboard</span>
      </div>
      <div className="grid gap-0 md:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col gap-3 border-b border-line p-5 md:border-b-0 md:border-r">
          <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-[#f1eee9] px-3.5 py-2.5 text-[13.5px] text-ink">
            Anything on the floor right now?
          </div>
          <div className="flex gap-2.5">
            <LogoMark className="mt-0.5 size-6 shrink-0" />
            <div className="space-y-2.5 text-[13.5px] leading-relaxed text-ink">
              <p>One thing tonight. Oil hit the floor by the fryers at 7:42 pm. I mopped it in one pass and the tiles read dry now.</p>
              <ul className="space-y-1.5 text-[13px]">
                <li className="flex items-center gap-2"><Droplets className="size-3.5 text-ink-2" /> Fryers — spill cleared</li>
                <li className="flex items-center gap-2"><Flame className="size-3.5 text-warn" /> Grill — watching smoke, normal</li>
                <li className="flex items-center gap-2"><CircleCheck className="size-3.5 text-ok" /> Four other stations clear</li>
              </ul>
            </div>
          </div>
          <div className="mt-auto flex items-center gap-2 rounded-xl border border-line px-3 py-2">
            <Plus className="size-4 text-ink-3" />
            <span className="flex-1 text-[13px] text-ink-3">Ask Pyro anything…</span>
            <span className="grid size-6 place-items-center rounded-full bg-ink text-white"><ArrowUp className="size-3.5" /></span>
          </div>
        </div>
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[13px] font-medium text-ink">Kitchen</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ok-soft px-2 py-0.5 text-[11.5px] font-medium text-ok">
              <span className="size-1.5 rounded-full bg-ok" /> Patrolling · 82%
            </span>
          </div>
          <KitchenMap compact />
        </div>
      </div>
    </div>
  );
}
