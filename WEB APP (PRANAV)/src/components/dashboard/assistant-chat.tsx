"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThinkingOrb } from "thinking-orbs";
import { BorderBeam } from "border-beam";
import {
  ArrowUp,
  Plus,
  Search,
  ListFilter,
  Wrench,
  PanelLeft,
  ShieldCheck,
  Bot,
  Flame,
  SlidersHorizontal,
  CornerDownRight,
  CircleCheck,
  CircleDashed,
  Droplets,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { currentUser, zones } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Demo script. The real assistant (Abhi's AI ASSISTANT folder) is not */
/* connected yet, so suggestions play canned replies and anything else  */
/* gets an honest "not connected" answer.                               */
/* ------------------------------------------------------------------ */

type ScriptId = "kitchen-clear" | "close-check" | "send-fryers" | "grill-sensitivity";

type PlanStep = { title: string; done: boolean; sub: string[] };
type Reply = {
  heading?: string;
  paragraphs: string[];
  status?: { icon: "ok" | "warn" | "spill"; text: string }[];
  plan?: PlanStep[];
  link?: { href: string; label: string };
  followUps?: { id: ScriptId; label: string }[];
};

type Message =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; reply: Reply; demo: boolean };

const suggestions: { id: ScriptId; icon: React.ElementType; title: string; sub: string }[] = [
  { id: "kitchen-clear", icon: ShieldCheck, title: "Is the kitchen clear right now?", sub: "Check every station for fire, smoke and spills" },
  { id: "close-check", icon: CircleCheck, title: "Run tonight's close-down check", sub: "Walk the floor, mop, and log it for the morning crew" },
  { id: "send-fryers", icon: Bot, title: "Send Pyro to the fryer station", sub: "Drive over and check the floor by the fryers" },
  { id: "grill-sensitivity", icon: SlidersHorizontal, title: "Change alert sensitivity for the grill", sub: "Fewer false alarms from searing smoke" },
];

const script: Record<ScriptId, { prompt: string; title: string; reply: Reply }> = {
  "kitchen-clear": {
    prompt: "Is the kitchen clear right now?",
    title: "Kitchen status check",
    reply: {
      paragraphs: ["Mostly, yes. Five of six stations are clear. I'm keeping an eye on the grill: smoke is up from searing, but it's within the normal range."],
      status: zones.map((z) => ({
        icon: z.status === "watch" ? "warn" : z.id === "fryers" ? "spill" : "ok",
        text: `${z.name}: ${z.note}`,
      })),
      followUps: [
        { id: "send-fryers", label: "Send Pyro to double-check the fryers" },
        { id: "grill-sensitivity", label: "Why is the grill on watch?" },
      ],
    },
  },
  "close-check": {
    prompt: "Run tonight's close-down check",
    title: "Close-down safety check",
    reply: {
      paragraphs: ["Here's the plan for tonight's close. I'll drive the route in this order and log each step so the morning crew sees it."],
      plan: [
        { title: "Walk the hot line", done: true, sub: ["Grill: flat-top off, no smoke", "Fryers: floor dry after 7:42 pm spill"] },
        { title: "Mop the wet zones", done: false, sub: ["Dish pit: one pass", "Pass: spot check"] },
        { title: "Check the cold side", done: false, sub: ["Walk-in door closed", "Prep floor clear"] },
        { title: "Dock and report", done: false, sub: ["Reload the fire blanket", "Send the shift report to Dana"] },
      ],
      heading: "Let's close up",
      followUps: [
        { id: "kitchen-clear", label: "Show me what's clear right now" },
        { id: "send-fryers", label: "Start with the fryers instead" },
      ],
    },
  },
  "send-fryers": {
    prompt: "Send Pyro to the fryer station",
    title: "Send Pyro to fryers",
    reply: {
      paragraphs: [
        "On my way. Pyro is in the center aisle, so the fryers are about 15 seconds away. I'll check the floor with the camera and mop if anything's wet.",
        "Spills get mopped straight away. If I see fire, I'll stop and ask the fryer station to confirm before the arm lays the fire blanket.",
      ],
      status: [{ icon: "spill", text: "Fryers: last spill cleared 7:42 pm" }],
      link: { href: "/dashboard/map", label: "Watch Pyro on the kitchen map" },
      followUps: [{ id: "close-check", label: "Then run the close-down check" }],
    },
  },
  "grill-sensitivity": {
    prompt: "Change alert sensitivity for the grill",
    title: "Grill sensitivity",
    reply: {
      paragraphs: [
        "The grill is set to High, so heavy searing smoke sometimes trips a watch alert. Medium would still catch real flare-ups within a second or two, with fewer false alarms during service.",
        "Only a supervisor can change this. You can do it in Robot settings under Zones.",
      ],
      link: { href: "/dashboard/settings", label: "Open Robot settings" },
      followUps: [{ id: "kitchen-clear", label: "Check the kitchen again" }],
    },
  },
};

const notConnected: Reply = {
  paragraphs: [
    "I can't answer that one yet. The Pyro assistant isn't connected to this dashboard, so right now I can only play the demo replies above.",
    "Try one of the suggestions, or check the Incidents and Kitchen map pages to see what the full version will show.",
  ],
  followUps: [
    { id: "kitchen-clear", label: "Is the kitchen clear right now?" },
    { id: "close-check", label: "Run tonight's close-down check" },
  ],
};

const history = {
  Today: ["Fryer spill, 7:42 pm", "Grill flare-up follow-up"],
  "Last 7 days": ["Weekend patrol schedule", "Getting started with Pyro"],
};

let uid = 0;
const nextId = () => `m${++uid}`;

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [title, setTitle] = useState("New chat");
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    if (messages.length === 0) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  function send(text: string, scriptId?: ScriptId) {
    const clean = text.trim();
    if (!clean || thinking) return;
    if (messages.length === 0) setTitle(scriptId ? script[scriptId].title : clean.slice(0, 40));
    setMessages((m) => [...m, { id: nextId(), role: "user", text: clean }]);
    setInput("");
    setThinking(true);
    // Long enough to read as real work (thinking orbs are not for < 2 s waits).
    timer.current = window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: nextId(), role: "assistant", reply: scriptId ? script[scriptId].reply : notConnected, demo: true },
      ]);
      setThinking(false);
    }, 2200);
  }

  function newChat() {
    window.clearTimeout(timer.current);
    setMessages([]);
    setThinking(false);
    setTitle("New chat");
    setInput("");
  }

  const empty = messages.length === 0;

  return (
    <div className="flex h-full">
      {/* Conversation list */}
      <aside
        aria-label="Conversations"
        className={cn("hidden w-[300px] shrink-0 flex-col border-r border-line lg:flex", !sidebarOpen && "lg:hidden")}
      >
        <div className="flex h-[60px] items-center justify-between px-6">
          <h2 className="text-[20px] font-semibold tracking-[-0.015em]">Pyro</h2>
          <button aria-label="Filter conversations" className="press grid size-8 place-items-center rounded-md text-ink-2 hover:bg-black/5 hover:text-ink">
            <ListFilter className="size-[18px]" />
          </button>
        </div>
        <div className="px-4">
          <label className="flex h-10 items-center gap-2.5 rounded-full border border-line px-3.5 text-ink-3 focus-within:border-[#cfc6ba]">
            <Search className="size-4" />
            <input placeholder="Search" aria-label="Search conversations" className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-3" />
          </label>
          <div className="mt-3 space-y-0.5">
            <button onClick={newChat} className="press flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[14.5px] text-ink hover:bg-black/[0.04]">
              <Plus className="size-4" /> New chat
            </button>
            <Link href="/dashboard/settings" className="press flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[14.5px] text-ink hover:bg-black/[0.04]">
              <Wrench className="size-4" /> Customize
            </Link>
          </div>
        </div>
        <div className="mx-4 my-4 h-px bg-line" />
        <nav className="flex-1 space-y-5 overflow-y-auto px-4 pb-6">
          {!empty && (
            <div>
              <p className="px-3 pb-1.5 text-[13px] text-ink-3">Now</p>
              <p className="truncate rounded-lg bg-[#f1eee9] px-3 py-2 text-[14px] text-ink">{title}</p>
            </div>
          )}
          {Object.entries(history).map(([group, items]) => (
            <div key={group}>
              <p className="px-3 pb-1.5 text-[13px] text-ink-3">{group}</p>
              {items.map((t) => (
                <button
                  key={t}
                  onClick={() => send(t.includes("spill") ? "Send Pyro to the fryer station" : "Is the kitchen clear right now?", t.includes("spill") ? "send-fryers" : "kitchen-clear")}
                  className="block w-full truncate rounded-lg px-3 py-2 text-left text-[14px] text-ink hover:bg-black/[0.04]"
                >
                  {t}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Chat */}
      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[60px] shrink-0 items-center justify-between gap-3 border-b border-dashed border-line px-5">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label={sidebarOpen ? "Hide conversations" : "Show conversations"}
              className="press hidden size-8 place-items-center rounded-md text-ink hover:bg-black/5 lg:grid"
            >
              <PanelLeft className="size-[18px]" />
            </button>
            <h1 className="truncate text-[20px] font-semibold tracking-[-0.015em]">{title}</h1>
          </div>
          {!empty && (
            <div className="flex items-center gap-1.5">
              <button aria-label="More options" className="press grid size-9 place-items-center rounded-full border border-line text-ink hover:bg-black/[0.03]"><MoreHorizontal className="size-4" /></button>
              <button aria-label="Share conversation" className="press grid size-9 place-items-center rounded-full border border-line text-ink hover:bg-black/[0.03]"><Share2 className="size-4" /></button>
            </div>
          )}
        </header>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto">
          {empty ? (
            <div className="mx-auto flex min-h-full max-w-[880px] flex-col justify-center px-5 py-12">
              <h2 className="text-balance text-center font-display text-[clamp(2rem,3.4vw,2.6rem)] leading-tight tracking-[-0.02em] text-ink">
                Where shall we start, {currentUser.firstName}?
              </h2>
              <div className="mt-9">
                <Composer value={input} onChange={setInput} onSend={() => send(input)} thinking={thinking} big />
              </div>
              <ul className="mt-8 space-y-3">
                {suggestions.map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => send(s.title, s.id)}
                      className="press group flex w-full items-start gap-3.5 rounded-2xl border border-line bg-surface px-5 py-4 text-left transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-px hover:border-[#d6cfc4] hover:shadow-[0_6px_16px_-10px_rgba(27,25,22,0.25)]"
                    >
                      <s.icon className="mt-0.5 size-[18px] shrink-0 text-ink" strokeWidth={1.9} />
                      <span>
                        <span className="block text-[15px] font-medium text-ink">{s.title}</span>
                        <span className="mt-0.5 block text-[14px] text-ink-2">{s.sub}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-center text-[13px] text-ink-3">Demo mode: suggestions play sample replies. The live assistant isn&apos;t connected yet.</p>
            </div>
          ) : (
            <div className="mx-auto max-w-[900px] space-y-7 px-5 py-8">
              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="msg-in ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-[#f1eee9] px-4 py-2.5 text-[15px] text-ink">
                    {m.text}
                  </div>
                ) : (
                  <AssistantMessage key={m.id} reply={m.reply} demo={m.demo} onFollowUp={(id) => send(script[id].prompt, id)} />
                ),
              )}
              {thinking && (
                <div className="msg-in flex items-center gap-3 text-[14px] text-ink-2" role="status" aria-live="polite">
                  <ThinkingOrb state="composing" size={32} theme="light" />
                  Pyro is thinking…
                </div>
              )}
            </div>
          )}
        </div>

        {!empty && (
          <div className="mx-auto w-full max-w-[940px] px-5 pb-5 pt-2">
            <Composer value={input} onChange={setInput} onSend={() => send(input)} thinking={thinking} />
          </div>
        )}
      </section>
    </div>
  );
}

function Composer({
  value,
  onChange,
  onSend,
  thinking,
  big,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  thinking: boolean;
  big?: boolean;
}) {
  const canSend = value.trim().length > 0 && !thinking;
  return (
    <BorderBeam active={thinking} size="md" colorVariant="sunset" theme="light" strength={0.8} className="rounded-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
        className="rounded-2xl border border-[#ddd7ce] bg-surface shadow-[0_8px_24px_-12px_rgba(27,25,22,0.22),0_1px_2px_rgba(27,25,22,0.06)] focus-within:border-[#cbc3b7]"
      >
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          rows={big ? 2 : 1}
          placeholder="Ask anything..."
          aria-label="Message Pyro"
          className="block w-full resize-none bg-transparent px-5 pt-4 text-[15.5px] text-ink outline-none placeholder:text-ink-3"
        />
        <div className="flex items-center justify-between px-3 pb-3 pt-1.5">
          <button type="button" aria-label="Attach a photo or file" className="press grid size-9 place-items-center rounded-full bg-[#f4f2ee] text-ink hover:bg-[#ebe7e0]">
            <Plus className="size-[18px]" />
          </button>
          <button
            type="submit"
            disabled={!canSend}
            aria-label="Send message"
            className={cn(
              "press grid size-9 place-items-center rounded-full transition-colors",
              canSend ? "bg-ink text-white hover:bg-[#2c2925]" : "bg-[#f4f2ee] text-ink-3",
            )}
          >
            <ArrowUp className="size-[18px]" />
          </button>
        </div>
      </form>
    </BorderBeam>
  );
}

function AssistantMessage({ reply, demo, onFollowUp }: { reply: Reply; demo: boolean; onFollowUp: (id: ScriptId) => void }) {
  return (
    <article className="msg-in flex gap-3">
      <LogoMark className="mt-0.5 size-7 shrink-0" />
      <div className="min-w-0 flex-1 space-y-4 text-[15px] leading-[1.65] text-ink">
        {demo && (
          <span className="inline-flex rounded-full bg-[#f1eee9] px-2 py-0.5 text-[11.5px] font-medium text-ink-2">Demo reply</span>
        )}

        {reply.plan && (
          <div className="max-w-[540px] rounded-2xl border border-line px-5 py-4">
            <ol className="space-y-3">
              {reply.plan.map((step) => (
                <li key={step.title}>
                  <p className="flex items-center gap-2.5 font-semibold">
                    {step.done ? <CircleCheck className="size-4 text-ok" /> : <CircleDashed className="size-4 text-ink-3" />}
                    {step.title}
                  </p>
                  <ul className="mt-1 space-y-1 pl-[26px]">
                    {step.sub.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-[14.5px] text-ink">
                        <span aria-hidden className="mb-1.5 h-2 w-2 rounded-bl-[3px] border-b border-l border-ink-3" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        )}

        {reply.heading && <h3 className="pt-1 text-[19px] font-semibold tracking-[-0.01em]">{reply.heading}</h3>}
        {reply.paragraphs.map((p) => (
          <p key={p} className="max-w-[68ch]">{p}</p>
        ))}

        {reply.status && (
          <ul className="space-y-1.5 text-[14.5px]">
            {reply.status.map((s) => (
              <li key={s.text} className="flex items-center gap-2.5">
                {s.icon === "ok" && <CircleCheck className="size-4 text-ok" />}
                {s.icon === "warn" && <Flame className="size-4 text-warn" />}
                {s.icon === "spill" && <Droplets className="size-4 text-ink-2" />}
                {s.text}
              </li>
            ))}
          </ul>
        )}

        {reply.link && (
          <Link href={reply.link.href} className="inline-flex font-medium underline decoration-ember/50 underline-offset-[5px] hover:decoration-ember">
            {reply.link.label}
          </Link>
        )}

        {reply.followUps && (
          <div className="pt-2">
            <h4 className="pb-2 text-[17px] font-semibold tracking-[-0.01em]">Follow-ups</h4>
            <ul className="divide-y divide-line border-y border-line">
              {reply.followUps.map((f) => (
                <li key={f.id}>
                  <button onClick={() => onFollowUp(f.id)} className="flex w-full items-center gap-2.5 px-1.5 py-2.5 text-left text-[15px] text-ink transition-colors hover:bg-black/[0.025]">
                    <CornerDownRight className="size-4 text-ink-2" />
                    {f.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
