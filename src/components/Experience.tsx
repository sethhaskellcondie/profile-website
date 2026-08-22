import { useRef, useState } from 'react';
import { positionLabel, roles, type Role } from '../data/roles';
import { GearGlyph } from './GearGlyph';
import { SkillChip } from './SkillChip';
import { useSkillHighlight } from './SkillHighlight';
import './Experience.css';

/** Degrees the footer glyphs turn per step. */
const GLYPH_TURN = 120;
/** Breathing room above the anchor the track scrolls to. */
const SCROLL_OFFSET = 8;
const LAST = roles.length - 1;

interface Props {
  reducedMotion: boolean;
}

/**
 * A fixed-height window over the timeline that only ever moves under its own
 * controls — the step buttons in the head and the gear nodes on the spine.
 * Nothing here reacts to wheel or drag, so a narrow viewport can always scroll
 * past the card, and every stop is measured off the real row at click time
 * rather than assumed, so no role becomes unreachable however tall it wraps.
 */
export function Experience({ reducedMotion }: Props) {
  const [index, setIndex] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);
  /** One scroll anchor per role, indexed to match `roles`. */
  const anchors = useRef<(HTMLDivElement | null)[]>([]);
  const backGlyph = useRef<SVGSVGElement>(null);
  const nextGlyph = useRef<SVGSVGElement>(null);
  const turn = useRef(0);

  const goTo = (target: number) => {
    const next = Math.max(0, Math.min(LAST, target));
    if (next === index) return;
    setIndex(next);
    spin(next > index ? 1 : -1);

    const box = viewport.current;
    const anchor = anchors.current[next];
    if (!box || !anchor) return;

    // Clamped to the end of the track, so stepping onto a short final role parks
    // the window on real content instead of on empty space below it.
    const limit = Math.max(box.scrollHeight - box.clientHeight, 0);
    box.scrollTo({
      top: Math.min(Math.max(anchor.offsetTop - SCROLL_OFFSET, 0), limit),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  const spin = (direction: number) => {
    if (reducedMotion) return;
    const from = turn.current;
    turn.current += direction * GLYPH_TURN;
    // The two glyphs read as a meshed pair, so they counter-rotate.
    rotate(backGlyph.current, -from, -turn.current);
    rotate(nextGlyph.current, from, turn.current);
  };

  const register = (i: number, el: HTMLDivElement | null) => {
    anchors.current[i] = el;
  };

  return (
    <section id="work" className="section">
      <div className="card card--wide experience">
        <div className="experience__head">
          <div className="experience__title">
            <h2 className="section-label">Experience</h2>
            <div className="label experience__position">{positionLabel(index)}</div>
          </div>

          <div className="experience__steps">
            <button
              type="button"
              className="btn btn--secondary btn--mono experience__step"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-controls="experience-timeline"
            >
              <GearGlyph ref={backGlyph} size="16px" boreRadius={28} />
              Back
            </button>

            <button
              type="button"
              className="btn btn--secondary btn--mono experience__step"
              onClick={() => goTo(index + 1)}
              disabled={index === LAST}
              aria-controls="experience-timeline"
            >
              Next
              <GearGlyph ref={nextGlyph} size="16px" boreRadius={28} />
            </button>
          </div>
        </div>

        <div className="experience__viewport" id="experience-timeline" ref={viewport}>
          <div className="timeline">
            {roles.map((role, i) => (
              <TimelineRow
                key={`${role.company}-${role.period}`}
                role={role}
                index={i}
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
  glyph?.animate([{ transform: `rotate(${from}deg)` }, { transform: `rotate(${to}deg)` }], {
    duration: 700,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    fill: 'forwards',
  });
}

interface RowProps {
  role: Role;
  index: number;
  /** The role the window is parked on — the one wearing the node ring. */
  here: boolean;
  onSelect: (index: number) => void;
  register: (index: number, el: HTMLDivElement | null) => void;
}

function TimelineRow({ role, index, here, onSelect, register }: RowProps) {
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
          aria-controls="experience-timeline"
          aria-current={here ? 'true' : undefined}
          aria-label={`${role.title}, ${role.company}, ${role.period}`}
        >
          <GearGlyph size="20px" filled className="timeline__node" />
        </button>
      </div>

      <div className="timeline__body">
        <div className="timeline__title">{role.title}</div>
        <div className="timeline__company">{role.company}</div>
        <p className="timeline__blurb">{role.blurb}</p>
        <div className="timeline__chips">
          {role.skills.map((skill) => (
            <SkillChip key={skill.text} skill={skill} small />
          ))}
        </div>
      </div>
    </div>
  );
}
