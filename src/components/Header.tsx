import { useEffect, useRef } from 'react';
import { site } from '../data/site';
import { themes, type ThemeId } from '../data/themes';
import { ThemeGlyph } from './ThemeGlyph';
import './Header.css';

interface Props {
  theme: ThemeId;
  onPick: (theme: ThemeId) => void;
  gearsOnly: boolean;
  onToggleGearsOnly: (on: boolean) => void;
}

export function Header({ theme, onPick, gearsOnly, onToggleGearsOnly }: Props) {
  const header = useRef<HTMLElement>(null);

  // The header is sticky, so anchor jumps have to stop short of it. Its height
  // depends on the viewport (the controls tighten and stack on a phone), so it is
  // measured rather than declared: --header-h on <html> feeds scroll-padding-top
  // in global.css, and tokens.css carries the estimate used before hydration.
  useEffect(() => {
    const el = header.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={header} className={`header${gearsOnly ? ' header--bare' : ''}`}>
      <div className="header__identity">
        <span className="header__name">{site.name}</span>
        <span className="label header__title">{site.title}</span>
      </div>

      <nav className="header__nav">
        <div className="header__links">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="header__link">
              {item.label}
            </a>
          ))}
        </div>

        <div className="panel theme-picker" role="group" aria-label="Color theme">
          {/* Toggle buttons rather than a radio group: a radio group promises one
              tab stop and arrow keys between options, and these are three ordinary
              buttons. The lit segment is styled off the theme on <html>
              (Header.css), not off React state, so it is right before hydration. */}
          {themes.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={theme === option.id}
              className="btn-ghost theme-picker__option"
              data-theme-id={option.id}
              onClick={() => onPick(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <label className="label gears-toggle">
          <input
            type="checkbox"
            className="gears-toggle__input"
            checked={gearsOnly}
            onChange={(event) => onToggleGearsOnly(event.target.checked)}
          />
          <ThemeGlyph theme={theme} size="14px" boreRadius={28} />
          {/* Both captions are in the HTML and Header.css shows the one naming what
              the theme is about to reveal, so the label is right before hydration.
              Clipped rather than removed on narrow screens, so the checkbox keeps
              its accessible name once the glyph is all that's visible. */}
          <span className="gears-toggle__text gears-toggle__text--gears">Gears only</span>
          <span className="gears-toggle__text gears-toggle__text--sprites">Invaders only</span>
        </label>
      </nav>
    </header>
  );
}
