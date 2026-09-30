# Sightline submission checklist

**Event:** [Next Byte Hacks: V4](https://next-byte-hacks-v4.devpost.com/)  
**Binding deadline:** **Wednesday, September 30, 2026 at 11:45 p.m. EDT** (`2026-09-30T23:45:00-04:00`), per the [official schedule](https://next-byte-hacks-v4.devpost.com/details/dates) and event header. The [rules prose](https://next-byte-hacks-v4.devpost.com/rules) says 11:59 p.m.; use the earlier **11:45 p.m.** cutoff.  
**Submit target:** **9:45 p.m. EDT or earlier**, preserving a two-hour buffer.  
**Status snapshot:** September 30, 2026 at 3:27 PM EDT. Checked items mean locally verified or reported by the build lead at this time; they do not imply publication or Devpost submission.

## Ready locally

- [x] Six verified V2/V3 winners, event rules, and concept decision documented in [`research/`](../research/).
- [x] Working Sightline source is present locally. The browser interface connects speed and van-setback controls to one pure geometry and stopping-distance module, with a 3D scene and SVG fallback.
- [x] **Eight unit tests and two browser tests pass** after the final source/configuration changes. The production build passes.
- [x] Five product screenshots and a thumbnail exist under [`submission/gallery/`](gallery/); [captions](gallery/CAPTIONS.md) are drafted.
- [x] [Devpost copy](DEVPOST.md), [demo script](VIDEO-SCRIPT.md), [limitations](../docs/LIMITATIONS.md), and source links are drafted. Media generation and Codex coding assistance are disclosed.
- [x] GitHub authentication has been restored, per the build lead. This is access readiness, not proof of a pushed repository or deployment.

## Still required

- [x] Final demo export: 1:52, 1920×1080 H.264/AAC, 5.67 MB, visible captions and English VTT. Synthetic narration is disclosed. Frames were reviewed and audio levels measured without speaker playback; public playback remains to verify.
- [x] Source, gallery, and media committed as Rishik Rontala and pushed to `main` (`8e0a6e9`). GitHub CI and Pages deployment succeeded.
- [x] [Canonical app](https://rishikrrontala-bot.github.io/next-byte-hacks-v4/) verified in a fresh browser: HTTP 200, default 31.5 m short, More room 19.7 m remaining, correct settings, no browser errors, no horizontal overflow at 375 px. Keyboard controls and reduced-motion fallback were verified locally.
- [x] [Public demo page](https://rishikrrontala-bot.github.io/next-byte-hacks-v4/demo.html) verified without sign-in: actual muted playback advanced; metadata confirms 112 seconds and 1920×1080; English VTT returns HTTP 200. Upload to YouTube/Vimeo only if needed for a native Devpost embed.
- [ ] Upload the five gallery images with their captions to Devpost. Keep the hero image labeled as a generated editorial illustration.
- [ ] Check the account meets V4's student, US, and age 13–18 eligibility; identify **Rishik Rontala** as the solo builder. The user supplied a registered Devpost page, but this checklist has not verified the signed-in account.
- [ ] Final-review the submission preview: problem, working interaction, tech stack, public repo, verified live and video links, limitations, creator credit, AI/media disclosure, and any eligible prize selections.
- [ ] **Submit on Devpost by 9:45 p.m. EDT September 30.** Confirm the platform shows the completed submission and save its URL. The hard cutoff is 11:45 p.m. EDT.

**Current publication status:** the app and captioned demo are public and verified. **Devpost has not been submitted.**
