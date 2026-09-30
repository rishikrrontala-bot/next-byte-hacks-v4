# Sightline limitations

Sightline is an **educational comparison**, not a traffic engineering assessment, crash prediction, legal parking rule, or instruction that a crossing is safe to use. A positive margin means only that the model's available visibility distance exceeds its modelled stopping distance under the stated assumptions. It does **not** mean a real driver will see, react, stop, or yield in time.

## What the model fixes

- The road is straight and level. The crosswalk is at x = 0; one driver approaches along y = 0; one stationary pedestrian waits at (0, 4.8). These are **plan-view coordinates**, not surveyed lane dimensions or eye heights.
- One parked van is a six-metre rectangle from x = −setback − 6 to x = −setback and y = 0.9 to 4.3. The user varies only speed and setback from 5 to 40 m. Van shape, pedestrian position, driver path, and all other geometry remain fixed.
- Visibility is a straight line segment intersecting that rectangle. A line grazing an edge counts as blocked. The model has no 3D eye-height, vehicle-window, body-position, or camera-occlusion analysis, even if the teaching scene is rendered in 3D.
- The search covers the final 120 m of approach at 0.1 m intervals, with binary refinement at the blocked-to-clear boundary. At small setbacks the pedestrian can be briefly visible far away, become hidden, then reappear. Sightline reports the **final reveal that stays clear** as the driver approaches, rather than counting that earlier glimpse as usable continuous visibility.
- Speed is treated as constant until braking starts. The stopping calculation is `distance = v × 2.5 s + v² / (2 × 3.4 m/s²)`, where `v` is the selected mph converted to m/s. The 2.5 s reaction and 3.4 m/s² deceleration are [FHWA design assumptions](https://www.fhwa.dot.gov/publications/research/safety/04091/03.cfm), not a measurement of a particular person or vehicle.

## What it cannot tell you

- It does not use a real crossing, site survey, measured parking pattern, crash record, speed sample, or pedestrian count. It has not been tested with users and has no evidence of safety outcomes or adoption.
- It does not model the time the pedestrian needs to enter or cross, acceleration, driver attention, distraction, yielding behavior, reaction-time variation, tire condition, grade, road friction, weather, darkness, glare, curvature, multiple lanes, other vehicles, signals, curb extensions, or actual sign and marking placement.
- The 5–40 m slider range is an illustrative exploration range, **not** a recommended parking setback. The [FHWA guide for uncontrolled crossings](https://www.fhwa.dot.gov/innovation/everydaycounts/edc_5/docs/STEP-guide-improving-ped-safety.pdf) discusses parking restrictions, sight distance, and context-specific setbacks; this simulator cannot replace its field assessment or local standards.
- Its margin is a distance comparison, not a probability of collision, risk score, legal compliance finding, or recommended speed. Conditions outside this single scenario may change the result substantially. NHTSA advises drivers to slow down and look for pedestrians, and warns that another vehicle can obstruct the view of someone at a crossing. [NHTSA pedestrian safety guidance](https://www.nhtsa.gov/road-safety/pedestrian-safety).

## Media and build provenance

The hero crossing image was **generated with OpenAI image generation** as an editorial illustration. It does not depict a real location or provide evidence for the calculation; see [image attribution](../public/images/ATTRIBUTION.md). The interactive diagram is a representation of the disclosed geometry.

Sightline is built by Rishik Rontala with coding assistance from **OpenAI Codex**. The browser calculation is deterministic; no generative AI produces the displayed distances. No user accounts, analytics, location collection, or stored personal data are part of the current product brief.
