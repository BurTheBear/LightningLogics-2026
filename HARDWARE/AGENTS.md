# HARDWARE — Vivan & Shreyansh

Read the root [`AGENTS.md`](../AGENTS.md) first.

**Scope:** robot code and hardware knowledge only — driving/navigation, sensors (flame, smoke, temperature, moisture), the water shooter (pump + nozzle), the mopper, power, wiring, parts list.

**Not here:** camera/AI detection (→ `AI-VISION/`), dashboards (→ `WEB-APP/`), the assistant or shared APIs (→ `AI-ASSISTANT/`).

Guidelines:
- Note the board you're targeting (Arduino / ESP32 / Raspberry Pi) at the top of each file.
- Keep a `PARTS.md` with every part, pin, and wiring note.
- The water shooter must have a manual stop and must not fire without a confirmed detection.
- Receive commands using the shared message format defined in `AI-ASSISTANT/`.
