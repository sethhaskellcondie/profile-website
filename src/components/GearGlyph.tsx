import { forwardRef } from 'react';
import { gearPath } from '../backdrops/gear-field/gears';

/** One shared 9-tooth outline for every decorative glyph on the page. */
const GLYPH_PATH = gearPath(9, 74);

interface Props {
  size: string;
  /** Stroke weight in viewBox units — heavier reads better at small sizes. */
  strokeWidth?: number;
  boreRadius?: number;
  /** Fill the body and bore, so a glyph sitting on the timeline spine masks the rule. */
  filled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const GearGlyph = forwardRef<SVGSVGElement, Props>(function GearGlyph(
  { size, strokeWidth = 14, boreRadius = 26, filled = false, className, style },
  ref,
) {
  return (
    <svg
      ref={ref}
      viewBox="-100 -100 200 200"
      aria-hidden="true"
      className={className}
      style={{ width: size, height: size, overflow: 'visible', ...style }}
    >
      {filled && <circle r={96} fill="var(--surface)" />}
      <path
        d={GLYPH_PATH}
        fill={filled ? 'var(--surface)' : 'none'}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <circle r={boreRadius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
});
