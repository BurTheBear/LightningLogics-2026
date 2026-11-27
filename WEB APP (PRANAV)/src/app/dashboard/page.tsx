import type { Metadata } from "next";
import { AssistantChat } from "@/components/dashboard/assistant-chat";

export const metadata: Metadata = { title: "Assistant" };

export default function AssistantPage() {
  return <AssistantChat />;
}
