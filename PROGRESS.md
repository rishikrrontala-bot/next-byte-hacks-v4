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
| 2. Research (verify event, 5–8 winners, brief) | part of buffer | 3 h | Thu Sep 24 02:00 | ✅ (search-index only, see log) |
| 3. Concept (3 × rubric, pick, CONCEPT.md pushed) | part of buffer | 1 h | Thu Sep 24 03:00 | ✅ Still Standing |
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
- **Wed Sep 23 10:47 PM EDT (~169 h left):** Phase 2 research done. **Blocker found and worked around:** the environment's egress policy blocks devpost.com, youtube.com, huggingface.co, jsdelivr, unpkg, wikipedia, usgs.gov and most hosts, for curl *and* WebFetch. WebSearch (server-side) works, so all research went through the search index; every brief states that verification level. Prior Next Byte editions (Jan '26, V2, V3) exist but their winners aren't indexed, so the 7 briefs are same-domain winners (Gemini API Dev Competition ×4, TreeHacks 2025 ×2, Congressional App Challenge 2025 ×1). Wrote `research/winners/*.md`, `research/RESEARCH-BRIEF.md`, verification note in HACKATHON.md. Reachable hosts: npm, PyPI, Google Fonts, storage.googleapis.com, raw.githubusercontent.com. Found real ground-motion records on PyPI (USGS gmprocess: Ridgecrest 2019 raw CSMIP/SCSN; pystrata: Kobe 1995 PEER NGA).
- **Wed Sep 23 11:05 PM EDT (~168.7 h left):** Phase 3 done. Siblings: none claimed. Scored three concepts in `research/CONCEPTS.md`: **A · Still Standing** (earthquake building sandbox on real records) 4.63, C · Keep Pace (CPR webcam) 4.00, B · Brake Point (stopping distance) 3.88. Picked A. Prototyped its riskiest unknown first (`research/prototype/proto.py`): real Kobe + Ridgecrest records, site response, bilinear MDOF. Soft lakebed triples peak drift and peaks near T≈T_site with no tuning. `CONCEPT.md` pushed. **Rishik asked (11 PM): save everything by 11:20 PM ET** → every step is pushed as it lands.
