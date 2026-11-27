# WEB-APP — Pranav

Read the root [`AGENTS.md`](../AGENTS.md) first.

**Scope:** frontend and web app only — supervisor and chef dashboards, role-based bot settings (zones, schedules, alerts, sensitivity), live status, alerts, login.

**Not here:** robot code (→ `HARDWARE/`), detection models (→ `AI-VISION/`), the assistant/shared APIs (→ `AI-ASSISTANT/`; use its message formats).

## Stack
- **Next.js** (App Router, TypeScript, `src/`), **Tailwind CSS v4**, **shadcn/ui**
- **Lenis** smooth scroll + **GSAP** (`gsap`, `@gsap/react`) — already wired up in `src/components/smooth-scroll.tsx` and `src/app/layout.tsx`
- **React Bits** and **Watermelon UI** component registries — set up in `components.json`. Add a component with:
  - `npx shadcn@latest add @react-bits/<component>` (browse https://reactbits.dev)
  - `npx shadcn@latest add @watermelon/<component>` (browse https://ui.watermelon.sh)

Run: `npm install`, then `npm run dev` → http://localhost:3000

## Agent tools in this folder
- **Playwright MCP** — lets the agent open the site in a real browser, click around, and screenshot. Config: `.mcp.json` (Claude Code) and `.vscode/mcp.json` (Copilot in VS Code). Open this `WEB-APP` folder as the project for them to load.
- **shadcn MCP** — lets the agent search and add components from shadcn, React Bits, and Watermelon (uses the registries in `components.json`).
- **Vercel MCP** — deploys, logs, and project settings on Vercel. Each person signs in to Vercel the first time it's used.
- **Design skills** in `.claude/skills/` (Claude Code and Copilot both read this folder):
  - `ui-ux-pro-max` — styles, palettes, fonts, UX rules
  - `taste-skill` — avoids generic "AI-looking" UI
  - `impeccable` — design critique, audit, polish
  - `emil-design-eng` — Emil Kowalski's animation & UI polish
  - `apple-design` — Apple-style motion, gestures, materials, type
  Use them for any UI or animation work. Respect `prefers-reduced-motion`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
