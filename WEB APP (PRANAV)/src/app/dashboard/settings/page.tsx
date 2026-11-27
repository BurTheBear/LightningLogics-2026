import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/shell";
import { SettingsPanel } from "@/components/dashboard/settings-panel";

export const metadata: Metadata = { title: "Robot settings" };

export default function SettingsPage() {
  return (
    <div className="flex h-full flex-col">
      <PageHeader title="Robot settings" />
      <div className="min-h-0 flex-1 overflow-y-auto">
        <SettingsPanel />
      </div>
    </div>
  );
}
