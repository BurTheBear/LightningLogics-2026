# LightningLogics 2026 — PyroBot

PyroBot is a prototype for detecting and responding to **small kitchen fires only**. It does not detect or clean up spills. A companion web app lets restaurant supervisors and chefs control the robot. Built for the **Gaicom AI Hackathon** (theme: *AI for Local Businesses*).

## Fire-response design

- **Base and detection:** A modified Freenove 4WD car kit carries a Qualcomm-based Arduino UNO Q. An AI model runs locally on the board to detect fires from the camera feed.
- **Blanket deployment:** A 14-by-14-inch fire blanket is attached to the end of a servo-driven arm. After a person confirms deployment, the arm swings the blanket over the detected fire. The design includes a manual stop.

PyroBot is a demo prototype, not a substitute for certified fire-safety equipment or emergency procedures.

| Folder | Owner |
|---|---|
| `HARDWARE (VIVAN)/` | Vivan, Shreyansh |
| `AI VISION (ATHARV)/` | Atharv |
| `WEB APP (PRANAV)/` | Pranav |
| `PRESENTATION (ABHI)/` | Abhi |
| `WEB APP (PRANAV)/AI ASSISTANT (ABHI)/` | Abhi |

AI agents: start with [`AGENTS.md`](AGENTS.md).
