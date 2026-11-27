#!/usr/bin/env bash
# Runs automatically (see .claude/settings.json). Fetches at most once a minute,
# then tells the agent if teammates pushed new work or seem to be working right now.
event="${1:-UserPromptSubmit}"
cd "$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0

stamp=".git/.last-auto-fetch"
now=$(date +%s)
last=$(cat "$stamp" 2>/dev/null || echo 0)
[ $((now - last)) -lt 60 ] && exit 0
echo "$now" > "$stamp"

timeout 20 git fetch --all --prune -q 2>/dev/null || exit 0

msg=""
if git rev-parse -q --verify '@{u}' >/dev/null; then
  behind=$(git rev-list --count 'HEAD..@{u}' 2>/dev/null || echo 0)
  [ "$behind" -gt 0 ] && msg+="Your branch is $behind commit(s) behind its remote. Merge them in (git pull --no-rebase) before editing more. "
fi

me=$(git config user.email)
recent=$(git log --remotes --since='15 minutes ago' --not HEAD --format='%ae|%an (%ar): %s' 2>/dev/null \
  | awk -F'|' -v me="$me" '$1 != me { sub(/^[^|]*\|/, ""); print }' | head -5)
[ -n "$recent" ] && msg+="Someone (or their agent) pushed in the last 15 min — they may be working right now. Check which files they touched (git log --remotes --since='15 minutes ago' --stat) and avoid editing the same files without asking: $recent"

[ -z "$msg" ] && exit 0
if [ "$event" = "UserPromptSubmit" ]; then
  echo "[git-sync] $msg"
else
  python3 -c 'import json,sys; print(json.dumps({"hookSpecificOutput":{"hookEventName":sys.argv[1],"additionalContext":"[git-sync] "+sys.argv[2]}}))' "$event" "$msg"
fi
