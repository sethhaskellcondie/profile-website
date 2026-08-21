/**
 * Deterministic meshed gear-train generator.
 *
 * Every gear attaches to exactly one parent at a center distance equal to the sum of
 * the two pitch radii, so neighbours mesh; the child's rotation offset is solved so a
 * tooth lands in a gap at the contact angle. That offset math is what makes the field
 * read as real gearing rather than unrelated spinning circles — don't skip it.
 *
 * Seeded, so the layout is identical on every load.
 */

const MODULE = 16;
const SEED = 20260820;
const TEETH_OPTIONS = [9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26];
const BOUNDS = { x0: -240, y0: -220, x1: 1840, y1: 1220 };
const MAX_GEARS = 72;
const MAX_ATTEMPTS = 14000;

/** Gears may not come closer than this multiple of their combined radii, except to a parent. */
const CLEARANCE = 1.045;
/** Reject a child that would spin more than this many times the root's speed. */
const MAX_SPEED = 3;

export const VIEWBOX = { width: 1600, height: 1000 };

export interface HubHole {
  x: number;
  y: number;
  r: number;
}

export interface Gear {
  teeth: number;
  /** Pitch radius — where this gear's teeth meet its neighbour's. */
  rp: number;
  cx: number;
  cy: number;
  /** Starting rotation in degrees, solved so teeth mesh with the parent. */
  offset: number;
  /** Turns per unit of scroll phase; negative means the opposite direction. */
  speed: number;
  holes: HubHole[];
  d: string;
}

const pitchRadius = (teeth: number) => (teeth * MODULE) / 2;

/** Trapezoidal teeth around the tip radius, arcs along the root radius between them. */
export function gearPath(teeth: number, rp: number): string {
  const tip = rp * 1.085;
  const root = rp * 0.865;
  const pitch = (Math.PI * 2) / teeth;
  const point = (angle: number, r: number) => [Math.cos(angle) * r, Math.sin(angle) * r] as const;

  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a = i * pitch;
    const corners = [
      point(a - pitch * 0.33, root),
      point(a - pitch * 0.21, tip),
      point(a + pitch * 0.21, tip),
      point(a + pitch * 0.33, root),
    ];
    d += (i === 0 ? 'M' : 'L') + corners[0][0].toFixed(2) + ' ' + corners[0][1].toFixed(2);
    for (let k = 1; k < corners.length; k++) {
      d += 'L' + corners[k][0].toFixed(2) + ' ' + corners[k][1].toFixed(2);
    }
    const next = point(a + pitch * 0.67, root);
    d += `A${root.toFixed(2)} ${root.toFixed(2)} 0 0 1 ${next[0].toFixed(2)} ${next[1].toFixed(2)}`;
  }
  return d + 'Z';
}

/** Big gears get lightening holes in the web, the way real ones do. */
function hubHoles(rp: number): HubHole[] {
  if (rp <= 95) return [];
  const count = rp > 165 ? 6 : 5;
  return Array.from({ length: count }, (_, k) => {
    const a = (k / count) * Math.PI * 2;
    return { x: Math.cos(a) * rp * 0.58, y: Math.sin(a) * rp * 0.58, r: rp * 0.125 };
  });
}

/**
 * Grow the train. Children always attach to a gear already in the list, so any prefix
 * of the result is itself a valid meshed train — which is what lets the field thin out
 * on small screens by simply taking fewer gears.
 */
export function buildGears(): Gear[] {
  let seed = SEED;
  const random = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };

  const make = (teeth: number, cx: number, cy: number, offset: number, speed: number): Gear => {
    const rp = pitchRadius(teeth);
    return { teeth, rp, cx, cy, offset, speed, holes: hubHoles(rp), d: gearPath(teeth, rp) };
  };

  const gears = [make(24, 780, 470, 0, 1)];

  const fits = (cx: number, cy: number, rp: number, parent: Gear) => {
    if (cx < BOUNDS.x0 || cx > BOUNDS.x1 || cy < BOUNDS.y0 || cy > BOUNDS.y1) return false;
    return gears.every(
      (g) => g === parent || Math.hypot(cx - g.cx, cy - g.cy) >= (rp + g.rp) * CLEARANCE,
    );
  };

  let attempts = 0;
  while (gears.length < MAX_GEARS && attempts < MAX_ATTEMPTS) {
    attempts++;
    const parent = gears[Math.floor(random() * gears.length)];
    const teeth = TEETH_OPTIONS[Math.floor(random() * TEETH_OPTIONS.length)];

    const ratio = teeth / parent.teeth;
    if (ratio < 0.5 || ratio > 2) continue;

    const speed = -parent.speed * (parent.teeth / teeth);
    if (Math.abs(speed) > MAX_SPEED) continue;

    const rp = pitchRadius(teeth);
    const angle = random() * Math.PI * 2;
    const distance = parent.rp + rp;
    const cx = parent.cx + Math.cos(angle) * distance;
    const cy = parent.cy + Math.sin(angle) * distance;
    if (!fits(cx, cy, rp, parent)) continue;

    // Solve the child's offset so one of its gaps sits on the parent's nearest tooth.
    const contact = Math.atan2(cy - parent.cy, cx - parent.cx);
    const parentPitch = (Math.PI * 2) / parent.teeth;
    const childPitch = (Math.PI * 2) / teeth;
    const parentOffset = (parent.offset * Math.PI) / 180;
    const nearestTooth =
      parentOffset + Math.round((contact - parentOffset) / parentPitch) * parentPitch;
    const offset =
      ((contact + Math.PI - (nearestTooth - contact) + childPitch / 2) * 180) / Math.PI;

    gears.push(make(teeth, cx, cy, offset, speed));
  }

  return gears;
}
