import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { Logo } from "@/components/brand/logo";

export const metadata: Metadata = { title: "Sign in" };

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col">
      <header className="mx-auto flex w-full max-w-[1200px] items-center px-5 py-5 md:px-8">
        <Link href="/" aria-label="PyroBot home" className="press rounded-md">
          <Logo />
        </Link>
      </header>
      <div className="flex flex-1 items-center justify-center px-5 pb-16 pt-6">
        <AuthCard mode="sign-in" />
      </div>
    </main>
  );
}
