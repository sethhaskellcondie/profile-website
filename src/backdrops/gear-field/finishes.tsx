/**
 * The gear surface treatment, as SVG paint servers.
 *
 * Gears are shaded like a milled steel blank: one off-centre highlight falling away
 * to a shadowed far edge. The gradients use objectBoundingBox units, so a single
 * definition serves every gear in the field no matter its radius — a 9-tooth pinion
 * and a 26-tooth wheel get the same proportional ramp. Stops read theme tokens, so a
 * theme switch repaints the metal without any of this code knowing which theme it is.
 */

interface Ramp {
  lit: string;
  mid: string;
  dim: string;
}

const STEEL: Ramp = { lit: 'var(--gear-lit)', mid: 'var(--gear-mid)', dim: 'var(--gear-dim)' };
const ACCENT: Ramp = {
  lit: 'var(--gear-accent-lit)',
  mid: 'var(--gear-accent-mid)',
  dim: 'var(--gear-accent-dim)',
};

// Highlight, a long flat mid-tone, then the far edge rolling into shadow.
const STOPS: [number, keyof Ramp][] = [
  [0, 'lit'],
  [0.42, 'mid'],
  [0.78, 'mid'],
  [1, 'dim'],
];

function plate(id: string, colors: Ramp) {
  return (
    <radialGradient id={id} cx={0.36} cy={0.3} r={0.78}>
      {STOPS.map(([offset, tone]) => (
        <stop key={offset} offset={offset} stopColor={colors[tone]} />
      ))}
    </radialGradient>
  );
}

// The paint for a gear body — accent gears take the same ramp, tinted.
export function bodyFill(accent: boolean): string {
  return accent ? 'url(#gf-plated-accent)' : 'url(#gf-plated)';
}

export function GearDefs() {
  return (
    <defs>
      {plate('gf-plated', STEEL)}
      {plate('gf-plated-accent', ACCENT)}

      {/* Laid over the body but outside the rotating group, so the light stays put
          while the metal turns under it. */}
      <linearGradient id="gf-sheen" x1="0.12" y1="0" x2="0.88" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="0.34" stopColor="#ffffff" stopOpacity="0.12" />
        <stop offset="0.52" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="0.7" stopColor="#000000" stopOpacity="0.12" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.34" />
      </linearGradient>
    </defs>
  );
}
