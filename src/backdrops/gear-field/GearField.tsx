import { useEffect, useMemo, useRef } from 'react';
import type { BackdropProps } from '../types';
import { buildGears, VIEWBOX } from './gears';

/** Every fifth gear is stroked in the accent color to break up the field. */
const ACCENT_EVERY = 5;

export default function GearField({ onFrame, density, paused }: BackdropProps) {
  const gears = useMemo(() => buildGears(), []);
  // Any prefix of the train is still a valid mesh, so thinning is just a slice.
  const visible = useMemo(
    () => gears.slice(0, Math.max(8, Math.round(gears.length * density))),
    [gears, density],
  );

  const nodes = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    if (paused) return;
    // Write transforms straight to the DOM: 72 gears re-rendering through React
    // every frame would drop frames.
    return onFrame((phase) => {
      for (let i = 0; i < visible.length; i++) {
        const node = nodes.current[i];
        if (node) {
          node.setAttribute(
            'transform',
            `rotate(${(visible[i].offset + phase * visible[i].speed).toFixed(3)})`,
          );
        }
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
      {visible.map((gear, i) => {
        const stroke = i % ACCENT_EVERY === 0 ? 'var(--accent)' : 'var(--gear-stroke)';
        return (
          <g key={i} transform={`translate(${gear.cx.toFixed(1)} ${gear.cy.toFixed(1)})`}>
            <g
              ref={(el) => {
                nodes.current[i] = el;
              }}
              transform={`rotate(${gear.offset.toFixed(3)})`}
            >
              <path
                d={gear.d}
                fill="var(--gear-fill)"
                stroke={stroke}
                strokeWidth={2.5}
                strokeLinejoin="round"
                style={{ transition: 'fill 260ms ease, stroke 260ms ease' }}
              />
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
