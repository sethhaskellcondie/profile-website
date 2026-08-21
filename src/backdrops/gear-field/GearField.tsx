import { useEffect, useMemo, useRef } from 'react';
import { backdropConfig } from '../config';
import type { BackdropProps } from '../types';
import { bodyFill, GearDefs } from './finishes';
import { buildGears, VIEWBOX } from './gears';

export default function GearField({ onFrame, density, paused }: BackdropProps) {
  const gears = useMemo(() => buildGears(), []);
  // Any prefix of the train is still a valid mesh, so thinning is just a slice.
  const visible = useMemo(
    () => gears.slice(0, Math.max(8, Math.round(gears.length * density))),
    [gears, density],
  );

  // Two spinning groups per gear — body and hub — with the fixed sheen sandwiched
  // between them, so the highlight sits on the metal but never turns with it.
  const bodies = useRef<(SVGGElement | null)[]>([]);
  const hubs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    if (paused) return;
    // Write transforms straight to the DOM: 72 gears re-rendering through React
    // every frame would drop frames.
    return onFrame((phase) => {
      for (let i = 0; i < visible.length; i++) {
        const spin = `rotate(${(visible[i].offset + phase * visible[i].speed).toFixed(3)})`;
        bodies.current[i]?.setAttribute('transform', spin);
        hubs.current[i]?.setAttribute('transform', spin);
      }
    });
  }, [onFrame, visible, paused]);

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      style={{ display: 'block' }}
    >
      <GearDefs />
      {visible.map((gear, i) => {
        const accent = i % backdropConfig.accentEvery === 0;
        const stroke = accent ? 'var(--accent)' : 'var(--gear-stroke)';
        const spin = `rotate(${gear.offset.toFixed(3)})`;

        return (
          <g key={i} transform={`translate(${gear.cx.toFixed(1)} ${gear.cy.toFixed(1)})`}>
            <g
              ref={(el) => {
                bodies.current[i] = el;
              }}
              transform={spin}
            >
              <path
                d={gear.d}
                fill={bodyFill(accent)}
                stroke={stroke}
                strokeWidth={2.5}
                strokeLinejoin="round"
                style={{ transition: 'stroke 260ms ease' }}
              />
              {/* Lit inner edge, just inside the tooth roots — the bright line a
                  turned face catches where the web steps down. */}
              <circle
                r={gear.rp * 0.845}
                fill="none"
                stroke={accent ? 'var(--gear-accent-lit)' : 'var(--gear-rim)'}
                strokeWidth={1.25}
                opacity={0.5}
              />
            </g>

            {backdropConfig.sheen > 0 && (
              <circle
                r={gear.rp * 0.86}
                fill="url(#gf-sheen)"
                opacity={backdropConfig.sheen}
                style={{ mixBlendMode: 'soft-light' }}
              />
            )}

            <g
              ref={(el) => {
                hubs.current[i] = el;
              }}
              transform={spin}
            >
              <circle r={gear.rp * 0.26} fill="var(--bg)" stroke={stroke} strokeWidth={2.5} />
              {gear.holes.map((hole, k) => (
                <circle
                  key={k}
                  cx={hole.x}
                  cy={hole.y}
                  r={hole.r}
                  fill="var(--bg)"
                  stroke="var(--gear-stroke)"
                  strokeWidth={2}
                />
              ))}
            </g>
          </g>
        );
      })}
    </svg>
  );
}
