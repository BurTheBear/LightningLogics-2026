# Copilot instructions

Read and follow [`AGENTS.md`](../AGENTS.md) at the repo root, then the `AGENTS.md` inside the folder you're working in.
It explains the project (SpillBot, a fire/spill safety robot for restaurants), who owns each folder, and how to route a task to the right folder.

**Important (AGENTS.md §6):** you have no auto-fetch hook, so run `git fetch --all` about every minute (before every edit, commit, and push). Check `git log --remotes --since='15 minutes ago' --stat` — if a teammate pushed recently, their agent may still be working: merge first and don't edit the same files. Work on `main` only — no new branches, no pull requests. Commit and push after every small working change. Never force-push.
