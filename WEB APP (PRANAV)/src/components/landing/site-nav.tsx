import Link from "next/link";
import { Logo } from "@/components/brand/logo";

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#assistant", label: "Assistant" },
  { href: "#roles", label: "For your team" },
  { href: "#safety", label: "Safety" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="PyroBot home" className="press rounded-md">
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] text-ink-2 underline-offset-[6px] decoration-ember/60 transition-colors hover:text-ink hover:underline"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/sign-in" className="press hidden rounded-full px-4 py-2 text-[14px] font-medium text-ink hover:bg-black/5 sm:inline-flex">
            Log in
          </Link>
          <Link href="/sign-up" className="press inline-flex rounded-full bg-ink px-4 py-2 text-[14px] font-medium text-white hover:bg-[#2c2925]">
            Book a demo
          </Link>
        </div>
      </div>
    </header>
  );
}
