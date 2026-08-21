/**
 * The three themes. `id` matches a [data-theme] block in styles/tokens.css and a
 * backdrop entry in backdrops/registry.ts; `photo` is the hero portrait to show.
 */
export const themes = [
  { id: 'light', label: 'Light', photo: '/profile-professional.jpg' },
  { id: 'dark', label: 'Dark', photo: '/profile-professional.jpg' },
  { id: 'arcade', label: 'Fun', photo: '/profile-jacket.jpg' },
] as const;

export type ThemeId = (typeof themes)[number]['id'];

export const DEFAULT_THEME: ThemeId = 'dark';

/** localStorage key holding the visitor's chosen theme. */
export const THEME_STORAGE_KEY = 'sc-portfolio-theme';

export function isThemeId(value: unknown): value is ThemeId {
  return themes.some((t) => t.id === value);
}

export function photoFor(theme: ThemeId): string {
  return (themes.find((t) => t.id === theme) ?? themes[1]).photo;
}
