# Still Standing

**Design a building. Hit it with a real earthquake. See if it's still standing.**

*Next Byte Hacks V4 entry by Rishik Rontala · concept locked Wed Sep 23, 2026, 11:05 PM EDT · scoring and alternatives: [`research/CONCEPTS.md`](research/CONCEPTS.md)*

## The problem, in one breath
In the 1985 Mexico City earthquake, the buildings that collapsed were mostly **6 to 15 stories tall**; their shorter and taller neighbours mostly stood. Those mid-rise buildings swayed at the same rhythm as the soft old lakebed under them, and resonance tore them apart ([Britannica](https://www.britannica.com/event/Mexico-City-earthquake-of-1985)). That idea, *match the ground's rhythm and you fall*, sits behind every modern building code, and 143 million Americans live where damaging shaking can happen ([USGS](https://www.usgs.gov/news/featured-story/nearly-half-americans-exposed-potentially-damaging-earthquakes)). School teaches it as a formula. Nobody gets to *feel* it.

## What it is
A browser game and physics sandbox. You choose a real recorded earthquake and the ground it hits (rock, stiff soil, or a soft lakebed like Mexico City's), then design a building: how tall, what structural system, and whether to add a tuned mass damper or base isolation. Press **Shake**. The real accelerogram plays; your building sways floor by floor; each floor's lean is measured against engineering damage levels; and it either stays standing or it doesn't. Then you find out *why* on a response-spectrum chart, with your building's period marked on it.

## The wow moment (first 15 seconds of the video)
A skyline of seven buildings, 3 to 30 stories, on soft lakebed soil. One real earthquake. The mid-rise towers whose natural period matches the ground's lean hardest and go red, while the shortest and tallest ride it out. The physics produces this from the recorded data; no animation is scripted.

## Real data, real method
- **Records:** 2019 M7.1 Ridgecrest, California (raw CSMIP/SCSN accelerograms, three stations) and 1995 M6.9 Kobe, Japan (Nishi-Akashi, PEER NGA). Public records, obtained through the USGS `gmprocess` and MIT-licensed `pystrata` Python packages, with provenance in the repo.
- **Processing:** baseline correction, zero-phase Butterworth band-pass, trimming by Arias intensity.
- **Soil:** 1-D linear site response of a damped soil layer on elastic rock (FFT transfer function; Kramer, *Geotechnical Earthquake Engineering*, 1996).
- **Building:** multi-storey nonlinear shear building (bilinear storeys, Rayleigh damping), periods from the ASCE 7 approximate-period formula, damage levels from FEMA 356's typical drift values (1 % / 2 % / 4 % for concrete frames).
- **Everything runs in the browser.** No backend, no API key, no account.

**Prototype check (11:00 PM EDT, before committing):** a Python version of this exact pipeline on the Kobe record gave peak floor lean of 0.4–0.9 % on rock and 1.1–2.8 % on the soft lakebed, highest for buildings whose period sits near the soil's 2 s, with no parameter tuning. The effect is real in the data.

## Who it's for
High-school students and their physics and earth-science teachers first (the judges are 13–18 too), and anyone in a quake zone who has wondered why some buildings fall and others don't. Free, no login, works on a school Chromebook and a phone.

## Judge's demo path (90 seconds)
1. Land on the skyline, press **Shake**. Watch the mid-rises fail. *(wow)*
2. "Your turn": a 12-story tower on the lakebed that collapses.
3. Change one thing (height, system, damper), shake again, and it's **still standing**. The spectrum shows why.
4. Share the design as a link.

## What it won't claim
It's a teaching model, not an engineering tool: it can't assess a real building, and the collapse is a drift threshold, not a structural failure simulation. All of that goes in `docs/LIMITATIONS.md`.

## Cut order if time runs short
Base isolation → tuned mass damper → sound → level progression. The skyline, the sandbox and the spectrum are the core and don't get cut.
