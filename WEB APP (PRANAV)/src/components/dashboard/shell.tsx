"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessagesSquare, LayoutGrid, ShieldAlert, Map, SlidersHorizontal, Users, LifeBuoy } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { currentUser } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Assistant", icon: MessagesSquare },
  { href: "/dashboard/overview", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/incidents", label: "Incidents", icon: ShieldAlert },
  { href: "/dashboard/map", label: "Kitchen map", icon: Map },
  { href: "/dashboard/team", label: "Team", icon: Users },
  { href: "/dashboard/settings", label: "Robot settings", icon: SlidersHorizontal },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-svh flex-col bg-[#efece7] p-2 pt-2">
      <div className="mb-2 flex flex-col gap-2 rounded-xl border border-[#d8d0f0] bg-banner px-4 py-2.5 text-[14px] text-ink sm:ml-12 sm:flex-row sm:items-center sm:justify-between sm:pl-5">
        <p>
          You&apos;re in the <span className="font-semibold">shared demo dashboard</span>. Sign-in and the robot
          aren&apos;t connected yet.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/sign-up" className="hidden font-medium underline underline-offset-4 md:inline">Set up your restaurant</Link>
          <Link href="/" className="press rounded-full bg-ink px-4 py-1.5 text-[13.5px] font-medium text-white hover:bg-[#2c2925]">Exit demo</Link>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-2">
        <aside aria-label="Dashboard" className="flex w-10 shrink-0 flex-col items-center gap-1">
          <Link href="/" aria-label="PyroBot home" className="press mb-2 rounded-lg">
            <LogoMark className="size-8" />
          </Link>
          {nav.map((item) => {
            const active = item.href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(item.href);
            return (
              <RailLink key={item.href} href={item.href} label={item.label} active={active}>
                <item.icon className="size-[18px]" strokeWidth={active ? 2.1 : 1.8} />
              </RailLink>
            );
          })}
          <div className="mt-auto flex flex-col items-center gap-1">
            <RailLink href="/dashboard/settings#help" label="Help" active={false}>
              <LifeBuoy className="size-[18px]" strokeWidth={1.8} />
            </RailLink>
            <span
              title={`${currentUser.firstName} · ${currentUser.role}`}
              className="relative mt-1 grid size-8 place-items-center rounded-full bg-[#d9d2c7] text-[11px] font-semibold text-ink"
            >
              DK
              <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-[#efece7] bg-ok" />
            </span>
          </div>
        </aside>

        <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-line bg-surface shadow-[0_1px_2px_rgba(27,25,22,0.04)]">
          {children}
        </div>
      </div>
    </div>
  );
}

function RailLink({ href, label, active, children }: { href: string; label: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      className={cn(
        "press group relative grid size-9 place-items-center rounded-lg text-ink-2 hover:bg-black/5 hover:text-ink",
        active && "bg-surface text-ink shadow-[0_1px_2px_rgba(27,25,22,0.08)] hover:bg-surface",
      )}
    >
      {children}
      <span className="pointer-events-none absolute left-full z-50 ml-2 origin-left scale-95 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[12px] font-medium text-white opacity-0 transition-[opacity,transform] delay-0 duration-150 ease-[var(--ease-out-quint)] group-hover:scale-100 group-hover:opacity-100 group-hover:delay-300">
        {label}
      </span>
    </Link>
  );
}

/** Standard header for dashboard pages other than the assistant. */
export function PageHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex h-[60px] shrink-0 items-center justify-between gap-4 border-b border-dashed border-line px-6">
      <h1 className="text-[20px] font-semibold tracking-[-0.015em] text-ink">{title}</h1>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

export function StatusPill({ tone, children }: { tone: "ok" | "warn" | "alert" | "neutral"; children: React.ReactNode }) {
  const tones = {
    ok: "bg-ok-soft text-ok",
    warn: "bg-warn-soft text-warn",
    alert: "bg-alert-soft text-alert",
    neutral: "bg-[#f1eee9] text-ink-2",
  };
  const dots = { ok: "bg-ok", warn: "bg-warn", alert: "bg-alert", neutral: "bg-ink-3" };
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium", tones[tone])}>
      <span className={cn("size-1.5 rounded-full", dots[tone])} />
      {children}
    </span>
  );
}
