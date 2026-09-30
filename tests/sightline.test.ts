import { describe, expect, it } from 'vitest';
import {
  computeScenario,
  findFirstContinuousVisibility,
  getVanRect,
  isSightlineBlocked,
  segmentIntersectsRect,
  stoppingDistanceMeters,
} from '../src/lib/sightline';

describe('line of sight geometry', () => {
  const rect = { minX: -11, maxX: -5, minY: 0.9, maxY: 4.3 };

  it('distinguishes a clear segment, a crossing, and an edge tangent', () => {
    expect(segmentIntersectsRect({ x: -12, y: 0 }, { x: 0, y: 0 }, rect)).toBe(false);
    expect(segmentIntersectsRect({ x: -12, y: 2 }, { x: 0, y: 2 }, rect)).toBe(true);
    expect(segmentIntersectsRect({ x: -12, y: 4.3 }, { x: 0, y: 4.3 }, rect)).toBe(true);
    expect(segmentIntersectsRect({ x: -12, y: 4.31 }, { x: 0, y: 4.31 }, rect)).toBe(false);
  });

  it('places the van at the requested setback and sees the temporary occlusion', () => {
    expect(getVanRect(5)).toEqual(rect);
    expect(isSightlineBlocked(-120, 5)).toBe(false);
    expect(isSightlineBlocked(-20, 5)).toBe(true);
    expect(isSightlineBlocked(-5, 5)).toBe(false);
  });

  it('finds the final reveal after occlusion rather than early, temporary visibility', () => {
    const result = findFirstContinuousVisibility(5);
    expect(result.horizonLimited).toBe(false);
    expect(result.visibilityDistanceM).toBeCloseTo(5 * 4.8 / (4.8 - 0.9), 4);
    expect(isSightlineBlocked(result.firstVisibilityXM, 5)).toBe(false);
    expect(isSightlineBlocked(result.firstVisibilityXM - 0.01, 5)).toBe(true);
  });

  it('increases available visibility when the van moves farther from the crosswalk', () => {
    const distances = [5, 10, 20, 30, 40].map(
      (setbackM) => findFirstContinuousVisibility(setbackM).visibilityDistanceM,
    );
    for (let index = 1; index < distances.length; index += 1) {
      expect(distances[index]).toBeGreaterThan(distances[index - 1]);
    }
  });
});

describe('stopping and margin', () => {
  it('uses FHWA reaction and level-road design deceleration assumptions', () => {
    const result = stoppingDistanceMeters(30);
    expect(result.speedMps).toBeCloseTo(13.4112, 6);
    expect(result.reactionDistanceM).toBeCloseTo(13.4112 * 2.5, 6);
    expect(result.brakingDistanceM).toBeCloseTo(13.4112 ** 2 / (2 * 3.4), 6);
    expect(result.stoppingDistanceM).toBeCloseTo(
      result.reactionDistanceM + result.brakingDistanceM,
      10,
    );
  });

  it('has zero stopping distance at zero speed and accepts the setback endpoints', () => {
    expect(stoppingDistanceMeters(0).stoppingDistanceM).toBe(0);
    expect(computeScenario(0, 5).marginM).toBeCloseTo(
      computeScenario(0, 5).visibilityDistanceM,
      8,
    );
    expect(computeScenario(25, 40).visibilityDistanceM).toBeGreaterThan(
      computeScenario(25, 5).visibilityDistanceM,
    );
  });

  it('reduces the margin as speed increases and improves it as setback increases', () => {
    const slow = computeScenario(15, 20);
    const fast = computeScenario(30, 20);
    const fartherVan = computeScenario(30, 40);
    expect(fast.marginM).toBeLessThan(slow.marginM);
    expect(fartherVan.marginM).toBeGreaterThan(fast.marginM);
    expect(fast.marginM).toBeCloseTo(
      fast.visibilityDistanceM - fast.stoppingDistanceM,
      10,
    );
  });

  it('rejects nonphysical or out-of-range inputs', () => {
    expect(() => computeScenario(-1, 20)).toThrow(RangeError);
    expect(() => computeScenario(Number.NaN, 20)).toThrow(RangeError);
    expect(() => computeScenario(20, 4.99)).toThrow(RangeError);
    expect(() => computeScenario(20, 40.01)).toThrow(RangeError);
    expect(() => isSightlineBlocked(1, 10)).toThrow(RangeError);
  });
});
