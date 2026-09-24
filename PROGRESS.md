# PROGRESS: Next Byte Hacks V4

Running log for the unattended cloud build. Newest entry at the bottom of the log. A resumed session should read this top to bottom, then continue from the first unchecked phase.

## Countdown

| | |
|---|---|
| Deadline | **Wed Sep 30, 2026 · 11:45 PM EDT** |
| Session start | Wed Sep 23, 2026 · 10:35 PM EDT |
| Hours left at start | **~169 h** (7 d 1 h 10 m) |
| "All deliverables done" target (CLAUDE.md: ≥24 h early) | **Tue Sep 29, 2026 · 11:45 PM EDT** |
| Working window to that target | ~145 h |

## Phase plan (budgeted backwards, hackathon-win Phase 4 shares of the 145 h window)

| Phase | Share | Budget | Latest finish (ET) | Status |
|---|---|---|---|---|
| 0. Countdown + plan | — | 10 min | Wed Sep 23 23:00 | ✅ |
| 1. Tool check | — | 15 min | Wed Sep 23 23:15 | ✅ |
| 2. Research (verify event, 5–8 winners, brief) | part of buffer | 3 h | Thu Sep 24 02:00 | ☐ |
| 3. Concept (3 × rubric, pick, CONCEPT.md pushed) | part of buffer | 1 h | Thu Sep 24 03:00 | ☐ |
| 4. Design direction (PRODUCT.md + DESIGN.md) | part of core | 1 h | Thu Sep 24 04:00 | ☐ |
| 5. Build: wow moment → demo path → rest, tests, CI, deploy | ~50 % | 72 h | Sun Sep 27 04:00 | ☐ |
| 6. Quality passes (critique → audit → polish, live pass) | inside core | — | Sun Sep 27 | ☐ |
| 7. Demo video (1:30–2:30, captioned, wow in 15 s) | ~20 % | 29 h | Mon Sep 28 09:00 | ☐ |
| 8. Submission kit (README, docs, DEVPOST, gallery, checklist) | ~15 % | 22 h | Tue Sep 29 07:00 | ☐ |
| 9. Ship (merge to main, live check, HANDOFF.md) | buffer ~15 % | 16 h | Tue Sep 29 23:45 | ☐ |

The budget is a ceiling, not a target: an agent session moves faster than a human, so each phase finishes as soon as its exit criteria are met and the savings roll into buffer.

## Tool check (Phase 1)

| Tool | Status |
|---|---|
| Node | v22.22.2, npm 10.9.7 |
| Playwright Chromium | `/opt/pw-browsers/chromium-1194` (preinstalled; do not `playwright install`) |
| ffmpeg | none on the system. Installed `imageio-ffmpeg` (static ffmpeg 7.0.2 with libx264 + aac), symlinked to `/usr/local/bin/ffmpeg` |
| n8n Pro API | `N8N_BASE_URL` is **unset** in this environment, so no API access. Any workflow ships as an importable `n8n/*.json` plus a HANDOFF step |
| Skills loaded in-session | `hackathon-win`, `dataviz`, `anthropic-skills:ui-demo`, `anthropic-skills:make-interfaces-feel-better`, `anthropic-skills:accessibility`, `anthropic-skills:web-design-cheatcode` |
| Skills missing → fallback | `impeccable`, `emil-design-skills:animate` (+ `emil-design-eng`), taste-skill: cloned to `/tmp/skills` per CLAUDE.md *Fallbacks* and read from source. `hypersite` is in none of the fallback repos, so its role (landing surfaces) is covered by impeccable + taste-skill + `web-design-cheatcode` |

## Log

- **Wed Sep 23 10:35 PM EDT (169 h left):** Session start. Read CLAUDE.md, HACKATHON.md, PROMPT.md, hackathon-win SKILL + references + templates. Created PROGRESS.md. Tool check done (table above).
