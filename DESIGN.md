# Sightline design contract

## Visual world

The interface feels like a street-safety exhibit edited by a design studio: precise road-survey lines, large quiet fields, and one cinematic street model. Its claim is legibility, not catastrophe. **Variance 8, motion 8, density 3.** The hero is artistically asymmetric and the simulator owns the visual center of the page.

## Palette

- Chalk `#F4F1EA` — primary paper surface and light text on asphalt.
- Asphalt `#171A19` — ink, dark stage and strongest text.
- Warm gray `#D8D4CA` — restrained secondary paper.
- Muted graphite `#5B605E` — secondary text on light surfaces.
- Marker orange `#C65A36` — the single accent, used for active measurement and action. Saturation stays below 80%.

No pure black, electric purple, gradient text or neon glow. A visible obstruction or alert can use the same orange at higher opacity; it is still one accent.

## Typography

Self-host **Satoshi Variable** for display and body, **JetBrains Mono** for measurements and compact labels. The display stops at 6rem, tracks no tighter than -0.04em and gets a broad measure. Body copy stays within 65–75 characters. Two families total.

## Layout and components

1440px maximum stage width; 8px spacing scale. Hero text sits left while a real generated street photograph occupies a separate right/lower zone. The heading uses one inline street crop as punctuation. The interactive diorama and controls form a clear large/small split. Later chapters alternate between a pinned explanation, a horizontal scenario accordion, and a quiet evidence/limitations section. No nested cards, equal three-card feature rows, sticker badges or meta-labels. Mobile becomes one column at 768px with the scene first and controls directly below. All controls have at least 44px targets.

## Motion

The two page-wide scroll behaviors are a pinned explanation chapter and a scrubbed text reveal. Their purpose is to keep the safety relationship visible while the explanation unfolds. The diorama's movement is functional feedback from the controls. A small source strip may scroll continuously only if it improves orientation, and is static under reduced motion. Everything important is readable without movement. UI transitions use transform/opacity under 300ms; interaction controls do not wait for animation.

## 3D

One role: **hero object**, an interactive street diorama that is the product itself. Lazy-mount it, cap device pixel ratio at 2, position the camera correctly on frame zero, and provide a still 2D diagram for reduced motion, absent WebGL and low-power devices. No generic sphere or decorative torus.

## Media

The hero photograph is a generated editorial illustration of a school crossing, not evidence of a real crossing. The rest of the visual material comes from the actual model. Caption it honestly. No placeholder image service.

## Browser details and bans

Selection, caret, focus ring, range inputs, scrollbars and link underlines use the palette. Every button and control has visible hover/focus/active/disabled states. No emoji, no Inter, no custom cursor, no filler copy, no fake metrics or testimonials.
