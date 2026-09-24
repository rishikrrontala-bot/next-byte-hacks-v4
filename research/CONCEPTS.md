# Concepts: three scored against the Next Byte Hacks V4 rubric

*Wed Sep 23, 2026, 11:00 PM EDT. Rishik delegated the pick for this cloud run (CLAUDE.md, "Override to the hackathon-win skill"). Evidence: `RESEARCH-BRIEF.md`.*

## Overlap check
`bash scripts/siblings.sh` (run 10:40 PM EDT): **no sibling entry has claimed a concept yet** (all 14 print "no concept claimed yet"). Checked against Rishik's past projects in HACKATHON.md as well. Each concept notes its nearest neighbour.

## Rubric
Four published criteria, **no weights published → 25 % each** (HACKATHON.md). Scores are 1–5; weighted total = mean.

| Criterion (25 %) | A · Still Standing | B · Brake Point | C · Keep Pace |
|---|---|---|---|
| Creativity | **5** | 4 | 4 |
| Technical Execution | **5** | 3 | 4 |
| Design & UX | **5** | 4 | 3 |
| Impact | 3.5 | 4.5 | **5** |
| **Weighted total** | **4.63** | 3.88 | 4.00 |

## A · Still Standing: hit your own building with a real earthquake ✅ PICKED

**Pitch.** Design a building, then hit it with a real recorded earthquake. Still Standing runs the same kind of time-history analysis structural engineers use, live in your browser, on real ground-motion records, so you find out for yourself why the 1985 Mexico City quake brought down mid-rise buildings while their shorter and taller neighbours stood.

**Wow moment.** A skyline of buildings from 3 to 30 stories on soft lakebed soil takes the same real earthquake, and the ones whose natural period matches the ground's fall while the rest sway and survive. Then the player saves their own tower by changing one thing (height, stiffness, a tuned mass damper) and watches the drift meters drop.

**Why it scores**
- *Creativity 5:* not a quiz or a chatbot. A physics sandbox where the "enemy" is a real seismogram and the puzzle is resonance. No student-hackathon winner we found does this.
- *Technical 5:* real signal processing (raw CSMIP accelerograms → baseline correction → band-pass → integration), 1-D site response through a soil column (FFT transfer function), a multi-storey nonlinear shear-building solver, response spectra. All pure TypeScript, unit-tested against closed-form solutions, running live at 60 fps. The "how did a student build that" reflex from Jayu/HawkWatch.
- *Design 5:* the subject has a strong native visual language (drum seismographs, smoked paper, structural drawings) and a built-in dramatic moment (collapse).
- *Impact 3.5:* 143 million Americans live where damaging shaking can happen (USGS, 2015). Resonance and site amplification are the ideas behind every modern building code, and they're usually taught with a formula, not a feeling. Useful to physics and earth-science classes (wave resonance, engineering design). Impact is indirect (education, not rescue), hence 3.5.

**Riskiest technical unknown.** Whether real records + a simple, defensible structural model reproduce the resonance effect clearly, with no hand-tuning. → **Prototyped before committing** (see the prototype note in `CONCEPT.md`).
**Data risk: resolved.** Real public records reachable here through PyPI: 2019 M7.1 Ridgecrest (raw CSMIP/SCSN V1 files for three stations, bundled in USGS `gmprocess`), and 1995 M6.9 Kobe at Nishi-Akashi (PEER NGA file, bundled in MIT-licensed `pystrata`).
**Cut first if time runs short:** tuned-mass-damper and base-isolation add-ons → sound → level progression (keep sandbox + skyline).
**Nearest neighbour:** *Shade Debt* (satellite heat mapping) and *Habitat Pulse* (dashboard) share "science + real data" but not form: this is a game with a physics engine, not a map or dashboard. The siblings' lanes (SDG 11 in `acodemic-hackathon`, "delightful web experience" in `firstcommit`) could brush against it, and this CONCEPT.md claims it first.

## B · Brake Point: your reaction time, your stopping distance

**Pitch.** A driving game that measures *your* reaction time, then replays the same street at 25, 35 and 45 mph to show where you'd have stopped, and how hard you'd have hit the kid chasing a ball if you didn't. Stopping-distance physics plus the AAA Foundation's pedestrian injury-risk curves (Tefft, 2011).

**Wow moment.** "At 35 mph with your 0.9 s reaction, you'd have hit her at 21 mph." Personal, visceral, and every judge is 13–18 and about to drive.

- *Creativity 4:* driver-ed simulators exist; measuring the player's own reaction and turning it into a personal outcome is the fresh part.
- *Technical 3:* the physics is short (v·t + v²/2μg). Depth would have to come from 3-D rendering, not the model.
- *Design 4:* strong narrative potential, but a convincing street needs 3-D assets we'd have to author from scratch.
- *Impact 4.5:* motor-vehicle crashes are a leading cause of death for US teens, and speed is the lever.
- **Riskiest unknown:** making a 3-D street look good rather than cheap in a week. **Cut first:** distraction mode.
- **Why not picked:** technically thin for a rubric that weights execution at 25 %, and its look depends on 3-D art we can't source.

## C · Keep Pace: hands-only CPR, scored by your webcam

**Pitch.** Push on a pillow in front of your webcam; on-device pose tracking measures your compression rate against the 100–120/min guideline while a stranger's heart visibly holds on. Teaches hands-only CPR, the thing bystanders most often don't do.

**Wow moment.** You're doing compressions on a cushion and the game counts them live.

- *Creativity 4 · Technical 4 · Impact 5.*
- *Design & UX 3:* the wow needs a live human on camera. This build runs unattended, so **the demo video could not show it** (no footage of a person, and we won't fake it). Judges also have to grant camera permission and find a cushion before anything happens.
- **Riskiest unknown:** rate accuracy from 2-D pose; depth is not measurable from a webcam (it would be a stated limitation).
- **Nearest neighbour:** *Baseline* (Rishik's webcam oculomotor screener) is the same technique family, and `univabio` is a health lane.
- **Why not picked:** its best moment can't be demonstrated in the video this session must produce, and the video is the judges' primary contact.

## Decision
**A · Still Standing** (4.63). It's the highest scorer and the only one where every criterion is ≥ 3.5 *and* the wow can be shown in a recorded demo. Its weakest criterion (Impact) gets deliberate work: plain-language framing, classroom use, citations, and a "what this means for your building" close, with no overclaiming.

### Pre-mortem: "it's judging day and we lost. Why?"
| Likely reason | Counter-move |
|---|---|
| Judges didn't get "period" or "drift" | Plain words everywhere ("how far each floor leans"); the skyline shows it before any label does |
| Looked like an engineering tool, not a game | Levels with a goal and a budget, a big collapse moment, a shareable result |
| Impact felt abstract | Open with Mexico City 1985 (a real, verified pattern); end with what it means for the building you're sitting in |
| Broke live | Static, no keys, precomputed nothing: the physics runs client-side. Fallbacks and e2e tests on the demo path |
| Strong in ways nobody could see | The video shows the seismogram, the soil amplification and the drift meters working, not the code |
