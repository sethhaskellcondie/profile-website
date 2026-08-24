import { site } from '../data/site';
import './Contact.css';

export function Contact() {
  return (
    <section id="contact" className="section section--last">
      <div className="card contact">
        <div className="contact__body">
          <h2 className="section-label">Contact</h2>
          <p className="contact__lead">{site.contact.heading}</p>
          <p className="contact__sub">{site.contact.sub}</p>
          <div className="meta contact__details">{site.email}</div>
        </div>

        <div className="contact__actions">
          <a className="btn btn--primary" href={`mailto:${site.email}`}>
            Email me
          </a>
          <a className="btn btn--secondary" href={site.github} target="_blank" rel="noopener">
            GitHub
          </a>
          <a className="btn btn--secondary" href={site.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
