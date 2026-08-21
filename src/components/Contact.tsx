import { site } from '../data/site';
import './Contact.css';

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="card contact">
        <div className="contact__body">
          <h2 className="contact__heading">{site.contact.heading}</h2>
          <p className="contact__sub">{site.contact.sub}</p>
          <div className="contact__details">
            {site.email} · {site.phone}
          </div>
        </div>

        <div className="contact__actions">
          <a className="btn-primary" href={`mailto:${site.email}`}>
            Email me
          </a>
          <a className="btn-secondary" href={site.github} target="_blank" rel="noopener">
            GitHub
          </a>
          <a className="btn-secondary" href={site.linkedin} target="_blank" rel="noopener">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
