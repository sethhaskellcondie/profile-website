import { useEffect, useMemo, useRef } from 'react';
import { backdropConfig } from '../config';
import type { BackdropProps } from '../types';
import { buildFleet, designs, frameAt, VIEWBOX } from './fleet';

// Element id for one design's one pose, as referenced from <defs>.
const frameId = (design: number, frame: number) => `if-${design}-${frame}`;

/**
 * The arcade backdrop: a fleet of invaders tumbling behind the page. Same clock as
 * the gear field — the host's eased scroll phase — but where a gear answered it by
 * turning, a sprite answers it by changing pose. Scrolling marches the fleet.
 *
 * Each sprite is a <use> pointed at a pose in <defs>, so stepping one is a single
 * href write against geometry that exists once in the document, however many
 * invaders are on screen.
 */
export default function InvaderField({ onFrame, density, paused }: BackdropProps) {
  const fleet = useMemo(() => buildFleet(), []);
  // Placement order is random, so any prefix is still an evenly spread field.
  const visible = useMemo(
    () => fleet.slice(0, Math.max(8, Math.round(fleet.length * density))),
    [fleet, density],
  );

  const nodes = useRef<(SVGUseElement | null)[]>([]);

  useEffect(() => {
    if (paused) return;

    // What each sprite is currently showing. A sprite changes pose every few dozen
    // degrees of phase, so most frames most of them have nothing to do — tracking it
    // turns a fleet-wide write per frame into a handful.
    const showing = new Int8Array(visible.length).fill(-1);

    return onFrame((phase) => {
      for (let i = 0; i < visible.length; i++) {
        const frame = frameAt(visible[i], phase);
        if (showing[i] === frame) continue;
        showing[i] = frame;
        nodes.current[i]?.setAttribute('href', `#${frameId(visible[i].design, frame)}`);
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
      <defs>
        {designs.map((design, d) =>
          design.paths.map((path, f) => (
            // No fill here: the paint is set on each <use>, so one definition serves
            // every sprite wearing that pose whatever tone it is drawn in.
            <path key={frameId(d, f)} id={frameId(d, f)} d={path} />
          )),
        )}
      </defs>

      {visible.map((sprite, i) => {
        const accent = i % backdropConfig.invaderAccentEvery === 0;
        const { width, height } = designs[sprite.design];

        return (
          <use
            key={i}
            ref={(el) => {
              nodes.current[i] = el;
            }}
            href={`#${frameId(sprite.design, frameAt(sprite, 0))}`}
            // Read right to left: centre the grid on its own middle, size it, tumble
            // it, then drop it where the fleet put it.
            transform={
              `translate(${sprite.cx.toFixed(1)} ${sprite.cy.toFixed(1)})` +
              `rotate(${sprite.angle.toFixed(1)})` +
              `scale(${sprite.scale})` +
              `translate(${-width / 2} ${-height / 2})`
            }
            fill={accent ? 'var(--accent)' : sprite.near ? 'var(--gear-rim)' : 'var(--gear-lit)'}
            style={{ transition: 'fill 260ms ease' }}
          />
        );
      })}
    </svg>
  );
}
