import type { Metadata } from "next";
import { Download } from "lucide-react";
import { PageHeader, StatusPill } from "@/components/dashboard/shell";
import { incidents } from "@/lib/demo-data";

export const metadata: Metadata = { title: "Incidents" };

export default function IncidentsPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Incidents">
        <button className="press inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[13.5px] font-medium hover:bg-black/[0.03]">
          <Download className="size-4" /> Export for inspector
        </button>
      </PageHeader>
      <div className="min-h-0 flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-[1200px] overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[860px] text-left text-[14px]">
            <thead className="bg-[#faf9f7] text-[12.5px] text-ink-2">
              <tr>
                {["ID", "When", "Type", "Station", "What Pyro did", "Confirmed by", "AI confidence", "Status"].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {incidents.map((i) => (
                <tr key={i.id} className="transition-colors hover:bg-[#fbfaf8]">
                  <td className="tabular px-4 py-3.5 font-mono text-[12.5px] text-ink-2">{i.id}</td>
                  <td className="tabular whitespace-nowrap px-4 py-3.5">{i.day}, {i.time}</td>
                  <td className="px-4 py-3.5 font-medium">{i.kind}</td>
                  <td className="px-4 py-3.5">{i.zone}</td>
                  <td className="px-4 py-3.5 text-ink-2">{i.action}</td>
                  <td className="px-4 py-3.5">{i.confirmedBy}</td>
                  <td className="tabular px-4 py-3.5">{Math.round(i.confidence * 100)}%</td>
                  <td className="px-4 py-3.5">
                    <StatusPill tone={i.status === "Resolved" ? "ok" : i.status === "Watching" ? "warn" : "neutral"}>{i.status}</StatusPill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mx-auto mt-4 max-w-[1200px] text-[13px] text-ink-3">Sample data. Real incidents will come from the robot and AI vision once they&apos;re connected.</p>
      </div>
    </div>
  );
}
