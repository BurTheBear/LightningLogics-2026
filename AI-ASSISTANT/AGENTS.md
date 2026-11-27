# AI-ASSISTANT — Abhi (integrator)

Read the root [`AGENTS.md`](../AGENTS.md) first.

**Scope:** the AI assistant (chat/voice) that spans the robot and the web app, plus the **shared contracts** that connect all parts: API endpoints, message/event formats, end-to-end flow.

Guidelines:
- This folder is the single source of truth for message formats. If you change one, tell the owners of `HARDWARE/`, `AI-VISION/`, and `WEB-APP/`.
- Never let the assistant fire the water shooter without a human confirming.
- Keep API keys in `.env` (never committed).
