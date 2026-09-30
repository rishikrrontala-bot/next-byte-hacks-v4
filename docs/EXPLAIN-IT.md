# Sightline: 15 likely judge questions

These are concise answers for explaining the project honestly. Keep the working interaction ahead of the formula when presenting.

1. **What problem does Sightline address?** A marked crossing can still leave a waiting person hidden by a parked vehicle. Sightline makes the distance at which the person becomes continuously visible comparable with the distance needed to stop. [NHTSA describes obstructed pedestrians at crossings](https://www.nhtsa.gov/road-safety/pedestrian-safety).

2. **Who is it for?** Students, parents, and street-safety educators who want to explore that relationship. It is an educational demonstration, not a tool for approving a street design.

3. **What can I do in the demo?** Change vehicle speed and the parked van's setback, then compare the sightline, reaction distance, braking distance, and signed margin. One calculation supplies both the visual and numeric explanation.

4. **What is the technical core?** A deterministic line-segment versus axis-aligned-rectangle intersection test checks whether the van blocks a driver's view of the pedestrian. The calculation is in [`src/lib/sightline.ts`](../src/lib/sightline.ts).

5. **Why model the van as a rectangle?** It makes the obstruction and intersection test transparent and repeatable. Actual vehicles have different sizes, windows, angles, and heights, so this is an abstraction.

6. **What does “first visibility” mean here?** The reported point is where the **final** van occlusion ends on the approach. With a close van, a driver can have a brief distant glimpse, lose sight, then see the pedestrian again. We use the final reveal because visibility stays clear after it.

7. **How do you locate that point?** The code scans from 120 m out to the crosswalk in 0.1 m steps, tests each driver-to-pedestrian segment against the van rectangle, and bisects the last blocked-to-clear interval for a more precise boundary.

8. **Where does stopping distance come from?** It adds `speed × 2.5 s` for reaction travel and `speed² / (2 × 3.4 m/s²)` for braking on a level road. Those are [FHWA design assumptions](https://www.fhwa.dot.gov/publications/research/safety/04091/03.cfm), not observed behavior for every driver.

9. **What does a positive or negative margin mean?** It is `continuous visibility distance − modelled stopping distance`. Negative means the modelled stopping distance is longer than the available continuous view; positive means the reverse. Neither value is a crash probability or a guarantee of safety.

10. **Why do speed and setback change the result differently?** Speed changes reaction travel linearly and braking distance quadratically. Setback changes when the van stops intersecting the line of sight. The two inputs act on different sides of the comparison.

11. **Why use 3D?** The street scene helps visitors see the hidden pedestrian, the first clear line, and the stopping trace as one spatial relationship. The result comes from the 2D math module, not the rendering engine.

12. **Is the crossing based on a real school or street?** No. The geometry is fixed and illustrative. There has been no site survey, measured traffic speed, or location-specific safety assessment.

13. **Does this tell cities how far from a crosswalk to ban parking?** No. The slider is an exploration range, not a prescription. [FHWA guidance for uncontrolled crossings](https://www.fhwa.dot.gov/innovation/everydaycounts/edc_5/docs/STEP-guide-improving-ped-safety.pdf) considers sight distance and context-specific parking restrictions; practitioners must assess an actual location.

14. **What evidence shows it helps people or prevents crashes?** None yet. The calculation has focused geometry and formula tests, but no user study, traffic-engineering validation, deployment impact, or crash-outcome evidence is claimed.

15. **What was AI used for?** Rishik Rontala directed and built the project with coding assistance from OpenAI Codex. OpenAI image generation made the hero editorial illustration. Runtime distances are deterministic and do not depend on an AI model. The illustration is not a photograph of a real crossing.

For full model boundaries, see [LIMITATIONS.md](LIMITATIONS.md). For source and data flow, see [ARCHITECTURE.md](ARCHITECTURE.md).
