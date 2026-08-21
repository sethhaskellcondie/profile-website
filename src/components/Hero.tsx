import { site, skillGroups } from '../data/site';
import { photoFor, type ThemeId } from '../data/themes';
import { RotatingWord } from './RotatingWord';
import { SkillChip } from './SkillChip';
import { useSkillHighlight } from './SkillHighlight';
import './Hero.css';

interface Props {
  theme: ThemeId;
  reducedMotion: boolean;
}

export function Hero({ theme, reducedMotion }: Props) {
  const { hasActive, clear } = useSkillHighlight();

  return (
    <section className="hero">
      <div className="card hero__card">
        <div className="hero__body">
          <div className="hero__eyebrow">{site.eyebrow}</div>

          <h1 className="hero__headline">
            <RotatingWord words={site.heroWords} paused={reducedMotion} />
          </h1>

          <div className="hero__skills">
            {skillGroups.map((group) => (
              <div key={group.label} className="hero__skill-row">
                <div className="hero__skill-label">{group.label}</div>
                <div className="hero__skill-chips">
                  {group.items.map((skill) => (
                    <SkillChip key={skill} name={skill} />
                  ))}
                </div>
              </div>
            ))}
            {hasActive && (
              <button type="button" className="text-button" onClick={clear}>
                Clear highlights
              </button>
            )}
          </div>

          <div className="hero__cta">
            <a className="btn-primary" href={site.resume} target="_blank" rel="noopener">
              Download résumé
            </a>
            <a className="btn-secondary" href="#projects">
              See my projects
            </a>
          </div>
        </div>

        <img className="hero__photo" src={photoFor(theme)} alt={site.name} />
      </div>
    </section>
  );
}
