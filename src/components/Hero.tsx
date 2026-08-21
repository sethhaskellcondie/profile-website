import { projects } from '../data/projects';
import { roles } from '../data/roles';
import { site } from '../data/site';
import { photoFor, type ThemeId } from '../data/themes';
import { topSkillCategories } from '../lib/skills';
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
  const categories = topSkillCategories([
    ...roles.map((role) => role.skills),
    ...projects.map((project) => project.tags),
  ]);

  return (
    <section className="section section--first">
      <div className="card hero__card">
        <div className="hero__body">
          <div className="label label--accent hero__eyebrow">{site.eyebrow}</div>

          <h1 className="hero__headline">
            <RotatingWord words={site.heroWords} paused={reducedMotion} />
          </h1>

          <div className="hero__skills">
            {categories.map((category) => (
              <div key={category.label} className="hero__skill-row">
                <div className="label hero__skill-label">{category.label}</div>
                <div className="hero__skill-chips">
                  {category.items.map((skill) => (
                    <SkillChip key={skill.text} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
            {hasActive && (
              <button type="button" className="btn-ghost" onClick={clear}>
                Clear highlights
              </button>
            )}
          </div>

          <div className="hero__cta">
            <a className="btn btn--primary" href="#projects">
              See the proof
            </a>
            <a className="btn btn--secondary" href="#contact">
              Contact me
            </a>
          </div>
        </div>

        <img className="hero__photo" src={photoFor(theme)} alt={site.name} />
      </div>
    </section>
  );
}
