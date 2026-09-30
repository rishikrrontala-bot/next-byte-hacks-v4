import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { ScenarioResult } from '../lib/sightline';

const StreetCanvas = lazy(() => import('./StreetCanvas'));

type Props = { scenario: ScenarioResult };

function runtimeCanRender(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
    const slowDevice = navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    return Boolean(context) && !slowDevice && !(memory && memory <= 2);
  } catch {
    return false;
  }
}

export function StreetDiagram({ scenario }: Props) {
  const x = (metres: number) => 680 + metres * 11.5;
  const vanLeft = x(-scenario.setbackM - 6);
  const vanRight = x(-scenario.setbackM);
  const first = x(scenario.firstVisibilityXM);
  const reactionEnd = x(scenario.firstVisibilityXM + scenario.reactionDistanceM);
  const stoppingEnd = x(scenario.firstVisibilityXM + scenario.stoppingDistanceM);
  const cappedReaction = Math.min(785, reactionEnd);
  const cappedStop = Math.min(785, stoppingEnd);

  return (
    <svg className="street-diagram" viewBox="0 0 800 450" role="img" aria-label={`Top-down crossing diagram. The pedestrian becomes continuously visible ${scenario.visibilityDistanceM.toFixed(1)} metres before the crossing. The calculated stopping distance is ${scenario.stoppingDistanceM.toFixed(1)} metres.`}>
      <defs>
        <pattern id="road-grain" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".4" fill="#75807b" opacity=".35" /></pattern>
        <clipPath id="street-clip"><rect x="0" y="0" width="800" height="450" /></clipPath>
      </defs>
      <rect width="800" height="450" fill="#252B29" />
      <rect y="48" width="800" height="70" fill="#827D71" />
      <rect y="118" width="800" height="256" fill="#353B38" />
      <rect y="118" width="800" height="256" fill="url(#road-grain)" />
      <rect y="374" width="800" height="76" fill="#827D71" />
      <path d="M0 119H800 M0 373H800" stroke="#D5D0C4" strokeWidth="4" opacity=".8" />
      <path d="M0 244H800" stroke="#D5D0C4" strokeWidth="2" strokeDasharray="30 24" opacity=".55" />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={658 + i * 6} y="127" width="3" height="238" fill="#E6E1D5" opacity={i % 2 ? 0.8 : 1} />
      ))}
      <rect x={vanLeft} y="122" width={Math.max(8, vanRight - vanLeft)} height="69" rx="6" fill="#E1DDD3" />
      <rect x={vanLeft + 8} y="133" width={Math.max(4, vanRight - vanLeft - 16)} height="35" rx="3" fill="#909995" />
      <rect x={vanRight - 5} y="135" width="4" height="17" fill="#C65A36" />
      <circle cx="680" cy="88" r="13" fill="#C65A36" />
      <path d="M680 102v30m-18 4 18-19 18 19" stroke="#C65A36" strokeWidth="8" strokeLinecap="round" fill="none" />
      <g clipPath="url(#street-clip)">
        <path d={`M${first} 290 L680 91`} stroke="#C65A36" strokeWidth="2" strokeDasharray="7 7" opacity=".82" />
        <path d={`M${first} 338 H${cappedReaction}`} stroke="#F4F1EA" strokeWidth="13" strokeLinecap="round" />
        <path d={`M${cappedReaction} 338 H${cappedStop}`} stroke="#C65A36" strokeWidth="13" strokeLinecap="round" />
      </g>
      <g transform={`translate(${Math.max(17, first - 21)} 270)`}>
        <rect x="0" y="0" width="42" height="27" rx="7" fill="#D8D4CA" />
        <rect x="9" y="5" width="24" height="17" rx="3" fill="#8E9692" />
      </g>
      <circle cx={first} cy="338" r="8" fill="#F4F1EA" />
      <circle cx={Math.min(785, stoppingEnd)} cy="338" r="8" fill="#C65A36" />
      <text x="30" y="37" fill="#F4F1EA" fontSize="13" fontFamily="monospace" letterSpacing="2">DRIVER APPROACH</text>
      <text x="532" y="37" fill="#F4F1EA" fontSize="13" fontFamily="monospace" letterSpacing="2">CROSSING</text>
      <text x="30" y="420" fill="#F4F1EA" fontSize="13" fontFamily="monospace">WHITE: REACTION</text>
      <text x="265" y="420" fill="#F4F1EA" fontSize="13" fontFamily="monospace">ORANGE: BRAKING</text>
    </svg>
  );
}

export function StreetScene({ scenario }: Props) {
  const holder = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [capable, setCapable] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setCapable(runtimeCanRender());
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) setVisible(true);
    }, { rootMargin: '220px' });
    if (holder.current) observer.observe(holder.current);
    return () => { query.removeEventListener('change', update); observer.disconnect(); };
  }, []);

  return (
    <div className="street-scene" ref={holder} data-renderer={visible && capable && !reduced ? 'webgl' : 'diagram'}>
      <StreetDiagram scenario={scenario} />
      {visible && capable && !reduced && (
        <Suspense fallback={null}>
          <StreetCanvas scenario={scenario} />
        </Suspense>
      )}
      <span className="scene-corner scene-corner-top" aria-hidden="true" />
      <span className="scene-corner scene-corner-bottom" aria-hidden="true" />
      <div className="scene-caption"><span>PLAN VIEW / EDUCATIONAL MODEL</span><span>MOVE THE CONTROLS →</span></div>
    </div>
  );
}
