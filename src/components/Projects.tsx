import { projects, type Project } from '../data/projects';
import { GearGlyph } from './GearGlyph';
import { SkillChip } from './SkillChip';
import { useSkillHighlight } from './SkillHighlight';
import './Projects.css';

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="card card--wide projects">
        <h2 className="section-label">Projects</h2>

        <div className="projects__grid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { isActive } = useSkillHighlight();
  // One lit chip is enough to light the project it belongs to.
  const lit = project.tags.some((tag) => isActive(tag.text));

  const classes = ['panel', 'project'];
  if (project.featured) classes.push('project--featured');
  if (lit) classes.push('is-lit');

  return (
    <article className={classes.join(' ')}>
      <div className="project__head">
        <div className="project__title">
          {/* The mount carries the placement and the idle halo; an SVG can't own a
              pseudo-element, and the gear itself needs its transform left free. */}
          <span className="project__gear-mount">
            <GearGlyph size="20px" filled className="project__gear" />
          </span>
          <h3 className="project__name">{project.name}</h3>
        </div>
        <div className="meta project__kind">{project.kind}</div>
      </div>

      <p className="project__blurb">{project.blurb}</p>

      <div className="project__tags">
        {project.tags.map((tag) => (
          <SkillChip key={tag.text} skill={tag} small />
        ))}
      </div>

      <div className="meta project__links">
        {project.links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener">
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
