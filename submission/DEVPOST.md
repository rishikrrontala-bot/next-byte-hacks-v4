# Sightline — Devpost submission draft

**Project name:** Sightline  
**Tagline:** See what a parked vehicle hides at a school crossing.

## Inspiration

A crosswalk marking cannot make a waiting pedestrian visible through a parked vehicle. [NHTSA warns that other vehicles can obscure people at crossings](https://www.nhtsa.gov/road-safety/pedestrian-safety), and [FHWA recommends protecting sight distance near uncontrolled crossings](https://www.fhwa.dot.gov/innovation/everydaycounts/edc_5/docs/STEP-guide-improving-ped-safety.pdf). I wanted to make that hidden distance something a student could see and change.

## What it does

Sightline is an interactive school-crossing model. Change an approaching vehicle's speed and a parked van's distance from the crosswalk. The scene shows where the waiting pedestrian becomes continuously visible; a measured trace compares that distance with reaction travel and braking distance. The signed margin updates from the same calculation that drives the visual explanation.

## How I built it

I modeled the driver, pedestrian, crosswalk, and van in a fixed 2D plan view. A line-segment/rectangle test finds where the van stops blocking the driver's sightline. The stopping model uses a 2.5-second reaction time and 3.4 m/s² design deceleration from [FHWA's stopping-sight-distance guidance](https://www.fhwa.dot.gov/publications/research/safety/04091/03.cfm). A pure TypeScript module calculates both values for the browser interface and 3D teaching scene. The focused tests cover geometry, formulas, input bounds, and the effect of both controls.

## Challenges

At short setbacks, the pedestrian can be visible far away, disappear behind the van, then reappear. Reporting the earliest glimpse would misleadingly imply a long continuous view. The model therefore reports the final blocked-to-clear transition on approach. The visual scene must explain that behavior without making its simplified geometry look like a real-street safety verdict.

## Accomplishments

The two controls drive one deterministic calculation, so the 3D street, SVG fallback, distance breakdown, and result describe the same scenario. The default case shows a 31.5 m modelled shortfall; **More room** shows 19.7 m remaining after changing both speed and setback. Eight unit tests and two browser tests passed locally. These checks verify the app's intended behavior, not a real crossing's safety.

## What I learned

Separating visibility and stopping distance makes their different causes clear. More setback changes the available view; more speed increases reaction travel and increases braking distance even faster. A polished picture is most useful when every marker corresponds to a stated calculation.

## Limitations and next steps

Sightline is an educational model, **not** a traffic-engineering assessment or crash prediction. It assumes a straight, level road, one stationary pedestrian, one rectangular van, and fixed FHWA design parameters. I have not surveyed a real street, validated the results with field data, tested it with users, or measured any safety impact. A next step would be to review the explanation with educators and traffic engineers before considering more complex scenarios. Full assumptions are in [LIMITATIONS.md](https://github.com/rishikrrontala-bot/next-byte-hacks-v4/blob/main/docs/LIMITATIONS.md).

## Built with

TypeScript, React, Vite, React Three Fiber/Three.js, GSAP, CSS, Vitest, and Playwright. The browser calculation is deterministic; there is no user account or runtime AI dependency.

## Links to verify before submission

- **Live app, verified without sign-in:** https://rishikrrontala-bot.github.io/next-byte-hacks-v4/
- **Public demo, playback verified without sign-in:** https://rishikrrontala-bot.github.io/next-byte-hacks-v4/demo.html
- **Repository:** https://github.com/rishikrrontala-bot/next-byte-hacks-v4

The self-hosted demo page is a link. If Devpost requires a YouTube or Vimeo URL for its native video embed, add that verified public or unlisted URL before submitting.

## Code, creator, and media

Built by **Rishik Rontala**, solo, with coding assistance from **OpenAI Codex**. The hero crossing image was generated with **OpenAI image generation** as an editorial illustration, not as a real-street photograph or model input. The demo uses an actual browser recording with synthetic narration generated with macOS Samantha; that voice is not presented as Rishik's. See [media attribution](https://github.com/rishikrrontala-bot/next-byte-hacks-v4/blob/main/public/images/ATTRIBUTION.md). Recheck this disclosure against the final exported video before pasting.
