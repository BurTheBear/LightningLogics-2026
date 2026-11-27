import type { Metadata } from "next";
import { UserPlus } from "lucide-react";
import { PageHeader, StatusPill } from "@/components/dashboard/shell";
import { team } from "@/lib/demo-data";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Team">
        <button className="press inline-flex items-center gap-2 rounded-full bg-ink px-3.5 py-1.5 text-[13.5px] font-medium text-white hover:bg-[#2c2925]">
          <UserPlus className="size-4" /> Invite
        </button>
      </PageHeader>
      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        <ul className="mx-auto max-w-[860px] divide-y divide-line rounded-2xl border border-line">
          {team.map((p) => (
            <li key={p.name} className="flex items-center gap-4 px-5 py-4">
              <span className="grid size-10 place-items-center rounded-full bg-[#ebe6de] text-[13px] font-semibold">
                {p.name.split(" ").map((n) => n[0]).join("")}
              </span>
              <div className="flex-1">
                <p className="text-[15px] font-medium">{p.name}</p>
                <p className="text-[13.5px] text-ink-2">{p.station}</p>
              </div>
              <StatusPill tone={p.role === "Supervisor" ? "warn" : "neutral"}>{p.role}</StatusPill>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-4 max-w-[860px] text-[13px] text-ink-3">Supervisors can change robot settings and confirm any station. Chefs confirm alerts for their own station.</p>
      </div>
    </div>
  );
}
