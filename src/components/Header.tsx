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
  return (
    <header className={`header${gearsOnly ? ' header--bare' : ''}`}>
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

        <div className="panel theme-picker" role="radiogroup" aria-label="Color theme">
          {themes.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={theme === option.id}
              className={`btn-ghost${theme === option.id ? ' is-active' : ''}`}
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
          {/* Clipped rather than removed on narrow screens, so the checkbox keeps
              its accessible name once the glyph is all that's visible. The copy
              names whatever the theme is actually about to reveal. */}
          <span className="gears-toggle__text">
            {theme === 'arcade' ? 'Invaders only' : 'Gears only'}
          </span>
        </label>
      </nav>
    </header>
  );
}
