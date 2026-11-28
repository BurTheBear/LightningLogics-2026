# HARDWARE (VIVAN) — Vivan & Shreyansh

Read the root [`AGENTS.md`](../AGENTS.md) first.

**Scope:** robot code and hardware knowledge only. The robot is a **small car-style rover with four wheels** (not a round Roomba). Covers driving/navigation, sensors (flame, smoke, temperature, moisture), the **robotic arm with a fire blanket** (servos, gripper/release, blanket storage), the mopper, power, wiring, parts list.

**Not here:** camera/AI detection (→ `AI VISION (ATHARV)/`), dashboards (→ `WEB APP (PRANAV)/`), the assistant or shared APIs (→ `WEB APP (PRANAV)/AI ASSISTANT (ABHI)/`).

Guidelines:
- Note the board you're targeting (Arduino / ESP32 / Raspberry Pi) at the top of each file.
- Keep a `PARTS.md` with every part, pin, and wiring note.
- The fire-blanket arm must have a manual stop and must not deploy without a confirmed detection and a person tapping confirm.
- No water: the arm replaced the old water-shooter idea (water spreads grease fires).
- Receive commands using the shared message format defined in `WEB APP (PRANAV)/AI ASSISTANT (ABHI)/`.
