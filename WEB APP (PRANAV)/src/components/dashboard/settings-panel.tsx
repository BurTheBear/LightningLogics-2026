"use client";

import { useState } from "react";
import { Lock, Check, Pause, Play } from "lucide-react";
import { zones, team } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

type Role = "Supervisor" | "Chef";
const levels = ["Low", "Medium", "High"] as const;

export function SettingsPanel() {
  const [role, setRole] = useState<Role>("Supervisor");
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <div className="mx-auto max-w-[860px] p-6">
      <div role="tablist" aria-label="Settings for" className="inline-flex rounded-full border border-line bg-[#f6f4f0] p-1">
        {(["Supervisor", "Chef"] as Role[]).map((r) => (
          <button
            key={r}
            role="tab"
            aria-selected={role === r}
            onClick={() => setRole(r)}
            className={cn(
              "press rounded-full px-4 py-1.5 text-[14px] font-medium transition-colors",
              role === r ? "bg-surface text-ink shadow-[0_1px_2px_rgba(27,25,22,0.1)]" : "text-ink-2 hover:text-ink",
            )}
          >
            {r}
          </button>
        ))}
      </div>
      <p className="mt-3 text-[14px] text-ink-2">
        {role === "Supervisor"
          ? "Supervisors set how Pyro behaves across the whole kitchen."
          : "Chefs control alerts and Pyro's visits for their own station."}
      </p>

      {role === "Supervisor" ? <SupervisorSettings /> : <ChefSettings />}

      <div className="sticky bottom-0 mt-8 flex items-center justify-end gap-3 border-t border-line bg-surface/95 py-4 backdrop-blur">
        <span aria-live="polite" className={cn("flex items-center gap-1.5 text-[13.5px] text-ok transition-opacity", saved ? "opacity-100" : "opacity-0")}>
          <Check className="size-4" /> Saved (demo only, not sent to the robot)
        </span>
        <button onClick={save} className="press rounded-full bg-ink px-5 py-2 text-[14px] font-medium text-white hover:bg-[#2c2925]">
          Save changes
        </button>
      </div>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-[16px] font-semibold">{title}</h2>
      {desc && <p className="mt-1 text-[14px] text-ink-2">{desc}</p>}
      <div className="mt-4 divide-y divide-line rounded-2xl border border-line">{children}</div>
    </section>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[14.5px] font-medium text-ink">{label}</p>
        {hint && <p className="text-[13.5px] text-ink-2">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function Toggle({ defaultOn = false, locked = false, label }: { defaultOn?: boolean; locked?: boolean; label: string }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={locked}
      onClick={() => setOn((v) => !v)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
        on ? "bg-ink" : "bg-[#dcd6cd]",
        locked && "cursor-not-allowed opacity-80",
      )}
    >
      <span
        className={cn(
          "absolute left-0.5 top-0.5 grid size-5 place-items-center rounded-full bg-white shadow transition-transform duration-200 ease-[var(--ease-out-quint)]",
          on && "translate-x-5",
        )}
      >
        {locked && <Lock className="size-2.5 text-ink" />}
      </span>
    </button>
  );
}

function Segmented({ defaultValue, label }: { defaultValue: (typeof levels)[number]; label: string }) {
  const [v, setV] = useState(defaultValue);
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-lg border border-line bg-[#f6f4f0] p-0.5">
      {levels.map((l) => (
        <button
          key={l}
          role="radio"
          aria-checked={v === l}
          onClick={() => setV(l)}
          className={cn(
            "rounded-md px-3 py-1 text-[13px] font-medium transition-colors",
            v === l ? "bg-surface text-ink shadow-[0_1px_2px_rgba(27,25,22,0.1)]" : "text-ink-2 hover:text-ink",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

const selectCls =
  "h-9 rounded-lg border border-line bg-surface px-3 text-[14px] text-ink outline-none focus:border-[#cfc6ba]";

function SupervisorSettings() {
  return (
    <>
      <Section title="Safety" desc="These protect your staff and can't be turned off in the demo.">
        <Row label="A person confirms every water burst" hint="Pyro stops and asks before any water goes out.">
          <Toggle defaultOn locked label="A person confirms every water burst" />
        </Row>
        <Row label="Who can confirm" hint="Anyone listed here gets the confirm button on their phone.">
          <select className={selectCls} defaultValue="station">
            <option value="station">Supervisor + that station&apos;s chef</option>
            <option value="supervisor">Supervisor only</option>
            <option value="anyone">Anyone on shift</option>
          </select>
        </Row>
        <Row label="Mop spills automatically" hint="Spills don't need a confirm. Turn off to approve each one.">
          <Toggle defaultOn label="Mop spills automatically" />
        </Row>
      </Section>

      <Section title="Zones" desc="How sensitive Pyro is at each station. Higher catches more, with more false alarms.">
        {zones.map((z) => (
          <Row key={z.id} label={z.name}>
            <Segmented label={`${z.name} sensitivity`} defaultValue={z.id === "grill" ? "High" : z.id === "fryers" ? "High" : "Medium"} />
          </Row>
        ))}
      </Section>

      <Section title="Patrol schedule">
        <Row label="Patrol during service" hint="Pyro drives the aisles every few minutes.">
          <select className={selectCls} defaultValue="5">
            <option value="3">Every 3 minutes</option>
            <option value="5">Every 5 minutes</option>
            <option value="10">Every 10 minutes</option>
          </select>
        </Row>
        <Row label="Close-down check" hint="A full walk, mop and report after the last ticket.">
          <input type="time" defaultValue="23:00" className={selectCls} aria-label="Close-down check time" />
        </Row>
      </Section>
    </>
  );
}

function ChefSettings() {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <Section title="My station">
        <Row label="Station" hint="You only get alerts for this station.">
          <select className={selectCls} defaultValue="Grill">
            {zones.map((z) => (
              <option key={z.id}>{z.name}</option>
            ))}
          </select>
        </Row>
        <Row label={paused ? "Pyro is paused at your station" : "Pause Pyro at my station"} hint="Keeps the robot out of your way during a rush. Resumes after 20 minutes.">
          <button
            onClick={() => setPaused((p) => !p)}
            className={cn(
              "press inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13.5px] font-medium",
              paused ? "bg-warn-soft text-warn" : "border border-line hover:bg-black/[0.03]",
            )}
          >
            {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            {paused ? "Resume" : "Pause for 20 min"}
          </button>
        </Row>
      </Section>

      <Section title="Alerts">
        <Row label="Fire and smoke" hint="Always on for your station.">
          <Toggle defaultOn locked label="Fire and smoke alerts" />
        </Row>
        <Row label="Spills" hint="Tell me when Pyro mops near my station.">
          <Toggle defaultOn label="Spill alerts" />
        </Row>
        <Row label="End-of-shift summary">
          <Toggle label="End-of-shift summary" />
        </Row>
      </Section>

      <p className="mt-6 text-[13px] text-ink-3">
        On shift tonight: {team.filter((t) => t.role === "Chef").map((t) => `${t.name.split(" ")[0]} (${t.station})`).join(", ")}.
      </p>
    </>
  );
}
