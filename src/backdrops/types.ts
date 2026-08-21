/**
 * A backdrop is the full-viewport decorative layer behind the page. Gears are one
 * implementation; a theme can swap in any other (falling blocks, sprites, …) by
 * adding a module here and an entry in registry.ts.
 *
 * The host (components/Backdrop.tsx) owns the scroll listener, the rAF loop, the
 * easing, and the pause rules. A backdrop only draws — it should never add its own
 * scroll listener or run its own animation clock.
 */
export interface BackdropProps {
  /**
   * Subscribe to the host's animation frame. The callback receives the eased
   * scroll phase (degrees of rotation for gears; any monotonic scroll-derived
   * number for other backdrops). Returns an unsubscribe function.
   *
   * Draw imperatively inside the callback — setState per frame will drop frames.
   */
  onFrame: (callback: (phase: number) => void) => () => void;

  /**
   * How much stuff to draw, 0–1, derived from viewport size. Mobile gets ~0.5.
   * Interpret it however suits the backdrop: fewer gears, fewer particles, etc.
   */
  density: number;

  /**
   * True when motion is suppressed — `prefers-reduced-motion`, or a hidden tab.
   * A paused backdrop should still render a sensible static frame.
   */
  paused: boolean;
}

export type BackdropComponent = React.ComponentType<BackdropProps>;
