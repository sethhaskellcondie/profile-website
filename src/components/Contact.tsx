import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site';
import './Contact.css';

export function Contact() {
  // The address is joined only when a visitor asks for it — see site.email. Until
  // then it is in neither the served HTML nor the DOM, which defeats the scrapers
  // that run the page's scripts as well as the ones that only read it. Without
  // scripts the button does nothing; GitHub and LinkedIn still stand.
  const [email, setEmail] = useState<string | null>(null);
  const address = useRef<HTMLAnchorElement>(null);

  // The revealed address is the thing to act on next, so focus moves to it: a
  // keyboard user presses Enter on the button and lands on the mailto link.
  useEffect(() => {
    if (email) address.current?.focus();
  }, [email]);

  return (
    <section id="contact" className="section section--last">
      <div className="card contact">
        <h2 className="section-label contact__label">Contact</h2>
        <div className="contact__body">
          <div className="contact__copy">
            <p className="contact__lead">{site.contact.heading}</p>
            <p className="contact__sub">{site.contact.sub}</p>
            {/* Holds its line before the reveal, so nothing below it moves when the
                address arrives. */}
            <div id="contact-email" className="meta contact__details">
              {email ? (
                <a ref={address} href={`mailto:${email}`}>
                  {email}
                </a>
              ) : (
                '\u00a0'
              )}
            </div>
          </div>

          <div className="contact__actions">
            {/* Toggles the address rather than spending itself on the first click.
                Both labels are the same length, so the button keeps its width and
                its place — the address appearing is the only layout that changes. */}
            <button
              type="button"
              className="btn btn--primary"
              aria-expanded={email !== null}
              aria-controls="contact-email"
              onClick={() => setEmail(email ? null : `${site.email.user}@${site.email.domain}`)}
            >
              {email ? 'Hide email' : 'Show email'}
            </button>
            {/* Same file as the header's link. `download` saves it rather than
                handing it to the browser's PDF viewer, which is what a visitor
                who has read this far down the page is after. */}
            <a
              className="btn btn--secondary"
              href={site.resume.href}
              download={site.resume.filename}
            >
              Download résumé
            </a>
            <a className="btn btn--secondary" href={site.github} target="_blank" rel="noopener">
              GitHub
            </a>
            <a className="btn btn--secondary" href={site.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
