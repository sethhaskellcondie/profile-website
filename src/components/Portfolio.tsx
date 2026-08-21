import { useEffect, useState } from 'react';
import { DEFAULT_THEME, isThemeId, THEME_STORAGE_KEY, type ThemeId } from '../data/themes';
import { usePrefersReducedMotion } from '../lib/useMediaQuery';
import '../styles/recipes.css';
import { About } from './About';
import { Backdrop } from './Backdrop';
import { Contact } from './Contact';
import { Experience } from './Experience';
import { Header } from './Header';
import './Portfolio.css';
import { Projects } from './Projects';
import { Hero } from './Hero';
import { SkillHighlightProvider } from './SkillHighlight';

/**
 * The page's single interactive island. Everything below it renders server-side at
 * build time and then hydrates, so the HTML a crawler sees is the finished page.
 */
export default function Portfolio() {
  const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME);
  const reducedMotion = usePrefersReducedMotion();

  // The inline script in index.astro has already put the stored theme on <html> to
  // avoid a flash; this catches React up to it after hydration.
  useEffect(() => {
    const applied = document.documentElement.dataset.theme;
    if (isThemeId(applied)) setTheme(applied);
  }, []);

  const pick = (next: ThemeId) => {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing can refuse storage; the theme still applies for this visit.
    }
  };

  return (
    <SkillHighlightProvider>
      <Backdrop theme={theme} />
      <Header theme={theme} onPick={pick} />
      <main className="page">
        <Hero theme={theme} reducedMotion={reducedMotion} />
        <About />
        <Experience reducedMotion={reducedMotion} />
        <Projects />
        <Contact />
      </main>
    </SkillHighlightProvider>
  );
}
