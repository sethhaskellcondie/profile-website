import { site } from '../data/site';
import { themes, type ThemeId } from '../data/themes';
import './Header.css';

interface Props {
  theme: ThemeId;
  onPick: (theme: ThemeId) => void;
}

export function Header({ theme, onPick }: Props) {
  return (
    <header className="header">
      <div className="header__identity">
        <span className="header__name">{site.name}</span>
        <span className="header__title">{site.title}</span>
      </div>

      <nav className="header__nav">
        <div className="header__links">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="header__link">
              {item.label}
            </a>
          ))}
        </div>

        <div className="theme-picker" role="radiogroup" aria-label="Color theme">
          {themes.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={theme === option.id}
              className={`theme-picker__button${theme === option.id ? ' is-active' : ''}`}
              onClick={() => onPick(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
