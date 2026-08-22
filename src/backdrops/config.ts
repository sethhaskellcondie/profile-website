/** Backdrop tunables. All are safe to adjust without touching component code. */
export const backdropConfig = {
  /** Degrees of rotation per pixel scrolled. Range 0.05–1. */
  spinSpeed: 0.32,
  /** Opacity of the whole backdrop layer over the page background. Range 0.1–1. */
  opacity: 0.35,
  /** Opacity while "gears only" is on and the field is the whole page. Range 0.1–1. */
  revealedOpacity: 1,
  /** Fraction of full density to draw on phones — half the gears, same layout. */
  narrowDensity: 0.5,

  /** One gear in every N is shaded in accent-tinted metal instead of steel. */
  accentEvery: 5,

  /**
   * One invader in every N is drawn in the accent instead of the fleet's own tones.
   * Tuned separately from the gears rather than sharing a number with them: a gear's
   * accent is a tint through metal, where a sprite's is flat colour on flat colour,
   * so the same ratio does not read as the same amount of accent.
   */
  invaderAccentEvery: 4,

  /**
   * Strength of the fixed directional highlight laid over each gear, 0–1. It does
   * NOT rotate with the gear, so the light stays put while the metal turns under
   * it — that stationary specular is most of what sells the surface as metal.
   */
  sheen: 0.85,
};
