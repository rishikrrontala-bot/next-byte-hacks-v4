# Winner brief: Gaze Link

**Hackathon:** Gemini API Developer Competition, 2024 (Google) · **Prize won:** Best Android App
**Submission URL:** https://android-developers.googleblog.com/2024/11/gaze-link-wins-best-android-app-gemini-api-developer-competition.html (Google's write-up) · **Repo:** not checked · **Demo video:** not located
**Verified:** page loaded ☐ (egress-blocked; confirmed via search index) · prize stated on page ☑ (title of Google's own post) · video played ☐

## Pitch (as indexed from Google's post)
> A communication system for individuals with ALS who develop severe motor and verbal disabilities, enabling them to type sentences with only their eyes.

## The wow moment
The user gazes out three keywords ("hot AC two"), and the app expands them into a full sentence in context ("I am hot, can you turn the AC down by two degrees?").

## Demo teardown
- Unknown (video not located / blocked)
- Real data or hardcoded? Real camera input (ML Kit face detection) + Gemini 1.5 Flash.

## Scope reality
- Shown working: eye-gaze typing + sentence expansion in English, Spanish and Chinese.
- Described only: more languages, multimodal context.

## Stack
ML Kit Face Detection on-device + Gemini 1.5 Flash. On-device sensing plus a small, well-aimed model call.

## Submission page shape
Not viewable.

## Why this won (one sentence)
A specific, severe human constraint, and a demo where one example sentence makes the payoff obvious in five seconds.

## Transferable to us
- **Copy:** one concrete before→after example that carries the whole pitch; on-device sensing.
- **Don't copy:** webcam eye-tracking. Rishik's past *Baseline* already used webcam oculomotor tracking.
