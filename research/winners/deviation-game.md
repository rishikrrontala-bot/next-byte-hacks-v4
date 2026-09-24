# Winner brief: Deviation Game (formerly Outdraw.AI)

**Hackathon:** Gemini API Developer Competition, 2024 (Google) · **Prize won:** Most Creative App
**Submission URL:** https://ai.google.dev/competition/projects/outdrawai · **Repo:** none public found · **Demo video:** listed on the competition page (not played: YouTube blocked in this session)
**Corroborating sources:** MIT Media Lab post "Deviation Game (Outdraw AI) wins Most Creative App" (https://www.media.mit.edu/posts/deviation-game-outdraw-ai-wins-most-creative-app/), Google Developers Blog winners post (https://developers.googleblog.com/en/announcing-the-winners-of-the-gemini-api-developer-competition/), Siliconera (https://www.siliconera.com/outdraw-ai-pits-human-art-against-ai-drawings/)
**Verified:** page loaded ☐ (egress-blocked; confirmed via search index) · prize stated on page ☑ (MIT Media Lab + Google, as indexed) · video played ☐

## Pitch (as indexed)
> A human vs AI party game for 2–6 people where players take turns drawing prompts in ways only humans can decipher, but an AI can't.

The MIT Media Lab framing: the game "flips Alan Turing's 1950 Imitation Game on its head", so players try to fool the AI instead of the AI fooling them.

## The wow moment
The inversion itself. You draw "cat" so that your friends get it and the model doesn't, and the model's guess plus a one-line explanation of its reasoning is revealed live. Timestamp unknown (video not playable here).

## Demo teardown
- Length: unknown
- First 15 seconds show: unknown
- Narrated? Captioned? Live or recorded? unknown
- Real data or hardcoded? Real: every drawing goes to Gemini 1.5 Pro image recognition.

## Scope reality
- Features shown working: the full round loop (prompt pick → draw → humans + AI guess → win/lose).
- Features only described: Steam release "Q1 2025" (it later shipped on Steam as Deviation Game).
- Repo commit window: not checked.

## Stack
Gemini 1.5 Pro (image recognition only). The stack is **not** the story; the game mechanic is. The team deliberately used AI for one narrow job.

## Submission page shape
Not viewable (egress-blocked).

## Why this won (one sentence)
A single, instantly legible mechanic that only exists because of AI, played by humans against the model, so the judge understands and enjoys it within one round.

## Transferable to us
- **Copy:** one mechanic, explainable in a sentence, where the technology is what makes the game possible rather than a feature bolted on. Show the machine's reasoning to the player.
- **Don't copy:** the AI-guessing-game genre itself; drawing-vs-AI is now a known format.
