<design_plan>

Python execution using the 62-character brief `Sightline: an interactive school crossing visibility simulator` and `random.Random(62)`:

```text
hero: Artistic asymmetry; font: Satoshi
components: Inline typography images, Horizontal accordions, Infinite marquee
GSAP paradigms: Scrubbing text reveal, Scroll pinning
```

The generated Hypersite direction was deliberately adapted in `DIRECTION.md` to make the product interaction the hero object. The infinitely moving strip is limited to source names, with a static reduced-motion state; it does not add a third page-wide scroll behavior.

**AIDA:** The navigation links to the working simulator; the hero gives attention; the immediate experiment and its result establish interest; the pinned explanation and comparison make the consequence concrete; the closing CTA returns to the experiment.

**Hero math:** H1 uses `max-width: 1050px` (equivalent to Tailwind `max-w-6xl`) and `clamp(3rem, 5vw, 5.5rem)`, constrained to two lines on desktop and three at narrow widths. No floating stamp icon, tag row or raw stats inhabit the hero.

**Bento density:** One evidence grid uses two columns and two rows: A spans columns 1–2 of row 1; B fills column 1 of row 2; C fills column 2 of row 2. The occupied cells equal 2+1+1=4 of 4. It uses `grid-flow-dense`.

**Label and button sweep:** No decorative `SECTION 01`/`QUESTION 05` labels. Primary orange action carries asphalt text at AA contrast; light ghost actions carry asphalt text and dark-stage actions carry chalk text. Focus and disabled states are explicit.

</design_plan>
