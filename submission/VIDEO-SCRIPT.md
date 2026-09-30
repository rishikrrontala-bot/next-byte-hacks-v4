# Sightline demo video script — recorded export 1:52

A 1:52 actual-browser recording is saved in `video/demo.mp4`, exported at 1920×1080 with H.264 video, AAC audio, visible summary captions, and an English transcript in `video/demo.vtt`. The supplied narration uses the macOS Samantha synthetic voice. The lines below are also a script Rishik can record personally. Public hosting is tracked in `CHECKLIST.md`.

Start the capture at the real simulator with no `speed` or `setback` query parameters. The app defaults to **25 mph / 12 m setback**, which displays **31.5 m short**; its **More room** button sets **15 mph / 35 m**, displaying **19.7 m remaining**. These one-decimal values were checked against `computeScenario` and the browser on September 29, 2026.

Record the actual browser interaction in one desktop viewport. Keep the street and result visible together. Use a human voice and readable subtitles; do not start with a title card, logo, loading screen, or unedited scroll from the top. The hero image is a generated editorial illustration, so show its on-page disclosure when it appears.

| Time | Actual screen action and frame | Exact spoken line | On-screen caption / subtitle emphasis |
|---|---|---|---|
| **0:00–0:10** | Open on the simulator at its default 25 mph / 12 m state. Hold the **31.5 m** deficit for two seconds, then click **More room**. Let the street and result settle on **19.7 m** remaining. | “Here, thirty-one point five metres short. More room: nineteen point seven metres remain.” | `31.5 m short` → `19.7 m remaining` · lower caption: `A model comparison, not a real crossing` |
| **0:10–0:23** | Briefly scroll to the hero headline, then down across the crossing illustration and its generated-illustration figcaption. | “The painted crossing is easy to see. A person waiting beside a parked vehicle may not be. Sightline makes that missing view visible.” | `The crossing is marked. The person may be hidden.` |
| **0:23–0:35** | Use **Run the crossing** to return to the simulator and press **Reset**. Show 25 mph / 12 m and the two controls. | “This is an educational street model: one approaching driver, one waiting pedestrian, and one parked van. It is not a survey of a school street.” | `One driver · one pedestrian · one obstruction` |
| **0:35–0:50** | Move **Approach speed** from 25 to 15 mph while keeping **Van setback** at 12 m. Hold the result at **8.6 m short** and the readout at **14.8 m first continuous view / 23.4 m reaction plus braking**. | “First, I lower speed from twenty-five to fifteen miles per hour. The stop distance shrinks, but the view does not change. The model still comes up eight point six metres short.” | `Speed ↓ 25 → 15 mph` · `31.5 m short → 8.6 m short` |
| **0:50–1:04** | Move **Van setback** from 12 to 35 m while speed stays 15 mph. Hold **19.7 m** remaining; show **43.1 m first continuous view / 23.4 m reaction plus braking**. | “Now the van moves farther back. View rises to forty-three point one metres; stopping needs twenty-three point four. The margin is nineteen point seven.” | `Setback ↑ 12 → 35 m` · `19.7 m remaining` |
| **1:04–1:18** | Hold the updated street scene. Point to the legend and the measured line/trace; allow the scene to be read. | “The dashed line shows sight. White marks travel before braking; orange marks braking travel. The diagram and the result use the same calculation.” | `Sightline` · `Reaction travel` · `Braking travel` |
| **1:18–1:31** | Scroll to **Three distances. One decision.** Show the first continuous view, reaction travel, and braking travel panels, with current-case measurements visible. | “Sightline keeps the three distances separate. You can inspect where the person stays visible, how far the vehicle travels during reaction, and how far it travels while braking.” | `First continuous view` · `Reaction` · `Braking` |
| **1:31–1:41** | Scroll to **The model, openly.** Frame the equation and FHWA/NHTSA source links. | “The stop calculation uses Federal Highway Administration design assumptions: two-point-five seconds for reaction and three-point-four metres per second squared for deceleration.” | `FHWA design assumptions` · `2.5 s reaction` · `3.4 m/s² deceleration` |
| **1:41–1:49** | Hold the line “not a site survey or a safety certificate,” then end on the app rather than a synthetic end card. | “There is no real-street survey or user study. This explains a relationship; it cannot certify a crossing safe.” | `Educational model. No field validation or user study.` |

## Recording checks

- Use the real controls and current computed results. Do not splice in fake data, an invented user, or a street photo presented as evidence.
- Keep captions inside the safe area, legible over both chalk and asphalt sections. Record narration on a separate track if available and review the final export muted and with sound.
- If WebGL is unavailable in the recording environment, the app's actual diagram fallback is acceptable; do not imply it is the 3D scene.
- The final upload must be public or unlisted and playable without sign-in, then embedded in Devpost. This document does not assert that an upload or submission exists.
