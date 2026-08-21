import { Suspense, useEffect, useState } from 'react';
import { backdropConfig } from '../backdrops/config';
import { backdrops } from '../backdrops/registry';
import type { ThemeId } from '../data/themes';
import { useNarrow, usePrefersReducedMotion } from '../lib/useMediaQuery';
import { useScrollDriver } from '../lib/useScrollDriver';
import './Backdrop.css';

/**
 * Host for the decorative layer: owns the scroll clock and the density and pause
 * rules, then hands the theme's backdrop a frame subscription. Backdrops are lazy,
 * so only the one in use is downloaded — and none of them are server-rendered,
 * since the layer is purely decorative.
 */
export function Backdrop({ theme }: { theme: ThemeId }) {
  const [mounted, setMounted] = useState(false);
  const narrow = useNarrow();
  const reducedMotion = usePrefersReducedMotion();
  const onFrame = useScrollDriver({ spinSpeed: backdropConfig.spinSpeed, paused: reducedMotion });

  useEffect(() => setMounted(true), []);

  const Component = backdrops[theme];

  return (
    <div className="backdrop" aria-hidden="true" style={{ opacity: backdropConfig.opacity }}>
      {mounted && (
        <Suspense fallback={null}>
          <Component
            onFrame={onFrame}
            density={narrow ? backdropConfig.narrowDensity : 1}
            paused={reducedMotion}
          />
        </Suspense>
      )}
    </div>
  );
}
