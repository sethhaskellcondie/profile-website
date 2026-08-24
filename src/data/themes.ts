/**
 * The three themes. `id` matches a [data-theme] block in styles/tokens.css and a
 * backdrop entry in backdrops/registry.ts; `photo` is the hero portrait to show.
 */
export const themes = [
  { id: 'light', label: 'Light', photo: '/profile-professional.webp' },
  { id: 'dark', label: 'Dark', photo: '/profile-professional.webp' },
  { id: 'arcade', label: 'Fun', photo: '/profile-jacket.webp' },
] as const;

// The portraits are pre-cropped to the 4:5 box the hero renders them in and sized
// for a 2x display, so the browser downloads no pixels it will not draw. The
// link-preview card is a separate 1200×630 cut (public/og-image.jpg, see
// index.astro): previews crop toward 1.91:1, and some platforms will not take webp.
export const PHOTO_WIDTH = 680;
export const PHOTO_HEIGHT = 850;

export type ThemeId = (typeof themes)[number]['id'];

export const DEFAULT_THEME: ThemeId = 'dark';

// localStorage key holding the visitor's chosen theme.
export const THEME_STORAGE_KEY = 'sc-portfolio-theme';

export function isThemeId(value: unknown): value is ThemeId {
  return themes.some((t) => t.id === value);
}

export interface Portrait {
  src: string;
  // Every theme that shows this portrait.
  themes: ThemeId[];
}

/**
 * Each distinct portrait with the themes that show it. The hero renders all of
 * them and lets the theme on <html> pick one (see Hero.css), so the HTML is right
 * for a returning visitor before the island hydrates and learns which theme they
 * chose. Themes sharing a portrait share the one <img>.
 */
export const portraits: Portrait[] = themes.reduce<Portrait[]>((list, theme) => {
  const portrait = list.find((p) => p.src === theme.photo);
  if (portrait) portrait.themes.push(theme.id);
  else list.push({ src: theme.photo, themes: [theme.id] });
  return list;
}, []);
