import { forwardRef } from 'react';
import { crab, spriteRuns } from '../lib/invaders';
import './InvaderGlyph.css';

/**
 * The arcade theme's answer to GearGlyph: the classic invader, in the two poses the
 * original alternates between — arms down at rest, arms up mid-step. The pixels come
 * from lib/invaders, the same source the backdrop's fleet is cut from.
 *
 * Both frames are drawn into the same <svg>; which one shows is chosen by the
 * `data-frame` attribute on the root, so a caller animating the sprite writes one
 * attribute per step instead of re-rendering. There is nothing in between the two
 * poses, and that hard cut is the whole look — never tween it.
 */
const COLUMNS = crab.width;
const ROWS = crab.height;

// Width of a sprite as a multiple of its height, from the pixel grid.
export const INVADER_ASPECT = COLUMNS / ROWS;

// Teeth on the gear outline a sprite stands in for — see GearGlyph.
const GLYPH_TEETH = 9;

const FRAME_RUNS = crab.frames.map(spriteRuns);

// The resting pose, and the one a sprite is left on when it stops moving.
export const IDLE_FRAME = '0';

/**
 * Step a sprite through `steps` frame changes, `stepMs` apart, then settle it back
 * on the idle pose. Returns a cancel function that also settles it.
 */
export function marchInvader(glyph: SVGSVGElement, steps: number, stepMs: number) {
  let step = 0;
  glyph.dataset.frame = '1';

  const timer = setInterval(() => {
    step += 1;
    const done = step >= steps;
    glyph.dataset.frame = done ? IDLE_FRAME : String(step % 2 === 0 ? 1 : 0);
    if (done) clearInterval(timer);
  }, stepMs);

  return () => {
    clearInterval(timer);
    glyph.dataset.frame = IDLE_FRAME;
  };
}

/**
 * March a sprite over the window, and at the rate, the gear it replaced would have
 * turned: one frame change per tooth that goes past. Every site that used to spin a
 * gear hands its own turn and duration straight over, so both glyphs keep the same
 * cadence and a theme swap changes what the flourish looks like, never how fast it
 * is. Returns a cancel function.
 */
export function marchLikeGear(glyph: SVGSVGElement, degrees: number, duration: number) {
  const steps = Math.max(1, Math.round(Math.abs(degrees) / (360 / GLYPH_TEETH)));
  return marchInvader(glyph, steps, duration / steps);
}

interface Props {
  // Height of the sprite; its width follows from the 11:8 pixel grid.
  size: string;
  // Back the sprite with an opaque plate, so one sitting on the timeline spine masks the rule.
  filled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const InvaderGlyph = forwardRef<SVGSVGElement, Props>(function InvaderGlyph(
  { size, filled = false, className, style },
  ref,
) {
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${COLUMNS} ${ROWS}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      data-frame={IDLE_FRAME}
      className={className ? `invader-glyph ${className}` : 'invader-glyph'}
      style={{ height: size, width: `calc(${size} * ${INVADER_ASPECT})`, ...style }}
    >
      {/* A pixel of margin all round, so the sprite stays legible against the plate
          when a lit card inverts the two. It overhangs the viewBox, which is why
          the root is overflow: visible. */}
      {filled && (
        <rect
          className="glyph-plate"
          x={-1}
          y={-1}
          width={COLUMNS + 2}
          height={ROWS + 2}
          fill="var(--surface)"
        />
      )}
      {FRAME_RUNS.map((frame, index) => (
        <g key={index} className="invader-glyph__frame" data-index={index}>
          {frame.map((run) => (
            <rect key={`${run.y}-${run.x}`} x={run.x} y={run.y} width={run.w} height={1} />
          ))}
        </g>
      ))}
    </svg>
  );
});
