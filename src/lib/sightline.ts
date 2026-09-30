/** A deliberately simplified, level-road plan view. All distances are metres. */
export interface Point {
  x: number;
  y: number;
}

export interface AxisAlignedRect {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface StoppingDistances {
  speedMps: number;
  reactionDistanceM: number;
  brakingDistanceM: number;
  stoppingDistanceM: number;
}

export interface VisibilityResult {
  /** Driver x-position at which the final van occlusion ends. */
  firstVisibilityXM: number;
  /** Distance from that driver position to the crosswalk at x=0. */
  visibilityDistanceM: number;
  /** True only if the whole 120 m scanned approach was unblocked. */
  horizonLimited: boolean;
}

export interface ScenarioResult extends StoppingDistances, VisibilityResult {
  speedMph: number;
  setbackM: number;
  /** Available continuous visibility minus stopping distance, in metres. */
  marginM: number;
}

export const MIN_SETBACK_M = 5;
export const MAX_SETBACK_M = 40;
export const SCAN_HORIZON_M = 120;
export const SCAN_STEP_M = 0.1;
export const CROSSWALK_X_M = 0;
export const PEDESTRIAN: Readonly<Point> = Object.freeze({ x: 0, y: 4.8 });
export const DRIVER_EYE_Y_M = 0;
export const VAN_LENGTH_M = 6;
export const VAN_NEAR_Y_M = 0.9;
export const VAN_FAR_Y_M = 4.3;

// FHWA's stopping sight distance design assumptions: 2.5 s perception/braking
// and 3.4 m/s² deceleration on level grade.
// https://www.fhwa.dot.gov/publications/research/safety/04091/03.cfm
export const REACTION_TIME_S = 2.5;
export const DESIGN_DECELERATION_MPS2 = 3.4;
export const MPS_PER_MPH = 0.44704;

function assertSetback(setbackM: number): void {
  if (!Number.isFinite(setbackM) || setbackM < MIN_SETBACK_M || setbackM > MAX_SETBACK_M) {
    throw new RangeError(`setbackM must be between ${MIN_SETBACK_M} and ${MAX_SETBACK_M} m`);
  }
}

function assertSpeed(speedMph: number): void {
  if (!Number.isFinite(speedMph) || speedMph < 0) {
    throw new RangeError('speedMph must be a finite nonnegative number');
  }
}

/** Rectangle occupied by the parked van, set back from the crosswalk at x=0. */
export function getVanRect(setbackM: number): AxisAlignedRect {
  assertSetback(setbackM);
  return {
    minX: -setbackM - VAN_LENGTH_M,
    maxX: -setbackM,
    minY: VAN_NEAR_Y_M,
    maxY: VAN_FAR_Y_M,
  };
}

/** Inclusive segment/rectangle intersection, including a sightline that grazes an edge. */
export function segmentIntersectsRect(
  start: Point,
  end: Point,
  rect: AxisAlignedRect,
): boolean {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  let tEnter = 0;
  let tExit = 1;

  const slabs: Array<readonly [number, number, number, number]> = [
    [start.x, dx, rect.minX, rect.maxX],
    [start.y, dy, rect.minY, rect.maxY],
  ];
  for (const [origin, delta, min, max] of slabs) {
    if (delta === 0) {
      if (origin < min || origin > max) return false;
      continue;
    }

    const t1 = (min - origin) / delta;
    const t2 = (max - origin) / delta;
    tEnter = Math.max(tEnter, Math.min(t1, t2));
    tExit = Math.min(tExit, Math.max(t1, t2));
    if (tEnter > tExit) return false;
  }

  return true;
}

/** Whether the van blocks the driver's straight line to the pedestrian. */
export function isSightlineBlocked(driverXM: number, setbackM: number): boolean {
  if (!Number.isFinite(driverXM) || driverXM > CROSSWALK_X_M) {
    throw new RangeError('driverXM must be finite and at or before the crosswalk');
  }
  return segmentIntersectsRect(
    { x: driverXM, y: DRIVER_EYE_Y_M },
    PEDESTRIAN,
    getVanRect(setbackM),
  );
}

/**
 * Scan toward the crossing in 0.1 m steps, then bisect the last blocked-to-clear
 * interval. A low-setback van can leave the pedestrian visible at x=-120, hide
 * them temporarily, then reveal them again. The final clearance is the useful
 * distance for a driver who needs an uninterrupted view on approach.
 */
export function findFirstContinuousVisibility(setbackM: number): VisibilityResult {
  assertSetback(setbackM);
  const steps = Math.round(SCAN_HORIZON_M / SCAN_STEP_M);
  let previousX = -SCAN_HORIZON_M;
  let previousBlocked = isSightlineBlocked(previousX, setbackM);
  let sawBlock = previousBlocked;
  let firstVisibilityXM = previousX;

  for (let step = 1; step <= steps; step += 1) {
    const x = -SCAN_HORIZON_M + step * SCAN_STEP_M;
    const blocked = isSightlineBlocked(x, setbackM);
    sawBlock ||= blocked;

    if (previousBlocked && !blocked) {
      // Keep the visible side of the transition; tangency counts as blocked.
      let blockedX = previousX;
      let visibleX = x;
      for (let refinement = 0; refinement < 20; refinement += 1) {
        const middleX = (blockedX + visibleX) / 2;
        if (isSightlineBlocked(middleX, setbackM)) blockedX = middleX;
        else visibleX = middleX;
      }
      firstVisibilityXM = visibleX;
    }

    previousX = x;
    previousBlocked = blocked;
  }

  if (previousBlocked) {
    // The supplied geometry should never produce this case, but fail clearly if
    // future edits make the pedestrian invisible even at the crosswalk.
    throw new Error('Sightline remains blocked at the crosswalk');
  }

  return {
    firstVisibilityXM,
    visibilityDistanceM: CROSSWALK_X_M - firstVisibilityXM,
    horizonLimited: !sawBlock,
  };
}

export function stoppingDistanceMeters(speedMph: number): StoppingDistances {
  assertSpeed(speedMph);
  const speedMps = speedMph * MPS_PER_MPH;
  const reactionDistanceM = speedMps * REACTION_TIME_S;
  const brakingDistanceM = speedMps ** 2 / (2 * DESIGN_DECELERATION_MPS2);
  return {
    speedMps,
    reactionDistanceM,
    brakingDistanceM,
    stoppingDistanceM: reactionDistanceM + brakingDistanceM,
  };
}

export function computeScenario(speedMph: number, setbackM: number): ScenarioResult {
  const stopping = stoppingDistanceMeters(speedMph);
  const visibility = findFirstContinuousVisibility(setbackM);
  return {
    speedMph,
    setbackM,
    ...stopping,
    ...visibility,
    marginM: visibility.visibilityDistanceM - stopping.stoppingDistanceM,
  };
}
