import { useRef, useState } from 'react';
import { RECENT_COUNT, roles, trackLabel, type Role } from '../data/roles';
import { GearGlyph } from './GearGlyph';
import { SkillChip } from './SkillChip';
import './Experience.css';

/** Degrees the button's glyph turns each press. */
const GLYPH_TURN = 180;
/** Breathing room above the "Earlier" heading when the track scrolls to it. */
const SCROLL_OFFSET = 8;

interface Props {
  reducedMotion: boolean;
}

export function Experience({ reducedMotion }: Props) {
  const [track, setTrack] = useState<0 | 1>(0);
  const viewport = useRef<HTMLDivElement>(null);
  const earlier = useRef<HTMLDivElement>(null);
  const glyph = useRef<SVGSVGElement>(null);
  const turn = useRef(0);

  const recentRoles = roles.slice(0, RECENT_COUNT);
  const earlierRoles = roles.slice(RECENT_COUNT);

  const toggle = () => {
    const next: 0 | 1 = track === 0 ? 1 : 0;
    setTrack(next);

    if (glyph.current && !reducedMotion) {
      const from = turn.current;
      turn.current += next === 1 ? GLYPH_TURN : -GLYPH_TURN;
      glyph.current.animate(
        [{ transform: `rotate(${from}deg)` }, { transform: `rotate(${turn.current}deg)` }],
        { duration: 700, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' },
      );
    }

    viewport.current?.scrollTo({
      top: next === 1 && earlier.current ? earlier.current.offsetTop - SCROLL_OFFSET : 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section id="work" className="section">
      <div className="card card--wide experience">
        <div className="experience__head">
          <h2 className="section-label">Experience</h2>
          <div className="experience__track-label">{trackLabel(track)}</div>
        </div>

        <div className="experience__viewport" id="experience-timeline" ref={viewport}>
          <div className="timeline">
            <TimelineGroup label="Recent" roles={recentRoles} />
            <TimelineGroup label="Earlier" roles={earlierRoles} muted ref={earlier} />
          </div>
        </div>

        <div className="experience__footer">
          <button
            type="button"
            className="experience__toggle"
            onClick={toggle}
            aria-expanded={track === 1}
            aria-controls="experience-timeline"
          >
            <GearGlyph ref={glyph} size="16px" strokeWidth={16} boreRadius={28} />
            {track === 1 ? 'Back' : 'More'}
          </button>
        </div>
      </div>
    </section>
  );
}

interface GroupProps {
  label: string;
  roles: Role[];
  /** Earlier roles get muted spine nodes so the recent track reads as current. */
  muted?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

function TimelineGroup({ label, roles, muted = false, ref }: GroupProps) {
  return (
    <div className={`timeline__group${muted ? ' timeline__group--earlier' : ''}`} ref={ref}>
      <div className="timeline__row timeline__row--head">
        <div className="timeline__group-label">{label}</div>
        <div className="timeline__spine timeline__spine--stub">
          <span className="timeline__stub" />
        </div>
      </div>

      {roles.map((role) => (
        <div className="timeline__row" key={`${role.company}-${role.period}`}>
          <div className="timeline__date">
            <div className="timeline__period">{role.period}</div>
            <div className="timeline__place">{role.place}</div>
          </div>

          <div className="timeline__spine">
            <span className="timeline__rule" />
            <GearGlyph
              size="20px"
              filled
              className="timeline__node"
              style={{ color: muted ? 'var(--muted)' : 'var(--accent)' }}
            />
          </div>

          <div className="timeline__body">
            <div className="timeline__title">{role.title}</div>
            <div className="timeline__company">{role.company}</div>
            <p className="timeline__blurb">{role.blurb}</p>
            <div className="timeline__chips">
              {role.skills.map((skill) => (
                <SkillChip key={skill} name={skill} small />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
