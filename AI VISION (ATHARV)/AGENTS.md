# AI VISION (ATHARV) — Atharv

Read the root [`AGENTS.md`](../AGENTS.md) first.

**Scope:** everything camera and AI-vision — camera capture, fire/smoke/spill detection models (e.g. YOLO, OpenCV), datasets, labeling, training, accuracy testing.

**Not here:** motor/sensor code (→ `HARDWARE (VIVAN)/`), UI (→ `WEB APP (PRANAV)/`), the assistant (→ `WEB APP (PRANAV)/AI ASSISTANT (ABHI)/`).

Guidelines:
- Output detections as the shared JSON event (see root AGENTS.md §5).
- Don't commit huge datasets or model weights — link to them or use Git LFS.
- Write down model accuracy and false alarms; judges will ask.
