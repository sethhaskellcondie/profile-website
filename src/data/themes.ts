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
// for a 2x display, so the browser downloads no pixels it will not draw. The .jpg
// originals stay in public/ for the Open Graph image, which link previews on some
// platforms will not take as webp.
export const PHOTO_WIDTH = 680;
export const PHOTO_HEIGHT = 850;

export type ThemeId = (typeof themes)[number]['id'];

export const DEFAULT_THEME: ThemeId = 'dark';

// localStorage key holding the visitor's chosen theme.
export const THEME_STORAGE_KEY = 'sc-portfolio-theme';

export function isThemeId(value: unknown): value is ThemeId {
  return themes.some((t) => t.id === value);
}

export function photoFor(theme: ThemeId): string {
  return (themes.find((t) => t.id === theme) ?? themes[1]).photo;
}
