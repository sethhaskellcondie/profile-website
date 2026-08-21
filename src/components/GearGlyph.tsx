import { forwardRef } from 'react';
import { gearPath } from '../backdrops/gear-field/gears';

/** One shared 9-tooth outline for every decorative glyph on the page. */
const GLYPH_PATH = gearPath(9, 74);

/** Bore as a second subpath, so an evenodd fill punches it out as a real hole. */
const bore = (r: number) =>
  `M${r} 0A${r} ${r} 0 1 0 ${-r} 0A${r} ${r} 0 1 0 ${r} 0Z`;

interface Props {
  size: string;
  boreRadius?: number;
  /** Back the glyph with an opaque disc, so one sitting on the timeline spine masks the rule. */
  filled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const GearGlyph = forwardRef<SVGSVGElement, Props>(function GearGlyph(
  { size, boreRadius = 26, filled = false, className, style },
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
      {/* Sits under the bore hole too, which is what keeps the spine hidden. */}
      {filled && <circle r={96} fill="var(--surface)" />}
      <path
        d={`${GLYPH_PATH}${bore(boreRadius)}`}
        fill="currentColor"
        fillRule="evenodd"
        strokeLinejoin="round"
      />
    </svg>
  );
});
