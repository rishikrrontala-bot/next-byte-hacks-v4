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

## ▶ Resume here (for a fresh session)

Concept is locked: **Still Standing** (`CONCEPT.md`). Next unchecked phase is **4 → 5**. Setup a new session needs:

1. `pip install imageio-ffmpeg numpy scipy && ln -sf "$(python3 -c 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())')" /usr/local/bin/ffmpeg`
2. Design skills fallback: `mkdir -p /tmp/skills && cd /tmp/skills && git clone --depth 1 https://github.com/pbakaus/impeccable && git clone --depth 1 https://github.com/emilkowalski/skills emil-skills && git clone --depth 1 https://github.com/leonxlnx/taste-skill`
3. Real records (egress only allows PyPI/npm): `pip download --no-deps gmprocess==2.8.0 pystrata==0.5.4 --no-binary pystrata -d /tmp/w` then take `gmprocess/data/demo/ci38457511/raw/{CICCC.RAW,CICLC.v1,CITOW2.RAW}` (CSMIP V1 text, 100 sps, g, 3 channels each) and `pystrata-0.5.4/tests/data/NIS090.AT2` (PEER AT2, dt 0.01, g). The parsing/processing reference implementation is `research/prototype/proto.py`.

Build plan (Phase 5), in order:
- **Stack:** Vite + TypeScript + Preact (+ signals), `base: './'`, Vitest, Playwright (Chromium at `/opt/pw-browsers`), fonts via `@fontsource/*` (no CDN: jsDelivr/unpkg are egress-blocked).
- **`scripts/build-records.ts`** (Node, run once, output committed): parse V1/AT2 → detrend, 5 % Tukey taper, 4th-order Butterworth band-pass 0.1–25 Hz zero-phase → trim by Arias 5–95 % ± pads → `src/data/records/*.json` with provenance (event, station, channel, agency, source package, license).
- **`src/physics/` (pure, Vitest):** `fft.ts`, `filters.ts`, `site.ts` (transfer fn H=1/(cos k*H + iα* sin k*H)), `building.ts` (uniform shear building, k from T1 via ω1 = 2√(k/m)·sin(π/(2(2N+1))); bilinear storeys; Rayleigh ζ=5 %; explicit central difference with substeps; TMD = extra DOF at roof, Den Hartog tuning; base isolation = extra DOF at base), `spectrum.ts` (PSA via Nigam–Jennings or Newmark), `damage.ts` (FEMA 356 typical drifts: concrete frame 1/2/4 %, steel MRF 0.7/2.5/5 %, braced 0.5/1.5/2 %, walls 0.5/1/2 %). Tests against closed-form: uniform-shear-building eigenvalues, SDOF free vibration decay, resonance amplification 1/(2ζ), transfer-function peak at T=4H/Vs.
- **UI:** skyline (wow) → "your building" level → sandbox, seismogram strip, spectrum chart with building period marker, share-by-URL, reduced-motion, keyboard, 375 px.
- Then Phases 6–9 per the table above.

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
