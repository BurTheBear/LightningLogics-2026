"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Info } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";

/**
 * Sample sign-in / sign-up card in the style of Clerk's prebuilt components.
 * NOT real auth yet: every path goes straight to the shared demo dashboard.
 * When Clerk is added, swap this for <SignIn /> / <SignUp /> from @clerk/nextjs.
 */
export function AuthCard({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);
  const isSignUp = mode === "sign-up";

  function go(e?: React.FormEvent) {
    e?.preventDefault();
    setBusy(true);
    router.push("/dashboard");
  }

  return (
    <div className="w-full max-w-[400px]">
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_48px_-24px_rgba(27,25,22,0.25),0_1px_3px_rgba(27,25,22,0.06)]">
        <div className="px-8 pb-8 pt-9">
          <div className="flex flex-col items-center text-center">
            <LogoMark className="size-10" />
            <h1 className="mt-5 text-[18px] font-semibold tracking-[-0.01em] text-ink">
              {isSignUp ? "Create your PyroBot account" : "Sign in to PyroBot"}
            </h1>
            <p className="mt-1.5 text-[14px] text-ink-2">
              {isSignUp ? "Welcome! Fill in the details to get started." : "Welcome back! Please sign in to continue."}
            </p>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-2.5">
            <button type="button" onClick={() => go()} className="press flex h-10 items-center justify-center gap-2 rounded-lg border border-line bg-surface text-[13.5px] font-medium text-ink shadow-[0_1px_1px_rgba(27,25,22,0.04)] hover:bg-[#faf9f7]">
              <GoogleIcon /> Google
            </button>
            <button type="button" onClick={() => go()} className="press flex h-10 items-center justify-center gap-2 rounded-lg border border-line bg-surface text-[13.5px] font-medium text-ink shadow-[0_1px_1px_rgba(27,25,22,0.04)] hover:bg-[#faf9f7]">
              <MicrosoftIcon /> Microsoft
            </button>
          </div>

          <div className="my-6 flex items-center gap-3 text-[13px] text-ink-3">
            <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
          </div>

          <form onSubmit={go} className="space-y-4">
            {isSignUp && (
              <div className="grid grid-cols-2 gap-3">
                <Field label="First name" name="first" autoComplete="given-name" />
                <Field label="Restaurant" name="restaurant" autoComplete="organization" />
              </div>
            )}
            <Field label="Email address" name="email" type="email" autoComplete="email" placeholder="you@restaurant.example" />
            <div>
              <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-ink">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  className="h-10 w-full rounded-lg border border-line bg-surface px-3 pr-10 text-[14px] text-ink outline-none transition-shadow placeholder:text-ink-3 focus:border-[#cfc6ba] focus:shadow-[0_0_0_3px_rgba(194,65,12,0.12)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute right-1.5 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-ink-3 hover:bg-black/5 hover:text-ink"
                >
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={busy}
              className="press flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-ink text-[14px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_1px_2px_rgba(27,25,22,0.3)] hover:bg-[#2c2925] disabled:opacity-70"
            >
              {busy ? "Opening dashboard…" : "Continue"} {!busy && <ArrowRight className="size-3.5" />}
            </button>
          </form>
        </div>
        <div className="border-t border-line bg-[#faf9f7] px-8 py-4 text-center text-[13.5px] text-ink-2">
          {isSignUp ? "Already have an account? " : "Don’t have an account? "}
          <Link href={isSignUp ? "/sign-in" : "/sign-up"} className="font-medium text-ink underline-offset-4 hover:underline">
            {isSignUp ? "Sign in" : "Sign up"}
          </Link>
        </div>
      </div>
      <p className="mt-5 flex items-start justify-center gap-2 text-center text-[12.5px] leading-relaxed text-ink-3">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        Demo mode: sign-in isn&apos;t connected yet. Any button opens the shared demo dashboard.
      </p>
    </div>
  );
}

function Field({ label, name, type = "text", autoComplete, placeholder }: { label: string; name: string; type?: string; autoComplete?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[13px] font-medium text-ink">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-line bg-surface px-3 text-[14px] text-ink outline-none transition-shadow placeholder:text-ink-3 focus:border-[#cfc6ba] focus:shadow-[0_0_0_3px_rgba(194,65,12,0.12)]"
      />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.7Z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1 .7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9h-4v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.4 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8Z" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path fill="#F25022" d="M1 1h10.5v10.5H1z" />
      <path fill="#7FBA00" d="M12.5 1H23v10.5H12.5z" />
      <path fill="#00A4EF" d="M1 12.5h10.5V23H1z" />
      <path fill="#FFB900" d="M12.5 12.5H23V23H12.5z" />
    </svg>
  );
}
