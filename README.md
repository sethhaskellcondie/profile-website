# Personal profile site

Single-page profile site for Seth Condie. Astro renders the page to static HTML at
build time; one React island carries the interactive parts.

## Running it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site into dist/
npm run preview    # serve the built site
npm run check      # type + template check
npm run format     # prettier
```

## Where things live

| I want to…                            | Edit                                                                                       |
| ------------------------------------- | ------------------------------------------------------------------------------------------ |
| Add or change a job                   | `src/data/roles.ts`                                                                        |
| Add a project card                    | `src/data/projects.ts`                                                                     |
| Change name, copy, links, résumé path | `src/data/site.ts`                                                                         |
| Change a color, size, space, or font  | `src/styles/tokens.css`                                                                    |
| Change how a button or card looks     | `src/styles/recipes.css`                                                                   |
| Swap the résumé or a photo            | drop the file in `public/`                                                                 |
| Add a theme                           | a block in `tokens.css` + an entry in `src/data/themes.ts` and `src/backdrops/registry.ts` |

Roles are ordered newest first; `RECENT_COUNT` in `roles.ts` decides how many land in
the timeline's first track, and the track labels derive their year ranges from the data.

## How it fits together

- `src/pages/index.astro` — document head, metadata, and a small inline script that
  applies the stored theme before first paint so there's no flash of the default palette.
- `src/components/Portfolio.tsx` — the island root: theme state, the "gears only" flag, and
  the section list. "Gears only" empties the page down to the backdrop; it fades `.page` out
  and marks it `inert` rather than unmounting it, because the gears turn off scroll position
  and the document has to keep its height or the field would freeze.
- `src/components/SkillHighlight.tsx` — the page-wide set of highlighted skills, so
  clicking "Kotlin" in the hero also lights it up on the Canopy role. Names are matched
  after stripping trailing version numbers, which is how "Java 25" matches "Java".
- Styling is plain CSS with custom properties, in two layers. `src/styles/tokens.css` holds
  the palette plus the type, space, radius, and motion scales — nothing else hardcodes a
  color, size, or duration, and every theme is one `[data-theme]` block. `src/styles/recipes.css`
  holds the shared vocabulary built on those tokens; a new section should be buildable out
  of it without inventing a variant:

  | Family   | Classes                                                                            |
  | -------- | ---------------------------------------------------------------------------------- |
  | Surfaces | `.card`, `.card--wide`, `.panel`                                                   |
  | Buttons  | `.btn` + `--primary` / `--secondary` / `--mono`, `.btn-ghost`, `.chip` + `--small` |
  | Text     | `.section-label`, `.label` + `--accent`, `.meta` + `--strong`                      |

  Section headings use `--font-display`, so a theme that swaps the display face (arcade)
  reaches them; every smaller label uses `--font-mono`. Interactive chrome hovers to
  `--accent`; only links inside body copy warm to `--accent-2`.

### Backdrops

The animated layer behind the page is pluggable. `src/components/Backdrop.tsx` owns the
only scroll listener and the only `requestAnimationFrame` loop on the page, and passes the
eased scroll phase to whichever backdrop the current theme asks for.

To add one: write a component under `src/backdrops/<name>/` taking `BackdropProps`
(`src/backdrops/types.ts`), then point a theme at it in `src/backdrops/registry.ts`.
Entries are dynamic imports, so a visitor only downloads the backdrop they can see.

Backdrops draw imperatively inside the frame callback — 70-odd gears re-rendering through
React every frame would drop frames. They also get a `density` (halved on phones) and a
`paused` flag (`prefers-reduced-motion`, or a hidden tab); the host handles both, so every
future backdrop inherits the same motion budget.

Tunables live in `src/backdrops/config.ts`.

## Deploying

Static output — `npm run build` produces `dist/`, which any static host will serve.
Set `site` in `astro.config.mjs` to the real domain so canonical and Open Graph URLs
are absolute.
