# AGENTS.md — LightningLogics 2026

Instructions for **every** AI coding agent working in this repo (Claude Code, GitHub Copilot, Cursor, Codex, etc.).
Read this file first, then read the `AGENTS.md` inside the folder you are working in.

---

## 1. The hackathon

**Event:** Gaicom AI Hackathon
**Theme:** *AI for Local Businesses* — build an AI tool that helps a real local business solve a problem a local town business usually faces. (Example given by organizers: a review responder that drafts replies to customer reviews.)

Every decision should answer: **"How does this help a real local restaurant?"**

## 2. Our project — SpillBot (working name)

An AI safety robot for restaurant kitchens that **finds and handles fires and spills**, plus a web app for staff to control it.

**The problem:** Small restaurants have busy, crowded kitchens. Grease fires and floor spills cause injuries, damaged food, health-code issues, and lost money. Small businesses can't afford a full-time safety person.

**Our solution has 4 connected parts:**

| Part | What it does |
|---|---|
| **Robot (hardware)** | Roomba-style bot that drives around the kitchen. Has a **water shooter** for small fires, a **detector** (fire / smoke / spill sensors), and a **mopper** to clean spills. |
| **AI vision** | Camera + AI model that spots fires, smoke, and spills, and tells the robot where to go. |
| **Web app** | Dashboard for the **restaurant supervisor** and the **chefs**. Each role has different settings for configuring the bot (zones, schedules, alerts, sensitivity, etc.). |
| **AI assistant** | Chat/voice assistant that connects the robot and the web app — staff can ask it things like "Is the kitchen clear?" or "Send the bot to station 3." |

> ⚠️ Safety note for agents: real fire suppression is dangerous. Keep the water shooter for **small, contained demo fires** only, never suggest replacing real extinguishers or sprinkler systems, and always add a manual stop / human-confirm step for the shooter.

## 3. Team & folder map

| Folder | Owner(s) | What goes here |
|---|---|---|
| [`HARDWARE/`](HARDWARE/AGENTS.md) | **Vivan**, **Shreyansh** | Robot code (motors, sensors, water shooter, mopper), wiring, parts list, hardware notes |
| [`AI-VISION/`](AI-VISION/AGENTS.md) | **Atharv** | Camera code, fire/smoke/spill detection models, datasets, training, image processing |
| [`WEB-APP/`](WEB-APP/AGENTS.md) | **Pranav** | Next.js frontend + web app (supervisor & chef dashboards, settings, UI) |
| [`PRESENTATION/`](PRESENTATION/AGENTS.md) | **Abhi** | Pitch deck, demo script, video, judging notes |
| [`AI-ASSISTANT/`](AI-ASSISTANT/AGENTS.md) | **Abhi** | The AI assistant that links the robot and the web app; shared message formats/APIs between parts |

**Abhi is the integrator** — anything that connects two or more parts (robot ↔ web app, vision ↔ robot, assistant ↔ anything) involves him.

## 4. Automatic routing (agents: do this before you write any code)

Work out which folder a task belongs to from **what it's about**, even if the user doesn't name a folder. Then work only in that folder.

| If the task mentions… | Route to |
|---|---|
| motors, wheels, driving, pump, nozzle, water shooter, mop, servo, Arduino, ESP32, Raspberry Pi GPIO, sensors (temp, flame, smoke, moisture), battery, wiring, firmware, robot movement | `HARDWARE/` |
| camera, video feed, image, detection, YOLO / OpenCV / model, training, dataset, labeling, "is that a fire/spill?", confidence, frames | `AI-VISION/` |
| page, dashboard, UI, button, login, roles (supervisor / chef), settings screen, React, Next.js, CSS, animation, frontend, charts, notifications on screen | `WEB-APP/` |
| slides, pitch, deck, demo script, video, judges, story, branding for the pitch | `PRESENTATION/` |
| assistant, chatbot, voice, LLM prompt, "connect X to Y", API between robot and web app, message format, end-to-end flow | `AI-ASSISTANT/` |

Rules:
1. **One clear match →** go there.
2. **Matches several folders →** it's integration work. Put shared contracts (API shapes, message formats) in `AI-ASSISTANT/`, and only touch the other folders where needed. Tell the user which folders you touched.
3. **No clear match →** ask the user one short question before writing code.
4. **Don't edit another person's folder** unless the task needs it — and say so in your reply/PR.
5. You can guess who is asking from the folder they're in or what they're asking about; tailor the answer to that person's part.

PRs are also auto-labeled by folder (see `.github/labeler.yml`), so the owner can see what's theirs.

## 5. How the parts talk to each other (starting plan — change as we build)

```
 Camera ──► AI-VISION ──(detection event)──► AI-ASSISTANT ◄──► WEB-APP (supervisor / chef)
                                                  │
                                                  ▼
                                              HARDWARE (robot)
```

Suggested detection event (JSON), owned in `AI-ASSISTANT/`:

```json
{ "type": "fire | smoke | spill", "confidence": 0.92, "zone": "grill", "timestamp": "2026-11-27T18:00:00Z" }
```

## 6. Ground rules for all agents

- Keep it simple — this is a hackathon. Working demo > perfect code.
- Explain things in plain, short language; some of the team are high-school students.
- Don't commit secrets (API keys, `.env`, Wi-Fi passwords).
- Small, focused commits with clear messages.
- If you're unsure what the user means, ask a clarifying question instead of guessing.
