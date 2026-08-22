/**
 * Deterministic scatter of invaders across the backdrop.
 *
 * Where the gear field grows a meshed train — every gear touching a parent — a fleet
 * has nothing to mesh with, so this is a seeded dart throw with a clearance rule:
 * pick a design, a size, a place and an angle, and keep it only if it clears
 * everything already down. Nothing is right side up, and nothing is the same size as
 * its neighbour, which is what stops a scatter of identical silhouettes reading as
 * wallpaper.
 *
 * Placement order is random rather than parent-first, so any prefix of the result is
 * still a well-spaced field — which is what lets a narrow screen thin the fleet by
 * simply taking fewer of them, and thin it evenly rather than cropping a cluster.
 *
 * Seeded, so the layout is identical on every load.
 */

import { invaders, spritePath } from '../../lib/invaders';

const SEED = 20260822;
/** Overscanned past the viewBox, so nothing pops in at the edges when it slices. */
const BOUNDS = { x0: -200, y0: -180, x1: 1800, y1: 1180 };
const MAX_SPRITES = 110;
const MAX_ATTEMPTS = 20000;

/**
 * Sprites may not come closer than this multiple of their combined radii. This, not
 * MAX_SPRITES, is what really sets how full the field gets — the bounds saturate long
 * before the attempt ceiling, so raising the count without easing this does nothing.
 */
const CLEARANCE = 1.06;

/** Viewbox units per sprite pixel. A crab at 9 is ~100 units across; at 24, ~264. */
const SCALES = [7, 8, 9, 10, 11, 13, 15, 17, 20, 24];

/**
 * Degrees of scroll phase between one frame change and the next. The gear field put
 * a tooth past every 5 to 80 degrees depending on the gear and how fast it turned;
 * sampling that same span keeps the fleet ticking over at the rate the metal did,
 * and spreading it across the field means no two neighbours step together.
 */
const PHASE_PER_STEP = [6, 9, 12, 16, 21, 27, 34, 44, 58, 76];

/** Anything at least this wide is near enough to catch the light. */
const NEAR_SCALE = 15;

export const VIEWBOX = { width: 1600, height: 1000 };

export interface Sprite {
  /** Index into `designs` — which invader this one is. */
  design: number;
  cx: number;
  cy: number;
  scale: number;
  /** Degrees this one is tumbled by. */
  angle: number;
  /** Bounding radius, so neighbours can be kept off it whatever the angle. */
  radius: number;
  phasePerStep: number;
  /** Phase this one counts from: staggers both which pose it rests in and when it flips. */
  phaseOffset: number;
  /** Reads as nearer, and takes the lighter tone for it. */
  near: boolean;
}

/** Every design's every frame, pre-cut to path data and indexed [design][frame]. */
export const designs = invaders.map((design) => ({
  ...design,
  paths: design.frames.map(spritePath),
}));

export function buildFleet(): Sprite[] {
  let seed = SEED;
  const random = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const pick = <T>(list: readonly T[]) => list[Math.floor(random() * list.length)];

  const fleet: Sprite[] = [];
  let attempts = 0;

  while (fleet.length < MAX_SPRITES && attempts < MAX_ATTEMPTS) {
    attempts++;

    const design = Math.floor(random() * designs.length);
    const scale = pick(SCALES);
    const { width, height } = designs[design];
    // The sprite tumbles, so it is kept off its neighbours by the circle that holds
    // it at any angle rather than by its box.
    const radius = (Math.hypot(width, height) / 2) * scale;

    const cx = BOUNDS.x0 + random() * (BOUNDS.x1 - BOUNDS.x0);
    const cy = BOUNDS.y0 + random() * (BOUNDS.y1 - BOUNDS.y0);
    const clear = fleet.every(
      (other) => Math.hypot(cx - other.cx, cy - other.cy) >= (radius + other.radius) * CLEARANCE,
    );
    if (!clear) continue;

    const phasePerStep = pick(PHASE_PER_STEP);
    fleet.push({
      design,
      cx,
      cy,
      scale,
      angle: random() * 360,
      radius,
      phasePerStep,
      // Two steps wide, not one. A single step's worth would stagger when each
      // sprite flips but still leave every one of them in pose 0 at phase zero —
      // the whole fleet landing in unison on the view a visitor opens on.
      phaseOffset: random() * 2 * phasePerStep,
      near: scale >= NEAR_SCALE,
    });
  }

  return fleet;
}

/** Which pose a sprite is holding at this much scroll phase. */
export function frameAt(sprite: Sprite, phase: number): number {
  // & 1 rather than % 2: phase runs negative as the page scrolls down, and parity
  // has to keep alternating through zero rather than fold back on itself.
  return Math.floor((phase + sprite.phaseOffset) / sprite.phasePerStep) & 1;
}
