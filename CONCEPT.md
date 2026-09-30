# Sightline

**One sentence:** An interactive school-crossing simulator that makes an obstructed sightline and stopping distance visible together.

**For:** Students, parents and street-safety educators who want to understand why a marked crossing can still be hard to see from an approaching vehicle.

**Judge path:** Open the page → change speed and the parked vehicle's distance from the crossing → reveal the first visible point and stopping trace → compare with a safer preset → read the model's assumptions.

**Technical core:** A deterministic 2D line-segment/rectangle visibility test searches along an approaching driver's path. A separate stopping model sums travel during a stated 2.5 s design reaction time and braking distance using the FHWA's 3.4 m/s² design deceleration. One calculation powers both the 3D street and the text readout.

**Boundaries:** The scene is an educational model, not a traffic engineering assessment, crash prediction, or driving instruction. It uses fixed, idealized geometry and does not model every pedestrian, vehicle, road grade, weather condition or human response.

**Evidence:** [FHWA speed-management guide](https://highways.fhwa.dot.gov/safety/speed-management/speed-concepts-informational-guide/chapter-4-engineering-and-technical), [FHWA stopping-sight-distance discussion](https://www.fhwa.dot.gov/publications/research/safety/15030/002.cfm), [NHTSA pedestrian safety](https://www.nhtsa.gov/road-safety/pedestrian-safety).
