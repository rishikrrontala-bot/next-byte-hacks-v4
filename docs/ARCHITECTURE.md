# Sightline architecture

Sightline is a browser-based teaching model with a pure numerical core. The interface should use one `computeScenario(speedMph, setbackM)` result for the scene and the text readout, so the picture and numbers cannot diverge. There is no backend, account system, live street feed, or runtime AI in the product brief.

## Calculation boundary

The implementation is in [`src/lib/sightline.ts`](../src/lib/sightline.ts). All geometric distances are metres.

| Element | Model |
|---|---|
| Crosswalk | x = 0 |
| Driver | x moves from −120 toward 0, y = 0 |
| Waiting pedestrian | (0, 4.8) |
| Parked van | x = [−setback − 6, −setback], y = [0.9, 4.3] |
| Setback input | 5–40 m inclusive |

`segmentIntersectsRect` clips the driver-to-pedestrian line segment against the van's axis-aligned rectangle. Edge contact is counted as an obstruction. `findFirstContinuousVisibility` samples driver positions every 0.1 m from −120 to 0 and refines a blocked-to-clear transition by bisection. It uses the final transition because a small setback can produce an early distant glimpse followed by another period of occlusion. The output `visibilityDistanceM` is the distance from the final reveal point to x = 0, capped at the 120 m scan horizon if a future geometry is unobstructed throughout.

## Stopping model

`stoppingDistanceMeters` converts mph to m/s with `0.44704` and returns:

```text
reaction distance = speed (m/s) × 2.5 s
braking distance  = speed² (m²/s²) / (2 × 3.4 m/s²)
stopping distance = reaction distance + braking distance
margin            = continuous visibility distance − stopping distance
```

The reaction and deceleration values come from the [FHWA stopping-sight-distance design table](https://www.fhwa.dot.gov/publications/research/safety/04091/03.cfm). FHWA defines stopping sight distance as the space to perceive, react, and brake. The code uses that simplified, level-road relationship, not FHWA's full site-specific road-design process.

`computeScenario` returns the inputs, speed conversion, both stopping components, total stopping distance, final visibility point and distance, a scan-horizon flag, and signed margin. It does not label a scenario safe or calculate crash probability. Invalid speed or setback input throws a `RangeError`; the UI should keep controls within their declared bounds.

## Presentation boundary

The [product brief](../PRODUCT.md) calls for a public, no-login page with a manipulable street scene, numeric readout, readable assumptions, keyboard controls, and reduced-motion/WebGL fallbacks. The [design direction](../DIRECTION.md) gives the 3D scene one job: illustrate the calculated sightline and stopping trace. Rendering does not determine or alter the numeric result. The generated hero illustration is separate editorial media, not an input image or measured street data.

The focused [Vitest suite](../tests/sightline.test.ts) checks segment/rectangle intersection, edge contact, temporary occlusion, monotonic effects of speed and setback, the FHWA-based formula, and input boundaries. Passing those tests establishes behavior for this idealized geometry; it does not validate the model against real crashes or field observations.

## Evidence and scope

[FHWA's uncontrolled-crossing guide](https://www.fhwa.dot.gov/innovation/everydaycounts/edc_5/docs/STEP-guide-improving-ped-safety.pdf) discusses keeping crosswalk approaches clear of parked vehicles for sight distance. [NHTSA's pedestrian guidance](https://www.nhtsa.gov/road-safety/pedestrian-safety) discusses driver speed, visibility, and obscured pedestrians. These sources motivate the lesson. Neither source endorses Sightline as an engineering instrument. See [limitations](LIMITATIONS.md).
