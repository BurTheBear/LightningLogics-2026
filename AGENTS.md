# AGENTS.md — LightningLogics 2026

Instructions for **every** AI coding agent working in this repo (Claude Code, GitHub Copilot, Cursor, Codex, etc.).
Read this file first, then read the `AGENTS.md` inside the folder you are working in.

---

## 1. The hackathon

**Event:** Gaicom AI Hackathon
**Theme:** *AI for Local Businesses* — build an AI tool that helps a real local business solve a problem a local town business usually faces. (Example given by organizers: a review responder that drafts replies to customer reviews.)

Every decision should answer: **"How does this help a real local restaurant?"**

## 2. Our project — PyroBot ("Pyro" for short)

**Official name:** PyroBot (use this in the pitch, the web app title, and anything judges see).
**Short, informal name:** Pyro (fine in chat, the AI assistant's voice, and UI copy like "Pyro is checking the grill").


An AI safety robot for restaurant kitchens that **finds and handles fires and spills**, plus a web app for staff to control it.

**The problem:** Small restaurants have busy, crowded kitchens. Grease fires and floor spills cause injuries, damaged food, health-code issues, and lost money. Small businesses can't afford a full-time safety person.

**Our solution has 4 connected parts:**

| Part | What it does |
|---|---|
| **Robot (hardware)** | Roomba-style bot that drives around the kitchen. Has a **robotic arm with a fire blanket** that it lays over small fires (no water), a **detector** (fire / smoke / spill sensors), and a **mopper** to clean spills. |
| **AI vision** | Camera + AI model that spots fires, smoke, and spills, and tells the robot where to go. |
| **Web app** | Dashboard for the **restaurant supervisor** and the **chefs**. Each role has different settings for configuring the bot (zones, schedules, alerts, sensitivity, etc.). |
| **AI assistant** | Chat/voice assistant that connects the robot and the web app — staff can ask it things like "Is the kitchen clear?" or "Send the bot to station 3." |

> ⚠️ Safety note for agents: real fire suppression is dangerous. Keep the fire-blanket arm for **small, contained demo fires** only (e.g. a pan fire), never suggest replacing real extinguishers or hood/sprinkler systems, and always add a manual stop / human-confirm step before the arm deploys the blanket. The robot does **not** spray water — water makes grease fires worse.

## 3. Team & folder map

```
LightningLogics-2026/
├── HARDWARE (VIVAN)/          → Vivan + Shreyansh · robot code & hardware notes
├── AI VISION (ATHARV)/        → Atharv · camera + fire/smoke/spill detection
├── WEB APP (PRANAV)/          → Pranav · Next.js web app (supervisor & chef dashboards)
│   └── AI ASSISTANT (ABHI)/   → Abhi · AI assistant + shared APIs/message formats
└── PRESENTATION (ABHI)/       → Abhi · pitch deck, demo script, video
```

| Folder | Owner(s) | What goes here |
|---|---|---|
| [`HARDWARE (VIVAN)/`](HARDWARE%20%28VIVAN%29/AGENTS.md) | **Vivan**, **Shreyansh** | Robot code (motors, sensors, fire-blanket arm, mopper), wiring, parts list, hardware notes |
| [`AI VISION (ATHARV)/`](AI%20VISION%20%28ATHARV%29/AGENTS.md) | **Atharv** | Camera code, fire/smoke/spill detection models, datasets, training, image processing |
| [`WEB APP (PRANAV)/`](WEB%20APP%20%28PRANAV%29/AGENTS.md) | **Pranav** | Next.js frontend + web app (supervisor & chef dashboards, settings, UI) |
| [`WEB APP (PRANAV)/AI ASSISTANT (ABHI)/`](WEB%20APP%20%28PRANAV%29/AI%20ASSISTANT%20%28ABHI%29/AGENTS.md) | **Abhi** | The AI assistant that links the robot and the web app; shared message formats/APIs between parts |
| [`PRESENTATION (ABHI)/`](PRESENTATION%20%28ABHI%29/AGENTS.md) | **Abhi** (+ Shreyansh's demo video) | Pitch deck, demo script, **Shreyansh's demo video**, judging notes |

**Shreyansh's demo video goes in `PRESENTATION (ABHI)/`** (not `HARDWARE (VIVAN)/`), even though he also works on hardware.

**Abhi is the integrator** — anything that connects two or more parts (robot ↔ web app, vision ↔ robot, assistant ↔ anything) involves him.
The assistant lives **inside** the web app folder, but it's Abhi's area: Pranav's agents leave `AI ASSISTANT (ABHI)/` alone, and Abhi's agents stay inside it unless wiring it into the web app.

## 4. Automatic routing (agents: do this before you write any code)

Work out which folder a task belongs to from **what it's about**, even if the user doesn't name a folder. Then work only in that folder.

```
                       ┌─ motors / sensors / arm / mop / wiring ──────► HARDWARE (VIVAN)/
                       ├─ camera / detection / model / dataset ───────► AI VISION (ATHARV)/
   new task ──► what's ┼─ page / dashboard / UI / settings / CSS ─────► WEB APP (PRANAV)/
   it about?           ├─ assistant / chatbot / voice / API / connect ► WEB APP (PRANAV)/AI ASSISTANT (ABHI)/
                       ├─ slides / pitch / demo video / judges ───────► PRESENTATION (ABHI)/
                       ├─ more than one of these ─────────────────────► integration (rule 2)
                       └─ not sure ───────────────────────────────────► ask the user first
```

| If the task mentions… | Route to |
|---|---|
| motors, wheels, driving, robotic arm, fire blanket, gripper, mop, servo, Arduino, ESP32, Raspberry Pi GPIO, sensors (temp, flame, smoke, moisture), battery, wiring, firmware, robot movement | `HARDWARE (VIVAN)/` |
| camera, video feed, image, detection, YOLO / OpenCV / model, training, dataset, labeling, "is that a fire/spill?", confidence, frames | `AI VISION (ATHARV)/` |
| page, dashboard, UI, button, login, roles (supervisor / chef), settings screen, React, Next.js, CSS, animation, frontend, charts, notifications on screen | `WEB APP (PRANAV)/` |
| assistant, chatbot, voice, LLM prompt, "connect X to Y", API between robot and web app, message format, end-to-end flow | `WEB APP (PRANAV)/AI ASSISTANT (ABHI)/` |
| slides, pitch, deck, demo script, video, judges, story, branding for the pitch | `PRESENTATION (ABHI)/` |

**Examples**

| Someone asks… | Goes to | Why |
|---|---|---|
| "Make the robot turn left when it sees a wall" | `HARDWARE (VIVAN)/` | robot movement |
| "The model thinks orange plates are fire" | `AI VISION (ATHARV)/` | detection accuracy |
| "Add a settings page where chefs pick their station" | `WEB APP (PRANAV)/` | UI + chef role |
| "Let the supervisor ask the bot 'is the kitchen clear?'" | `WEB APP (PRANAV)/AI ASSISTANT (ABHI)/` | assistant |
| "Show a live alert on the dashboard when a spill is found" | `WEB APP (PRANAV)/AI ASSISTANT (ABHI)/` (message format) + `WEB APP (PRANAV)/` (alert UI) | integration — touches 2 parts |
| "Make slide 3 explain the cost of kitchen fires" | `PRESENTATION (ABHI)/` | pitch |
| "Fix the thing" | ❓ ask | no clear match |

Rules:
1. **One clear match →** go there.
2. **Matches several folders →** it's integration work. Put shared contracts (API shapes, message formats) in `WEB APP (PRANAV)/AI ASSISTANT (ABHI)/`, and only touch the other folders where needed. Tell the user which folders you touched.
3. **No clear match →** ask the user one short question before writing code.
4. **Don't edit another person's folder** unless the task needs it — and say so in your reply.
5. You can guess who is asking from the folder they're in or what they're asking about; tailor the answer to that person's part.

## 5. How the parts talk to each other (starting plan — change as we build)

```
 Camera ──► AI VISION ──(detection event)──► AI ASSISTANT ◄──► WEB APP (supervisor / chef)
                                                  │
                                                  ▼
                                              HARDWARE (robot)
```

Suggested detection event (JSON), owned in `WEB APP (PRANAV)/AI ASSISTANT (ABHI)/`:

```json
{ "type": "fire | smoke | spill", "confidence": 0.92, "zone": "grill", "timestamp": "2026-11-27T18:00:00Z" }
```

## 6. Staying in sync (5 people + their agents work at the same time)

**Fetch constantly.** Run `git fetch --all` about **every minute** while working — always at the start of a task, before editing a file, and before every commit and push.
- Claude Code does this automatically through a hook (`.claude/settings.json` → `.claude/hooks/git-sync-check.sh`). It fetches at most once a minute and warns you about new commits.
- Copilot / other agents: there's no hook, so run `git fetch --all` yourself between steps.

**Check if someone else's agent is working.** After fetching, run:
```bash
git log --remotes --since='15 minutes ago' --stat
```
If anyone pushed in the last ~15 minutes, assume they (or their agent) are **still working**:
1. Merge their work into yours first: `git pull --no-rebase`.
2. Don't edit the same files they just touched. If you must, tell the user and ask first.
3. Changes in another person's folder = their area. Leave it alone unless the task needs it.

**Work on `main` only.** Don't create new branches and don't open pull requests — commit and push straight to `main`.

**Commit and push small and often.**
- Commit after **every small working change** (one fix, one feature piece) — don't save up big commits.
- **Push right after each commit**, and at least every ~15 minutes while working, so others see your changes.
- Before pushing: `git fetch` and merge. If the push is rejected, `git pull --no-rebase`, fix any conflicts, then push again.
- **Never** force-push (`git push --force`) or rewrite history on a shared branch.
- Never commit broken code to `main` — make sure it at least runs/builds.

## 7. Ground rules for all agents

- Keep it simple — this is a hackathon. Working demo > perfect code.
- Explain things in plain, short language; some of the team are high-school students.
- Don't commit secrets (API keys, `.env`, Wi-Fi passwords).
- Small, focused commits with clear messages.
- If you're unsure what the user means, ask a clarifying question instead of guessing.
