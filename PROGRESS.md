# Sightline progress

## September 30, 2026 — 15:24 EDT

**8 h 21 min remain** to the binding September 30, 23:45 EDT deadline. Submit target: **21:45 EDT or earlier**.

- Existing GitHub repository was a kickoff scaffold, not an implemented product.
- Six verified V2/V3 winners, four official criteria, and three scored concepts documented. Selected Sightline: an interactive crossing-visibility teaching model.
- Finished responsive product, lazy 3D scene and SVG fallback, deterministic geometry/stopping model, scenario sharing, sources, and visible Rishik Rontala credit.
- Production build passes. Eight unit tests and two Playwright browser tests pass. Desktop/mobile and reduced-motion checks completed; no browser errors found in the judge path.
- Five captioned 1500×1000 screenshots plus a thumbnail are ready.
- Final demo is an actual-browser recording: 1:52, 1920×1080 H.264/AAC, 5.67 MB, visible captions plus English VTT, synthetic macOS Samantha narration. Frame checks confirm controls and captions are visible. Audio measured at −17.6 dB mean / −1.9 dB peak without speaker playback.
- GitHub authentication works with the explicit local gh binary outside the network sandbox. Earlier invalid-token results were a sandbox/network limitation.
- Publishing now. Devpost has not been submitted.

## Remaining critical path

1. Push and verify GitHub Pages and CI.
2. Verify logged-out live app and demo playback.
3. Final review and Devpost submission by 21:45 EDT. Native YouTube/Vimeo embed may require an upload from Rishik's account; the public self-hosted demo is also included.

## Publication verified — September 30, 2026 at 3:27 PM EDT

- Product commit `8e0a6e9` is on public `main`. GitHub CI run `36765551342` and Pages deployment run `36765551208` both succeeded.
- Fresh browser verified app HTTP 200, both numeric scenarios, correct controls, 375 px layout, and no page errors.
- Public demo page plays the 112-second 1920×1080 video without sign-in. Captions return HTTP 200. Playback was muted.
- Local servers stopped; ports 5173 and 5174 confirmed free.
- Only final review, any native video embed upload, and the actual Devpost submission remain.
