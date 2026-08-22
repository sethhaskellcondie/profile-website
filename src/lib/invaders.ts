/**
 * The invader artwork, as pixel grids — one home for it, so the glyph on a card and
 * the sprites in the backdrop are the same pixels rather than two copies that can
 * drift apart.
 *
 * Each design is the arcade original at its own grid size, in the two poses the
 * game alternates between. There is nothing in between the poses: whatever draws
 * them cuts from one to the other, never tweens.
 */

export interface InvaderDesign {
  name: string;
  /** Grid size in sprite pixels — the designs are deliberately not all the same. */
  width: number;
  height: number;
  frames: readonly (readonly string[])[];
}

/** The small one. Two thin legs that swap under it. */
const SQUID = [
  ['00100100', '01111110', '11011011', '11111111', '01111110', '00100100', '01000010', '00100100'],
  ['00100100', '01111110', '11011011', '11111111', '01111110', '01000010', '10000001', '01000010'],
];

/** The middle one — the pair the cards wear. Arms down at rest, arms up mid-step. */
const CRAB = [
  [
    '00100000100',
    '00010001000',
    '00111111100',
    '01101110110',
    '11111111111',
    '10111111101',
    '10100000101',
    '00011011000',
  ],
  [
    '00100000100',
    '10010001001',
    '10111111101',
    '11101110111',
    '11111111111',
    '01111111110',
    '00100000100',
    '01000000010',
  ],
];

/** The wide one from the bottom rows, with the heaviest tentacles. */
const OCTOPUS = [
  [
    '000011110000',
    '011111111110',
    '111111111111',
    '111001100111',
    '111111111111',
    '000110011000',
    '001101101100',
    '011000000110',
  ],
  [
    '000011110000',
    '011111111110',
    '111111111111',
    '111001100111',
    '111111111111',
    '001110011100',
    '011001100110',
    '001100001100',
  ],
];

function design(name: string, frames: readonly (readonly string[])[]): InvaderDesign {
  return { name, width: frames[0][0].length, height: frames[0].length, frames };
}

export const crab = design('crab', CRAB);

/** Every design, smallest grid first. */
export const invaders: InvaderDesign[] = [design('squid', SQUID), crab, design('octopus', OCTOPUS)];

export interface Run {
  x: number;
  y: number;
  w: number;
}

/**
 * Collapse a frame's lit pixels into horizontal runs. A crab comes out as ~20 boxes
 * rather than 60, which is the difference between a backdrop of 50 sprites costing
 * a thousand nodes and costing three.
 */
export function spriteRuns(rows: readonly string[]): Run[] {
  const out: Run[] = [];
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] !== '1') continue;
      let w = 1;
      while (row[x + w] === '1') w++;
      out.push({ x, y, w });
      x += w - 1;
    }
  });
  return out;
}

/** The same runs as one path, for callers that want a single node per frame. */
export function spritePath(rows: readonly string[]): string {
  return spriteRuns(rows)
    .map((run) => `M${run.x} ${run.y}h${run.w}v1h-${run.w}Z`)
    .join('');
}
