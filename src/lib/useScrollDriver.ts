import { useCallback, useEffect, useRef } from 'react';

// Per-frame easing toward the scroll target — lower is smoother and laggier.
const LERP = 0.11;
// Below this, the field has effectively caught up: land on the target and sleep.
const SETTLED = 0.002;

type FrameCallback = (phase: number) => void;

/**
 * The single animation clock for the page: one scroll listener, one rAF loop, one
 * eased phase value that every backdrop subscribes to. The loop really does stop —
 * once the phase catches up to the scroll target the frame is not rescheduled, and
 * the next scroll event starts it again. A hidden tab stops it too, and it never
 * starts at all while `paused`.
 *
 * `spinSpeed` has no default on purpose: backdrops/config.ts is the one place that
 * number is allowed to live, and the caller passes it from there.
 */
export function useScrollDriver({
  spinSpeed,
  paused = false,
}: {
  spinSpeed: number;
  paused?: boolean;
}) {
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

    let frame = 0;

    const draw = () => subscribers.current.forEach((cb) => cb(phase.current));

    const tick = () => {
      const diff = target.current - phase.current;
      if (Math.abs(diff) < SETTLED) {
        // Caught up. Land exactly on the target so the field doesn't rest a
        // fraction of a degree off, draw that last frame, and leave `frame` at 0
        // so nothing is scheduled until scroll wakes us.
        if (phase.current !== target.current) {
          phase.current = target.current;
          draw();
        }
        frame = 0;
        return;
      }
      phase.current += diff * LERP;
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const onScroll = () => {
      target.current = -(window.scrollY || document.documentElement.scrollTop || 0) * spinSpeed;
      start();
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    // Pick up the scroll position we loaded at — a reload partway down the page
    // should start with the field already turned to match.
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      stop();
    };
  }, [spinSpeed, paused]);

  return onFrame;
}
