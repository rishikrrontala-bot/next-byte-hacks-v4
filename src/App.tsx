import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { StreetScene, StreetDiagram } from './components/StreetScene';
import { computeScenario, DESIGN_DECELERATION_MPS2, REACTION_TIME_S } from './lib/sightline';

gsap.registerPlugin(ScrollTrigger);

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={diagonal ? 'M5 19 19 5M8 5h11v11' : 'M4 12h15m-6-6 6 6-6 6'} /></svg>;
}

function round(value: number) { return value.toFixed(1); }

function readInitial(key: string, fallback: number, min: number, max: number) {
  const input = Number(new URLSearchParams(location.search).get(key));
  return Number.isFinite(input) && input >= min && input <= max ? input : fallback;
}

const cases = [
  { name: 'Tight view', speed: 25, setback: 10, description: 'A parked vehicle near the crossing blocks the view until the driver is close.' },
  { name: 'Move the vehicle', speed: 25, setback: 35, description: 'The same speed, with more clear space between the parked vehicle and the crossing.' },
  { name: 'Slow and clear', speed: 15, setback: 35, description: 'A slower approach combined with a farther parked vehicle.' },
] as const;

const story = 'The road available to stop does not begin at the crosswalk. It begins where a person first stays visible.';

export default function App() {
  const [speed, setSpeed] = useState(() => readInitial('speed', 25, 10, 40));
  const [setback, setSetback] = useState(() => readInitial('setback', 12, 5, 40));
  const [activeCase, setActiveCase] = useState(0);
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const lenis = useRef<Lenis | null>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);
  const explanationRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scenario = useMemo(() => computeScenario(speed, setback), [speed, setback]);
  const deficit = scenario.marginM < 0;

  useEffect(() => {
    const url = new URL(location.href);
    url.searchParams.set('speed', String(speed));
    url.searchParams.set('setback', String(setback));
    history.replaceState(null, '', url);
  }, [speed, setback]);

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) return;
    const smooth = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 0.95 });
    lenis.current = smooth;
    smooth.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => smooth.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); smooth.destroy(); lenis.current = null; };
  }, []);

  useLayoutEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const scoped = gsap.context(() => {
      const words = wordsRef.current?.querySelectorAll<HTMLElement>('.story-word');
      if (words?.length) {
        gsap.fromTo(words, { opacity: 0.5 }, {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: { trigger: wordsRef.current, start: 'top 82%', end: 'bottom 46%', scrub: true },
        });
      }
      const media = gsap.matchMedia();
      media.add('(min-width: 900px)', () => {
        if (explanationRef.current && pinRef.current) {
          ScrollTrigger.create({
            trigger: explanationRef.current,
            pin: pinRef.current,
            start: 'top top+=112',
            end: 'bottom bottom',
            pinSpacing: false,
          });
        }
      });
      return () => media.revert();
    });
    return () => scoped.revert();
  }, []);

  const jump = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, target: string) => {
    event.preventDefault();
    const element = document.getElementById(target);
    if (!element) return;
    if (lenis.current) lenis.current.scrollTo(element, { offset: -28 });
    else element.scrollIntoView({ behavior: 'instant' });
    history.replaceState(null, '', `${location.pathname}${location.search}#${target}`);
  };

  const selectCase = (index: number) => {
    setActiveCase(index);
    setSpeed(cases[index].speed);
    setSetback(cases[index].setback);
  };

  const copyScenario = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  };

  return (
    <main className="site-shell overflow-x-hidden w-full max-w-full">
      <a className="skip-link" href="#experiment">Skip to simulator</a>
      <header className="site-header">
        <a className="wordmark" href="#top" onClick={(event) => jump(event, 'top')} aria-label="Sightline, back to top"><span className="wordmark-line" aria-hidden="true" />SIGHTLINE<span className="wordmark-dot">.</span></a>
        <nav aria-label="Main navigation" className="nav-links">
          <a href="#experiment" onClick={(event) => jump(event, 'experiment')}>Experiment</a>
          <a href="#method" onClick={(event) => jump(event, 'method')}>The model</a>
          <a href="#evidence" onClick={(event) => jump(event, 'evidence')}>Evidence</a>
        </nav>
        <a className="nav-cta" href="#experiment" onClick={(event) => jump(event, 'experiment')}>Try Sightline <Arrow diagonal /></a>
      </header>

      <section className="hero section-pad" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">A crossing <span className="inline-photo" aria-hidden="true"><img src="./images/crossing-editorial.webp" alt="" loading="eager" /></span> can hide<br /> in plain sight.</h1>
          <div className="hero-bottom-row">
            <p>Move a parked vehicle. Change approach speed. See how much road remains after a pedestrian becomes visible.</p>
            <a className="button button-primary" href="#experiment" onClick={(event) => jump(event, 'experiment')}>Run the crossing <Arrow /></a>
          </div>
        </div>
        <figure className="hero-image">
          <img src="./images/crossing-editorial.webp" alt="Illustration of a school crossing with a parked van blocking part of the approach from view" width="1672" height="941" loading="eager" />
          <figcaption><span>THE HIDDEN APPROACH</span><span>Generated editorial illustration; the model below uses disclosed geometry.</span></figcaption>
        </figure>
        <div className="hero-side-note" aria-hidden="true">VISIBILITY IS A DISTANCE.</div>
      </section>

      <section className="experiment section-pad" id="experiment" aria-labelledby="experiment-title">
        <div className="section-intro">
          <h2 id="experiment-title">Try the crossing.</h2>
          <p>The vehicle blocks the pedestrian from view. Adjust two things and watch the point of first continuous visibility move.</p>
        </div>
        <div className="simulator">
          <div className="scene-column">
            <StreetScene scenario={scenario} />
            <div className="scene-legend"><span><i className="legend-white" /> Reaction travel</span><span><i className="legend-orange" /> Braking travel</span><span><i className="legend-dash" /> Sightline</span></div>
          </div>
          <div className="controls" aria-label="Crossing controls">
            <div className="controls-top"><span>CHANGE THE STREET</span><button type="button" onClick={() => { setSpeed(25); setSetback(12); }} className="text-button">Reset</button></div>
            <div className="control-row">
              <label htmlFor="speed">Approach speed <output htmlFor="speed">{speed} mph</output></label>
              <input id="speed" data-testid="speed" type="range" min="10" max="40" step="1" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} />
              <div className="control-extents"><span>10 mph</span><span>40 mph</span></div>
            </div>
            <div className="control-row">
              <label htmlFor="setback">Van setback <output htmlFor="setback">{setback} m</output></label>
              <input id="setback" data-testid="setback" type="range" min="5" max="40" step="1" value={setback} onChange={(event) => setSetback(Number(event.target.value))} />
              <div className="control-extents"><span>Near crossing</span><span>Farther away</span></div>
            </div>
            <div className="preset-row" aria-label="Example scenarios">
              <button type="button" onClick={() => selectCase(0)}>Tight view</button>
              <button type="button" onClick={() => selectCase(2)}>More room</button>
            </div>
            <div className={`result ${deficit ? 'result-deficit' : 'result-clear'}`} data-testid="result">
              <div className="result-label">{deficit ? 'STOPPING DISTANCE EXCEEDS THE CLEAR VIEW BY' : 'CLEAR VIEW EXCEEDS STOPPING DISTANCE BY'}</div>
              <strong>{round(Math.abs(scenario.marginM))}<small>m</small></strong>
              <p>{deficit ? 'Under these assumptions, the stop point lies beyond the crossing.' : 'Under these assumptions, the vehicle can stop before the crossing.'}</p>
            </div>
            <div className="result-detail"><span>First continuous view <b>{round(scenario.visibilityDistanceM)} m</b></span><span>Reaction + braking <b>{round(scenario.stoppingDistanceM)} m</b></span></div>
            <button type="button" className="share-button" onClick={copyScenario}>Copy this scenario <Arrow diagonal /></button>
            {copyState !== 'idle' && <p className="copy-status" role="status">{copyState === 'copied' ? 'Link copied with these settings.' : 'Clipboard unavailable. Copy this page URL from your browser.'}</p>}
          </div>
        </div>
        <p className="sim-footnote">A simplified educational model on a level road. It does not assess a real crossing or predict a crash.</p>
      </section>

      <section className="story section-pad" aria-labelledby="story-title">
        <div className="story-intro"><h2 id="story-title">Before the brake.</h2><p>Look at where the available distance really starts.</p></div>
        <p className="story-sentence" ref={wordsRef} aria-label={story}><span className="sr-only">{story}</span>{story.split(' ').map((word, index) => <span className="story-word" aria-hidden="true" key={`${word}-${index}`}>{word}{' '}</span>)}</p>
        <div className="story-rule"><span>FIRST VISIBLE</span><span>REACTION</span><span>BRAKING</span><span>CROSSING</span></div>
      </section>

      <section className="explanation section-pad" id="method" ref={explanationRef} aria-labelledby="method-title">
        <div className="pin-heading" ref={pinRef}><h2 id="method-title">Three distances.<br />One decision.</h2><p>Sightline keeps the pieces separate so the result can be questioned, not just believed.</p></div>
        <div className="method-steps">
          <article><div className="step-graphic step-sight"><span className="graphic-van" /><span className="graphic-person" /><span className="graphic-ray" /></div><h3>First continuous view</h3><p>A straight sightline from the approaching driver to the waiting pedestrian clears the parked vehicle. We use the final blocked-to-clear point on the approach.</p><span className="step-measure">CURRENT CASE / {round(scenario.visibilityDistanceM)} M</span></article>
          <article><div className="step-graphic step-reaction"><span className="graphic-path" /><span className="graphic-dot" /></div><h3>Reaction travel</h3><p>The vehicle keeps moving before braking starts. This teaching model uses the Federal Highway Administration’s 2.5-second design reaction assumption.</p><span className="step-measure">CURRENT CASE / {round(scenario.reactionDistanceM)} M</span></article>
          <article><div className="step-graphic step-braking"><span className="graphic-brake" /><span className="graphic-end" /></div><h3>Braking travel</h3><p>Then the vehicle slows at a stated design deceleration of 3.4 m/s². Reaction travel plus braking travel gives the modeled stop distance.</p><span className="step-measure">CURRENT CASE / {round(scenario.brakingDistanceM)} M</span></article>
        </div>
      </section>

      <section className="comparison section-pad" aria-labelledby="comparison-title">
        <div className="section-intro"><h2 id="comparison-title">Change one thing.</h2><p>These are model scenarios, not observations of a real street. Open each one to compare the calculated margin.</p></div>
        <div className="scenario-accordion" role="group" aria-label="Compare model scenarios">
          {cases.map((item, index) => {
            const sample = computeScenario(item.speed, item.setback);
            const selected = activeCase === index;
            return <div key={item.name} className={`scenario-slice ${selected ? 'is-active' : ''}`}>
              <button type="button" aria-expanded={selected} onClick={() => selectCase(index)}><span>{item.name}</span><span className="slice-index">0{index + 1}</span></button>
              <div className="slice-body" hidden={!selected}><p>{item.description}</p><div className="slice-measure"><strong>{round(Math.abs(sample.marginM))} m</strong><span>{sample.marginM < 0 ? 'short of the calculated stop distance' : 'remaining before the crossing'}</span></div><span className="slice-settings">{item.speed} MPH / {item.setback} M SETBACK</span></div>
            </div>;
          })}
        </div>
        <div className="evidence-grid grid-flow-dense">
          <div className="evidence-wide"><div><h3>The scene and the number are one calculation.</h3><p>The same first-view point and stopping formula place the marks in the simulator and produce its result.</p></div><StreetDiagram scenario={scenario} /></div>
          <div className="evidence-cell"><span>IN THE MODEL</span><strong>{round(scenario.visibilityDistanceM)} m</strong><p>of continuous view at the current van position</p></div>
          <div className="evidence-cell"><span>ALSO IN THE MODEL</span><strong>{round(scenario.stoppingDistanceM)} m</strong><p>for reaction and braking at the current speed</p></div>
        </div>
      </section>

      <section className="evidence section-pad" id="evidence" aria-labelledby="evidence-title">
        <div className="evidence-heading"><h2 id="evidence-title">The model,<br /> openly.</h2><p>This is a way to understand a relationship, not a site survey or a safety certificate.</p></div>
        <div className="formula"><span>STOP DISTANCE</span><strong>speed × {REACTION_TIME_S} s <em>+</em> speed² / (2 × {DESIGN_DECELERATION_MPS2} m/s²)</strong><p>Speed is converted to metres per second. The model assumes a level road, fixed driver eye and pedestrian points, a rectangular van, and constant deceleration.</p></div>
        <div className="source-strip"><div className="source-track" aria-label="Sources: Federal Highway Administration and National Highway Traffic Safety Administration"><span>FEDERAL HIGHWAY ADMINISTRATION</span><span>NATIONAL HIGHWAY TRAFFIC SAFETY ADMINISTRATION</span><span>FEDERAL HIGHWAY ADMINISTRATION</span><span>NATIONAL HIGHWAY TRAFFIC SAFETY ADMINISTRATION</span></div></div>
        <div className="source-links"><a href="https://highways.fhwa.dot.gov/safety/speed-management/speed-concepts-informational-guide/chapter-4-engineering-and-technical" target="_blank" rel="noreferrer">FHWA: stopping sight distance <Arrow diagonal /></a><a href="https://www.nhtsa.gov/road-safety/pedestrian-safety" target="_blank" rel="noreferrer">NHTSA: pedestrian safety <Arrow diagonal /></a><a href="https://www.fhwa.dot.gov/publications/research/safety/15030/002.cfm" target="_blank" rel="noreferrer">FHWA: design assumptions <Arrow diagonal /></a></div>
      </section>

      <section className="closing section-pad" aria-labelledby="closing-title"><h2 id="closing-title">See the gap.<br /><span>Change the street.</span></h2><div><p>One obstruction can change what is visible. One change can move the modeled stop point back before the crossing.</p><a className="button button-dark" href="#experiment" onClick={(event) => jump(event, 'experiment')}>Try another scenario <Arrow /></a></div></section>
      <footer className="footer"><a className="wordmark" href="#top" onClick={(event) => jump(event, 'top')}><span className="wordmark-line" aria-hidden="true" />SIGHTLINE<span className="wordmark-dot">.</span></a><p>Built by Rishik Rontala.</p><a href="https://github.com/rishikrrontala-bot/next-byte-hacks-v4" target="_blank" rel="noreferrer">Public code <Arrow diagonal /></a></footer>
    </main>
  );
}
