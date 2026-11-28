# WEB APP (PRANAV) — Pranav

Read the root [`AGENTS.md`](../AGENTS.md) first.

**Scope:** frontend and web app only — supervisor and chef dashboards, role-based bot settings (zones, schedules, alerts, sensitivity), live status, alerts, login.

**Not here:** robot code (→ `HARDWARE (VIVAN)/`), detection models (→ `AI VISION (ATHARV)/`), the assistant/shared APIs (→ `AI ASSISTANT (ABHI)/` in this folder — Abhi's area, leave it alone; use its message formats).

## Stack
- **Next.js** (App Router, TypeScript, `src/`), **Tailwind CSS v4**, **shadcn/ui**
- **Lenis** smooth scroll + **GSAP** (`gsap`, `@gsap/react`) — used on the landing page only (`src/components/smooth-scroll.tsx`, wrapped in `src/app/page.tsx`); the dashboard has its own scroll areas
- **React Bits** and **Watermelon UI** component registries — set up in `components.json`. Add a component with:
  - `npx shadcn@latest add @react-bits/<component>` (browse https://reactbits.dev)
  - `npx shadcn@latest add @watermelon/<component>` (browse https://ui.watermelon.sh)

- **Libraries.dev** UI effects (installed): `border-beam`, `thinking-orbs`, `liquid-gooey`, `voice-glow`, `voice-ring`, `distortion-waves`, `bot-avatars`, `metal-fx`, `img-fx`. Great for Pyro's assistant (thinking orbs, voice ring, bot avatar) and alert highlights (border beam). Read the `libraries-dev` skill's reference file before using one — never guess props. Docs: https://libraries.dev

Run: `npm install`, then `npm run dev` → http://localhost:3000

## Deploy (Cloudflare Pages → `pyrobot.pages.dev`)
The site is a **static export** (`output: "export"` in `next.config.ts`): `npm run build` writes plain files to `out/`. Keep every page static (no server-only features like API routes, cookies or `revalidate`) or the export breaks.
- From your computer: `npx wrangler login` once, then `npm run deploy`.
- Or Cloudflare dashboard → Workers & Pages → Create → Pages → connect the GitHub repo, with root directory `WEB APP (PRANAV)`, build command `npm run build`, output directory `out`.

## Pages (demo — nothing is live yet)
- `/` landing page · `/sign-in`, `/sign-up` sample auth (no real auth) → `/dashboard`
- `/dashboard` the AI assistant chat (main feature; scripted demo replies until Abhi's assistant is connected)
- `/dashboard/overview`, `/incidents`, `/map`, `/team`, `/settings` (Supervisor and Chef tabs)
- Demo data: `src/lib/demo-data.ts`. Brand colours/fonts: `src/app/globals.css`.
- **3D robot:** `src/components/device/pyro-scene.tsx` models PyroBot in code (three.js / React Three Fiber). Change shapes and colours there to match the real prototype. The robot is a **car-style four-wheel rover**. `src/components/device/story-stage.tsx` is the scroll story (drive in → spot fire → confirm → lay blanket → back off); its timing lives in `steps` and in the `story` branch of `pyro-scene.tsx`.
- **Demo video:** put Shreyansh's video at `public/videos/pyro-demo.mp4` and it plays in the Demo section automatically.
- Photos go in `public/images/` (`robot-kitchen.png`, `robot-detail.png`, `supervisor-chef.png`, `spill-floor.png`); until they exist the page shows a placeholder.

## Agent tools in this folder
- **Playwright MCP** — lets the agent open the site in a real browser, click around, and screenshot. Config: `.mcp.json` (Claude Code) and `.vscode/mcp.json` (Copilot in VS Code). Open this `WEB APP (PRANAV)` folder as the project for them to load.
- **shadcn MCP** — lets the agent search and add components from shadcn, React Bits, and Watermelon (uses the registries in `components.json`).
- **Clerk MCP** — Clerk auth docs/snippets for when real sign-in is added. Not used yet: `/sign-in` and `/sign-up` are sample pages that go straight to the demo dashboard.
- **Cloudflare MCP** (`https://mcp.cloudflare.com/mcp`) — the full Cloudflare API: Pages/Workers, builds, account resources and docs. Each person signs in to Cloudflare the first time it's used.
- **Vercel MCP** — deploys, logs, and project settings on Vercel. Each person signs in to Vercel the first time it's used.
- **Design skills** in `.claude/skills/` (Claude Code and Copilot both read this folder):
  - `ui-ux-pro-max` — styles, palettes, fonts, UX rules
  - `taste-skill` — avoids generic "AI-looking" UI
  - `impeccable` — design critique, audit, polish
  - `emil-design-eng` — Emil Kowalski's animation & UI polish
  - `apple-design` — Apple-style motion, gestures, materials, type
  - `libraries-dev` — how to use the Libraries.dev effects above, and where they fit
  Use them for any UI or animation work. Respect `prefers-reduced-motion`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
