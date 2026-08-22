import { forwardRef } from 'react';
import type { ThemeId } from '../data/themes';
import { GearGlyph } from './GearGlyph';
import { INVADER_ASPECT, InvaderGlyph } from './InvaderGlyph';

/**
 * The decorative mark a card wears, in whichever form the theme calls for: a gear
 * on the professional themes, a space invader on the arcade one. Every glyph site
 * on the page goes through here so the two stay swappable — same `size`, same
 * `filled` plate, and the plate carries the same .glyph-plate hook either way, so
 * card CSS never has to know which glyph it is dressing.
 */

/**
 * Sprite height as a fraction of the gear's box. The gear fills only about 0.8 of
 * its own viewBox, but it is a solid disc where the sprite is half holes and
 * one-pixel antennae — matching silhouettes would leave the sprite reading lighter
 * than the gear it replaced. A shade over the gear's outline is where the two carry
 * the same weight.
 */
const SPRITE_SCALE = 0.96;

/** How much wider a site should expect the mark to get on the arcade theme. */
export const SPRITE_WIDTH_RATIO = SPRITE_SCALE * INVADER_ASPECT;

interface Props {
  /** The gear's box size, in any CSS length; the sprite is scaled off it. */
  size: string;
  theme: ThemeId;
  /** Gear only — the sprite has no bore to punch out. */
  boreRadius?: number;
  filled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ThemeGlyph = forwardRef<SVGSVGElement, Props>(function ThemeGlyph(
  { size, theme, boreRadius, filled, className, style },
  ref,
) {
  if (theme === 'arcade') {
    return (
      <InvaderGlyph
        ref={ref}
        size={`calc(${size} * ${SPRITE_SCALE})`}
        filled={filled}
        className={className}
        style={style}
      />
    );
  }

  return (
    <GearGlyph
      ref={ref}
      size={size}
      boreRadius={boreRadius}
      filled={filled}
      className={className}
      style={style}
    />
  );
});
