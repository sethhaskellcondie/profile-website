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

| I want to…                            | Edit                                                                                                                                                              |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Add or change a job                   | `src/data/roles.ts`                                                                                                                                               |
| Add a project card                    | `src/data/projects.ts`                                                                                                                                            |
| Change name, copy, links, résumé path | `src/data/site.ts`                                                                                                                                                |
| Change a color, size, space, or font  | `src/styles/tokens.css`                                                                                                                                           |
| Change how a button or card looks     | `src/styles/recipes.css`                                                                                                                                          |
| Change the link-preview card or icons | replace `public/og-image.jpg` (1200×630), `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`                                                                 |
| Swap the résumé or a photo            | drop the file in `public/`                                                                                                                                        |
| Change which skills the hero shows    | flip `top` on the skill in `src/data/skills.ts` (or inline on the role)                                                                                           |
| Reuse a skill in a second job         | move it into `src/data/skills.ts` and import it                                                                                                                   |
| Add a theme                           | a block in `tokens.css`, an entry in `src/data/themes.ts` and `src/backdrops/registry.ts`, and a selector each in `Hero.css` (portrait) and `Header.css` (picker) |

Roles are ordered newest first. The timeline steps through them one at a time, and the
position readout derives its year range from each role's `period`, so adding a job is one
object at the top of the array and nothing else.

## Skill chips

Every chip on the page — hero, timeline, project tags — is a `Skill` object
(`src/lib/skills.ts`). There is no separate list of hero skills to keep in sync:

```ts
{ text: 'Kotlin', order: 5, top: true, category: 'Languages' }
{ text: 'Datadog', order: 77, top: false }   // category is optional
```

| Field      | Does what                                                                           |
| ---------- | ----------------------------------------------------------------------------------- |
| `text`     | The label, and the key everything matches on                                        |
| `order`    | Sort position in the hero; unique across the whole site                             |
| `top`      | `true` lifts the skill into the hero card                                           |
| `category` | Hero grouping — `Languages`, `Frameworks`, …; omit it and the skill lands in `More` |

A skill claimed by more than one role or project is declared once in `src/data/skills.ts`
and imported where it's used, so the two copies can't drift apart on `top` or `category`:

```ts
import { MICROSERVICES, POSTGRESQL } from './skills';

skills: [MICROSERVICES, POSTGRESQL, { text: 'Datadog', order: 77, top: false }],
```

A skill used in exactly one place stays inline on that role or project — there's nothing
to keep in sync. Promote it to `skills.ts` the moment something else claims it, rather than
copying the literal.

`order` is unique across every skill, inline ones included, and runs in bands so new entries
slot in without renumbering:

| Band    | Category                               |
| ------- | -------------------------------------- |
| `1–19`  | Languages                              |
| `20–39` | Frameworks, testing libraries included |
| `40–49` | Data                                   |
| `50–59` | Architecture                           |
| `60–69` | Leadership                             |
| `70+`   | everything else, grouped under `More`  |

Within a band the `top` skills come first, so expanding the card appends to each row rather
than reshuffling it — the shortlist stays put and the rest fills in behind it. A new `top`
skill goes at the head of its band. `skills.ts` leaves a comment where each inline skill's
number sits, so the free numbers are visible in one place.

The hero calls `skillCategories()` over every role and project, which filters to `top`,
dedupes by name, sorts by `order`, and groups by `category`. Every category gets its own
row on the card, ordered by its lowest-ordered skill, except `More`, which always trails —
so the bands above are what fixes the row order, and a new skill needs a number from the
right band rather than the next one free. Updating a job's skills updates the hero
automatically; a skill only reaches the hero if some job or project claims it.

Inside a role or project, chips render in the order you list them — `order` only drives
the hero.

Names match after normalizing (lowercased, trailing version numbers stripped), so a project
tag `Java 25` and the hero chip `Java` would be the same skill for highlighting and for
deduping.

## How it fits together

- `src/pages/index.astro` — document head, metadata (the Open Graph card, a JSON-LD `Person`,
  `theme-color`), and a small inline script that applies the stored theme before first
  paint so there's no flash of the default palette.
  The island's markup is theme-agnostic to match — every portrait, both glyph forms, and
  every picker state are in the HTML and `[data-theme]` picks between them — so a
  returning visitor's page is also right before hydration, not only after.
- `src/components/Portfolio.tsx` — the island root: theme state, the "gears only" flag, and
  the section list. "Gears only" empties the page down to the backdrop; it fades `.page` out
  and marks it `inert` rather than unmounting it, because the gears turn off scroll position
  and the document has to keep its height or the field would freeze.
- `src/components/SkillHighlight.tsx` — the page-wide set of highlighted skills, so
  clicking "Kotlin" in the hero also lights it up on the Canopy role. See
  [Skill chips](#skill-chips) for how a chip is declared and matched.
- `src/components/Contact.tsx` — joins the email address from the two halves in
  `site.ts` only when a visitor clicks "Show email", so it is in neither the served HTML
  nor the DOM for scrapers to lift.
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
