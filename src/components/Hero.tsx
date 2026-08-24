import { useState } from 'react';
import { projects } from '../data/projects';
import { roles } from '../data/roles';
import { site } from '../data/site';
import { photoFor, PHOTO_HEIGHT, PHOTO_WIDTH, type ThemeId } from '../data/themes';
import { skillCategories } from '../lib/skills';
import { RotatingWord } from './RotatingWord';
import { SkillChip } from './SkillChip';
import './Hero.css';

interface Props {
  theme: ThemeId;
  reducedMotion: boolean;
}

export function Hero({ theme, reducedMotion }: Props) {
  const [showAll, setShowAll] = useState(false);
  const categories = skillCategories(
    [...roles.map((role) => role.skills), ...projects.map((project) => project.tags)],
    showAll,
  );

  return (
    <section className="section section--first">
      <div className="card hero__card">
        <div className="hero__body">
          <div className="label label--accent hero__eyebrow">
            {site.eyebrow.map((point) => (
              <span key={point} className="hero__eyebrow-point">
                {point}
              </span>
            ))}
          </div>

          <h1 className="hero__headline">
            <RotatingWord words={site.heroWords} theme={theme} paused={reducedMotion} />
          </h1>

          <div className="hero__skills">
            {/* The chips are toggles that highlight the same skill everywhere it
                appears further down the page; without a nudge there is nothing to
                suggest they are clickable at all. */}
            <p className="meta hero__skill-hint">
              Click on the skills that are important to you before scrolling down.
            </p>
            <div id="hero-skills" className="hero__skill-groups">
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
            </div>
            {/* The card leads with the shortlist; this opens it up to everything
                the roles and projects claim, for the reader who wants the full
                stack rather than the headline. */}
            <button
              type="button"
              className="btn-ghost hero__skill-toggle"
              aria-expanded={showAll}
              aria-controls="hero-skills"
              onClick={() => setShowAll((current) => !current)}
            >
              {showAll ? 'Show top skills' : 'Show all skills'}
            </button>
          </div>
        </div>

        {/* The page's LCP element, and the browser only finds it after the island
            hydrates — fetchPriority pulls it forward. The intrinsic size matches the
            4:5 box .hero__photo reserves, so a failed stylesheet still lays out. */}
        <img
          className="hero__photo"
          src={photoFor(theme)}
          alt={site.name}
          width={PHOTO_WIDTH}
          height={PHOTO_HEIGHT}
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
