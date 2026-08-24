import { useEffect, useRef, useState } from 'react';
import { positionLabel, roles, type Role } from '../data/roles';
import type { ThemeId } from '../data/themes';
import { marchLikeGear } from './InvaderGlyph';
import { SkillChip } from './SkillChip';
import { ThemeGlyph } from './ThemeGlyph';
import { useSkillHighlight } from './SkillHighlight';
import './Experience.css';

// Degrees the footer glyphs turn per step, and how long they take over it. The
// sprites march over the same window instead — see marchLikeGear.
const GLYPH_TURN = 120;
const GLYPH_DURATION = 700;
// The fade at either end of the window, from Experience.css. The track pads by
// the same amount, so a parked role sits just under the top fade and the last
// role clears the bottom one; read from the CSS rather than carried as a copy.
const edgeOf = (box: HTMLElement) =>
  parseFloat(getComputedStyle(box).getPropertyValue('--edge')) || 0;
const LAST = roles.length - 1;

interface Props {
  theme: ThemeId;
  reducedMotion: boolean;
}

/**
 * A window over the timeline that only ever moves under its own controls — the
 * step buttons in the head and the gear nodes on the spine. Nothing here reacts
 * to wheel or drag, so a narrow viewport can always scroll past the card. The
 * window is never shorter than the tallest role (see the ResizeObserver below),
 * and every stop is measured off the real row at click time rather than
 * assumed, so no part of a role is ever out of reach however tall it wraps.
 */
export function Experience({ theme, reducedMotion }: Props) {
  const [index, setIndex] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);
  // One scroll anchor per role, indexed to match `roles`.
  const anchors = useRef<(HTMLDivElement | null)[]>([]);
  const backGlyph = useRef<SVGSVGElement>(null);
  const nextGlyph = useRef<SVGSVGElement>(null);
  const turn = useRef(0);
  const stopMarch = useRef<(() => void) | null>(null);
  const arcade = theme === 'arcade';

  // Experience.css gives the window a fixed height, which on a phone is shorter
  // than a role with a dozen chips — and with no scroller of its own, whatever
  // ran past the bottom would be out of reach. So the tallest row is measured
  // and handed over as --row-h (plus the fade at both ends), and the window
  // takes the larger of the two. All the rows are watched, because a resize
  // re-wraps them and the fonts arriving after hydration can move any of them.
  useEffect(() => {
    const box = viewport.current;
    const rows = anchors.current.filter((row): row is HTMLDivElement => row !== null);
    if (!box || rows.length === 0) return;

    const observer = new ResizeObserver(() => {
      const tallest = Math.max(...rows.map((row) => row.offsetHeight));
      box.style.setProperty('--row-h', `${tallest + 2 * edgeOf(box)}px`);
    });
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  const goTo = (target: number) => {
    const next = Math.max(0, Math.min(LAST, target));
    if (next === index) return;
    setIndex(next);
    advance(next > index ? 1 : -1);

    const box = viewport.current;
    const anchor = anchors.current[next];
    if (!box || !anchor) return;

    // Clamped to the end of the track, so stepping onto a short final role parks
    // the window on real content instead of on empty space below it.
    const limit = Math.max(box.scrollHeight - box.clientHeight, 0);
    box.scrollTo({
      top: Math.min(Math.max(anchor.offsetTop - edgeOf(box), 0), limit),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const advance = (direction: number) => {
    if (reducedMotion) return;

    if (arcade) {
      // A sprite has no direction to counter-rotate in, so the pair simply steps
      // together — which is how a row of invaders moves anyway.
      stopMarch.current?.();
      const stops = [backGlyph.current, nextGlyph.current]
        .filter((glyph): glyph is SVGSVGElement => glyph !== null)
        .map((glyph) => marchLikeGear(glyph, GLYPH_TURN, GLYPH_DURATION));
      stopMarch.current = () => stops.forEach((stop) => stop());
      return;
    }

    const from = turn.current;
    turn.current += direction * GLYPH_TURN;
    // The two glyphs read as a meshed pair, so they counter-rotate.
    rotate(backGlyph.current, -from, -turn.current);
    rotate(nextGlyph.current, from, turn.current);
  };

  const register = (i: number, el: HTMLDivElement | null) => {
    anchors.current[i] = el;
  };

  // A keyboard user can tab straight into a role the window is not parked on: the
  // browser scrolls the box to reveal the focused chip and tells no one, so the
  // readout, the ring and the step buttons would go on describing another role.
  // Parking the window on the row that took focus keeps them honest. The
  // :focus-visible test keeps a mouse click on a chip from moving the window.
  const onFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (!target.matches(':focus-visible')) return;
    const row = anchors.current.findIndex((el) => el?.contains(target));
    if (row >= 0) goTo(row);
  };

  return (
    <section id="work" className="section">
      <div className="card card--wide experience">
        <div className="timeline__head">
          <div className="experience__title">
            <h2 className="section-label">Experience Timeline</h2>
            <div className="label timeline__position">{positionLabel(index)}</div>
          </div>

          <div className="timeline__steps">
            <button
              type="button"
              className="btn btn--secondary btn--mono timeline__step"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-controls="timeline"
            >
              <ThemeGlyph ref={backGlyph} theme={theme} size="16px" boreRadius={28} />
              Back
            </button>

            <button
              type="button"
              className="btn btn--secondary btn--mono timeline__step"
              onClick={() => goTo(index + 1)}
              disabled={index === LAST}
              aria-controls="timeline"
            >
              Next
              <ThemeGlyph ref={nextGlyph} theme={theme} size="16px" boreRadius={28} />
            </button>
          </div>
        </div>

        <div className="timeline__viewport" id="timeline" ref={viewport} onFocus={onFocus}>
          <div className="timeline">
            {roles.map((role, i) => (
              <TimelineRow
                key={`${role.company}-${role.period}`}
                role={role}
                index={i}
                theme={theme}
                here={i === index}
                onSelect={goTo}
                register={register}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function rotate(glyph: SVGSVGElement | null, from: number, to: number) {
  if (!glyph) return;
  const spin = glyph.animate(
    [{ transform: `rotate(${from}deg)` }, { transform: `rotate(${to}deg)` }],
    {
      duration: GLYPH_DURATION,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards',
    },
  );
  // A forward-filling animation is kept alive to hold its end state, and every
  // step would leave one more behind for as long as the tab is open. Bake the
  // resting angle into the element instead and let the animation go.
  spin.onfinish = () => {
    glyph.style.transform = `rotate(${to}deg)`;
    spin.cancel();
  };
}

interface RowProps {
  role: Role;
  index: number;
  theme: ThemeId;
  // The role the window is parked on — the one wearing the node ring.
  here: boolean;
  onSelect: (index: number) => void;
  register: (index: number, el: HTMLDivElement | null) => void;
}

function TimelineRow({ role, index, theme, here, onSelect, register }: RowProps) {
  const { isActive } = useSkillHighlight();
  // One lit chip is enough to light the role it belongs to.
  const lit = role.skills.some((skill) => isActive(skill.text));

  return (
    <div className={`timeline__row${lit ? ' is-lit' : ''}`} ref={(el) => register(index, el)}>
      <div className="timeline__date">
        <div className="meta meta--strong timeline__period">{role.period}</div>
        <div className="meta timeline__place">{role.place}</div>
      </div>

      <div className="timeline__spine">
        <span className="timeline__rule" />
        <button
          type="button"
          className={`timeline__node-btn${here ? ' is-here' : ''}`}
          onClick={() => onSelect(index)}
          aria-controls="timeline"
          aria-current={here ? 'true' : undefined}
          aria-label={`${role.title}, ${role.company}, ${role.period}`}
        >
          <ThemeGlyph theme={theme} size="20px" filled className="timeline__node" />
        </button>
      </div>

      <div className="timeline__body">
        <div className="timeline__title">{role.title}</div>
        <div className="timeline__company">{role.company}</div>
        <ul className="timeline__blurb">
          {role.blurb.map((point) => (
            <li key={point} className="timeline__point">
              {point}
            </li>
          ))}
        </ul>
        <div className="timeline__chips">
          {role.skills.map((skill) => (
            <SkillChip key={skill.text} skill={skill} small />
          ))}
        </div>
      </div>
    </div>
  );
}
