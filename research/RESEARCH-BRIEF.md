# Research brief: Next Byte Hacks V4

*Written Wed Sep 23, 2026, 10:50 PM EDT, ~169 h before the deadline. Sources and verification limits: see [`winners/README.md`](winners/README.md). Short version: Devpost and YouTube are egress-blocked in this session, so every fact below came through the search engine's index, and each one is cited.*

## 1. The target

| | |
|---|---|
| Event | Next Byte Hacks: V4, https://next-byte-hacks-v4.devpost.com/ |
| Organiser | "Next Bytes", a student-run group that has run the series since at least January 2026 (Jan '26, V2 May '26, V3 Jun–Jul '26) |
| Format | Online; build from scratch during the event; open-source libraries/templates allowed but "the main work must be done during the event" (V3 rules, as indexed) |
| Eligibility | Ages 13–18, students only, US residents (HACKATHON.md, read from the live page on Sep 23) |
| Theme | "Build bold, ship fast": web app, mobile app, game, hardware hack "or anything in between" (V4 index text) |
| Prizes | 1st $50 · 2nd $25 · 3rd $25 · digital certificate for every submitter |
| Deliverables | Devpost description + technologies · public repo · demo video or screenshots "strongly encouraged". Earlier editions asked for a 1–3 min video and 2–3+ screenshots (January 2026 edition, as indexed) |
| Judging | Creativity · Technical Execution · Design & User Experience · Impact. **No weights published → equal, 25 % each** |
| Judges | Not listed anywhere in the index. With a student organiser and $100 in total prizes, assume **student judges** |

## 2. What the evidence says wins (7 same-domain winners)

| Winner | Prize | Shape (`what-wins.md`) | The one thing a judge remembers |
|---|---|---|---|
| Deviation Game | Gemini comp: Most Creative | Absurd-but-flawless / one-feature killer | You draw to fool the AI; the AI explains its guess |
| Vite Vere | Gemini comp: Most Impactful | Specific personal problem | Photo of a task → steps a person with a cognitive disability follows alone |
| Jayu | Gemini comp: Best Overall | Hard-tech demo | One student's assistant operating a real desktop live |
| Gaze Link | Gemini comp: Best Android | Specific problem + one example | "hot AC two" → a full sentence, typed with the eyes |
| HawkWatch | TreeHacks '25: Grand Prize | Hard-tech, real-time | Watching it catch an incident on live video |
| HiveMind | TreeHacks '25: Education GP | Personal problem | "Students struggling silently", a question every judge has lived |
| Swell | CAC '25 OH-14: 1st | Game + specific audience | Puzzles and games that keep seniors' minds active |

### Problem shape that keeps winning
**A specific group, a specific moment, and a form that's fun to touch.** Every winner names *who* in the first clause (people with ALS, people with cognitive disabilities, seniors, students on Zoom). The playful ones (Deviation Game, Swell) still carry a real-world purpose; the serious ones (Vite Vere, Gaze Link) carry one vivid example.

### Demo shape that keeps winning
**Watch it happen live.** The computation is visible and real-time (HawkWatch's feeds, Jayu's desktop, Deviation Game's live guess), and one concrete before→after carries the pitch (Gaze Link's sentence). None of them lead with architecture.

### Scope ceiling
One core loop, working end to end, with real input. Winners describe more than they show (Deviation Game's Steam launch, Gaze Link's extra languages), and they get away with it because the core loop is flawless. For a one-week online window (`what-wins.md`): one feature done superbly, one supporting feature, a good video, a good page.

### What winners here skipped
- Accounts, logins, dashboards, settings screens
- Broad platforms ("for everyone")
- Architecture diagrams in the pitch
- Feature count: each is remembered for **one** thing

### Visible judge bias
Unknown judges, student-run event, a theme that says "bold". Student judges reward (a) things they can play with in 30 seconds, (b) visible "how did a teenager build that" technical depth, and (c) things that look designed rather than templated. HACKATHON.md's hypothesis ("boldness and a memorable wow moment beat everything else") matches the evidence.

## 3. Rubric, reverse-engineered

| Criterion (25 % each) | What earns a 5 here |
|---|---|
| Creativity | A mechanic judges haven't seen at a student hackathon; not "AI chatbot for X", not a dashboard |
| Technical Execution | Real computation running live in the browser, working on first load, zero errors; visibly harder than a CRUD app |
| Design & UX | First screen explains itself; looks art-directed, not templated; works on a phone; one clear path |
| Impact | Names who it helps and why it matters, with a real, citable number; honest about limits |

## 4. Implications for the concept

1. **Pick a mechanic that's playful and does real work.** A game or toy whose rules are real science, so playing it teaches something true.
2. **Real-time and real data.** The judge should watch a real computation respond to their choices, fed by real recorded data, not canned animation.
3. **One concrete, surprising before→after** that fits in a sentence (Gaze Link's "hot AC two").
4. **Static and instant.** The judge has no key, no account, maybe a phone. Everything on-device, fast first load.
5. **The video matters more than anything else.** Wow in 0–10 s, captioned, 1:30–2:30 (HACKATHON.md).

## 5. Environment constraints that shape the build (discovered in research)

- Egress policy: npm, PyPI, Google Fonts, `storage.googleapis.com` and `raw.githubusercontent.com` are reachable; Devpost, YouTube, Hugging Face, jsDelivr, unpkg, USGS, Wikipedia and most other hosts are **not**. So all dependencies are bundled from npm (fonts via `@fontsource`), and any dataset must come through npm/PyPI.
- Real public ground-motion records **are** reachable through PyPI: USGS `gmprocess` bundles raw CSMIP/SCSN accelerograms from the 2019 M7.1 Ridgecrest earthquake, and the MIT-licensed `pystrata` bundles the PEER NGA record of the 1995 Kobe earthquake at Nishi-Akashi. This decided concept A's data risk (see `CONCEPTS.md`).

## Sources (all through WebSearch; direct fetch egress-blocked)
- Next Byte Hacks editions: https://next-byte-hacks-v2.devpost.com/ · https://next-byte-hacks-v3.devpost.com/ · https://next-byte-january-2026.devpost.com/rules · https://www.startupgrantsindia.com/competitions/next-byte-hacks-v2 · https://www.startupnetworks.co.uk/links/link/30782-next-byte-hacks-v4
- Winners: see each brief in [`winners/`](winners/)
- Mexico City 1985 resonance (6–15-story buildings): https://www.britannica.com/event/Mexico-City-earthquake-of-1985 · https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5146958/
- 143 million Americans exposed to damaging shaking: https://www.usgs.gov/news/featured-story/nearly-half-americans-exposed-potentially-damaging-earthquakes
- FEMA 356 Table C1-3 drift levels (IO 1 % / LS 2 % / CP 4 % for concrete frames; "typical values", not limits): https://www.researchgate.net/figure/Structural-performance-levels-and-drift-Base-on-FEMA-356-Table-C1-3_tbl5_289483459
- ASCE 7 Table 12.8-2 approximate period Ta = Ct·hₙˣ: https://docs.bentley.com/LiveContent/web/RAM%20Structural%20System%20Help-v4/en/GUID-95710510-C41F-4544-91EF-861BF3F6594E.html
