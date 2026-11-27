import { cn } from "@/lib/utils";

/** PyroBot mark: a flame held inside a rounded tile. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <rect width="32" height="32" rx="8" fill="var(--ink)" />
      <path
        d="M16.4 6.5c.4 3.1-1.3 4.6-2.9 6.3-1.5 1.6-2.9 3.3-2.9 6 0 3.5 2.6 6.2 5.6 6.2s5.4-2.5 5.4-5.8c0-2.3-1.1-3.9-2.2-5.2.1 1.6-.5 2.8-1.6 3.4.3-3.8-.2-7.6-1.4-10.9Z"
        fill="var(--ember)"
      />
      <path d="M16.2 25c-1.5 0-2.6-1.2-2.6-2.8 0-1.4.9-2.4 2-3.4.3 1 .9 1.6 1.7 1.9.5-.6.8-1.3.8-2 .8.8 1.3 1.8 1.3 3 0 1.9-1.4 3.3-3.2 3.3Z" fill="#fde2d3" />
    </svg>
  );
}

export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-7" />
      <span className={cn("text-[17px] font-semibold tracking-[-0.02em]", tone === "light" ? "text-white" : "text-ink")}>
        PyroBot
      </span>
    </span>
  );
}
