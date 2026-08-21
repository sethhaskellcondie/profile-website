import { site } from '../data/site';
import './About.css';

export function About() {
  return (
    <section id="about" className="section">
      <div className="card about">
        <h2 className="section-label about__label">About</h2>
        <div className="about__body">
          <p className="about__lead">{site.about.lead}</p>
          <p className="about__secondary">{site.about.secondary}</p>
          <div className="about__footnote">{site.about.footnote}</div>
        </div>
      </div>
    </section>
  );
}
