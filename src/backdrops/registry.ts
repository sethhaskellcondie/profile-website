import { lazy } from 'react';
import type { ThemeId } from '../data/themes';
import type { BackdropComponent } from './types';

/**
 * Which backdrop each theme renders. Every entry is a dynamic import, so a visitor
 * only downloads the backdrop for the theme they are actually looking at.
 *
 * To add one: drop a component under src/backdrops/<name>/ that takes BackdropProps,
 * then point a theme at it here. Nothing else in the page changes.
 */
export const backdrops: Record<ThemeId, BackdropComponent> = {
  light: lazy(() => import('./gear-field/GearField')),
  dark: lazy(() => import('./gear-field/GearField')),
  arcade: lazy(() => import('./invader-field/InvaderField')),
};
