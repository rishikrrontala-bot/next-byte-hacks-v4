# Winner briefs: how these were verified

**Read this first.** This cloud session's network egress policy blocks `devpost.com`, `*.devpost.com`, `youtube.com`, `google.com`, `wikipedia.org` and most other hosts, for both `curl` and WebFetch (every attempt returned `EGRESS_BLOCKED` / `connect_rejected`; logged in `PROGRESS.md`). The only research channel that worked was **WebSearch**, which runs server-side and returns the search engine's index of each page.

So every brief below was verified to this bar, and no higher:

| Check | How |
|---|---|
| The project and its prize exist | At least one search result **from the awarding organisation or a first-party outlet** (Google's own blogs, the Stanford Daily, a Member of Congress's press release, MIT Media Lab) states the project name and the prize. |
| Pitch wording | Taken from the indexed page text as the search engine returned it. Where I could not see the verbatim first two sentences, the brief says so instead of inventing them. |
| Demo video | **Not played.** YouTube is blocked here. Video URLs are listed so Rishik can watch them. |
| Repo commit window | **Not checked.** Out of scope for this session's GitHub access. |

Checkboxes in each brief are ticked only for what was actually confirmed. Nothing here comes from memory alone.

## Prior editions of this exact event

Next Byte Hacks has run at least three earlier editions on Devpost, all indexed by the search engine:

| Edition | URL | Dates (from index) |
|---|---|---|
| Next Byte Hacks: January 2026 (also indexed as "Winter Hacks 2025") | https://next-byte-january-2026.devpost.com/ | Jan 15 – Feb 2026 |
| Next Byte Hacks V2 | https://next-byte-hacks-v2.devpost.com/ | May 1 – May 31, 2026 ($100 cash prize to the winning project, per index) |
| Next Byte Hacks V3 | https://next-byte-hacks-v3.devpost.com/ | Jun 15 – Jul 30, 2026 |

**Their winners are not in the search index** (twelve different queries: `site:devpost.com/software`, "Submitted to …", "Winner", gallery URLs, YouTube, LinkedIn). The only indexed submission from any edition is *Clause Spot* (a V2 entry that highlights risky contract clauses, YouTube video dated May 22, 2026); nothing indexed says whether it placed, so **it is not used as a winner**.

That leaves the skill's fallback order: same organiser (no other events found) → same sponsors (none listed) → **same-domain winners**. The seven briefs below are same-domain: playful or interactive software with a real-impact angle, built by students or small teams, 2024–2026.

| # | Project | Prize | Brief |
|---|---|---|---|
| 1 | Deviation Game (formerly Outdraw.AI) | Gemini API Developer Competition 2024: **Most Creative App** | [deviation-game.md](deviation-game.md) |
| 2 | Vite Vere | Gemini API Developer Competition 2024: **Most Impactful App** | [vite-vere.md](vite-vere.md) |
| 3 | Jayu | Gemini API Developer Competition 2024: **Best Overall App** | [jayu.md](jayu.md) |
| 4 | Gaze Link | Gemini API Developer Competition 2024: **Best Android App** | [gaze-link.md](gaze-link.md) |
| 5 | HawkWatch | TreeHacks 2025: **Grand Prize** | [hawkwatch.md](hawkwatch.md) |
| 6 | HiveMind | TreeHacks 2025: **Grand Prize in Education** | [hivemind.md](hivemind.md) |
| 7 | Swell | 2025 Congressional App Challenge, Ohio's 14th district: **1st place** | [swell.md](swell.md) |

**Rishik, before judging day:** if you can open Devpost, spend 10 minutes on `https://next-byte-hacks-v3.devpost.com/project-gallery` and `…-v2…` and note the three winners of each. They are the strongest signal available and this session could not reach them. (Listed in `HANDOFF.md` as optional.)
