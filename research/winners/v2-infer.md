# Infer — Next Byte Hacks V2, Second Place Overall

**Submission:** https://devpost.com/software/infer-ai-powered-a-b-testing-causal-inference-platform-zmvqrl  
**Event gallery:** https://next-byte-hacks-v2.devpost.com/project-gallery  
**Demo embedded on submission:** https://www.youtube.com/watch?v=8UpU0YY11KU  
**Verification:** The submission page loaded and explicitly states “Winner Second Place Overall.” A YouTube iframe is present, but its video could not be loaded; duration, opening 15 seconds, narration, and recorded functionality are unverified.

## Pitch and visible work

The author describes product managers waiting days for routine experiment analysis, then getting only a basic p-value. Infer accepts an experiment CSV, runs several statistical analyses, and presents a plain-language business recommendation. The page shows labeled images for its upload, configuration, dashboard, segment, and chat surfaces. The described stack is Python/FastAPI with NumPy, SciPy, Pandas, React, and a Groq/Llama language layer. The author says the product was built solo in ten days; this was not independently verified from commits.

## Judge-facing moment

**Inferred from the submission, not the unviewed demo:** upload real experiment data and get a recommendation that names which user segment should receive a change.

## Transferable signal

The core transformation is easy to explain before the advanced details: CSV in, decision out. The deeper statistical methods provide technical depth only because they visibly support that decision.
