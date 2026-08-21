import { useCallback, useEffect, useRef } from 'react';

/** How far a pixel of scroll turns the field, in degrees. */
const DEFAULT_SPIN_SPEED = 0.32;
/** Per-frame easing toward the scroll target — lower is smoother and laggier. */
const LERP = 0.11;
/** Below this, the field has effectively caught up; stop writing until scroll moves. */
const SETTLED = 0.002;

type FrameCallback = (phase: number) => void;

/**
 * The single animation clock for the page: one scroll listener, one rAF loop, one
 * eased phase value that every backdrop subscribes to. Sleeps when the phase has
 * settled and when the tab is hidden, and never starts while `paused`.
 */
export function useScrollDriver({
  spinSpeed = DEFAULT_SPIN_SPEED,
  paused = false,
}: { spinSpeed?: number; paused?: boolean } = {}) {
  const subscribers = useRef(new Set<FrameCallback>());
  const phase = useRef(0);
  const target = useRef(0);

  const onFrame = useCallback((callback: FrameCallback) => {
    subscribers.current.add(callback);
    // Draw once immediately so a newly mounted backdrop isn't blank until the
    // visitor scrolls.
    callback(phase.current);
    return () => {
      subscribers.current.delete(callback);
    };
  }, []);

  useEffect(() => {
    if (paused) return;

    const onScroll = () => {
      target.current = -(window.scrollY || document.documentElement.scrollTop || 0) * spinSpeed;
    };
    onScroll();

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const diff = target.current - phase.current;
      if (Math.abs(diff) < SETTLED) return;
      phase.current += diff * LERP;
      subscribers.current.forEach((cb) => cb(phase.current));
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      stop();
    };
  }, [spinSpeed, paused]);

  return onFrame;
}
