import { projects } from '../data/projects';
import { SkillChip } from './SkillChip';
import './Projects.css';

export function Projects() {
  return (
    <section id="projects" className="section">
      <div className="card card--wide projects">
        <h2 className="section-label">Projects</h2>

        <div className="projects__grid">
          {projects.map((project) => (
            <article className="panel project" key={project.name}>
              <div className="project__head">
                <h3 className="project__name">{project.name}</h3>
                <div className="meta project__kind">{project.kind}</div>
              </div>

              <p className="project__blurb">{project.blurb}</p>

              <div className="project__tags">
                {project.tags.map((tag) => (
                  <SkillChip key={tag} name={tag} small />
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
          ))}
        </div>
      </div>
    </section>
  );
}
