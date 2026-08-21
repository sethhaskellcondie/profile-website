/** A single skill chip. Declared on the role or project it belongs to. */
export interface Skill {
  text: string;
  /** Sort position in the hero. Equal orders sit next to each other. */
  order: number;
  /** Lift this skill into the hero card's chip list. */
  top: boolean;
  /** Hero grouping. Omit it and the skill lands in "More". */
  category?: string | null;
}

/** Where top skills without a category end up. */
export const MORE_CATEGORY = 'More';

export interface SkillCategory {
  label: string;
  items: Skill[];
}

/**
 * Chips match across the page by normalized name, so clicking "Kotlin" in the hero
 * also lights up the Canopy role. Trailing version numbers are stripped, which is
 * what makes the project tag "Java 25" match the hero chip "Java".
 */
export function normalizeSkill(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+\d+(\.\d+)?$/, '')
    .trim();
}

/**
 * The hero's chips are derived rather than hand-listed: flip `top` on a skill
 * anywhere in the roles or projects and it shows up here, so the highlight set
 * can never drift from the work it came from. A skill claimed by two jobs is
 * deduped by normalized name, keeping the lowest-ordered spelling — which is why
 * "Java" wins over the project's "Java 25".
 *
 * `includeAll` is the hero's expanded view: the same grouping and ordering, but
 * over every skill on the page rather than the `top` shortlist. Nothing else
 * changes, so a skill sits in the same category and the same position whether
 * the card is showing the shortlist or the whole set.
 */
export function skillCategories(
  sources: readonly (readonly Skill[])[],
  includeAll = false,
): SkillCategory[] {
  const unique = new Map<string, Skill>();
  for (const skill of sources.flat().filter((s) => includeAll || s.top)) {
    const key = normalizeSkill(skill.text);
    const claimed = unique.get(key);
    if (!claimed || skill.order < claimed.order) unique.set(key, skill);
  }

  const groups = new Map<string, Skill[]>();
  for (const skill of [...unique.values()].sort((a, b) => a.order - b.order)) {
    const label = skill.category ?? MORE_CATEGORY;
    const items = groups.get(label);
    if (items) items.push(skill);
    else groups.set(label, [skill]);
  }

  // Categories follow their lowest-ordered skill, except "More" — the catch-all
  // reads as a footnote, so it always trails the named groups.
  const more = groups.get(MORE_CATEGORY);
  groups.delete(MORE_CATEGORY);
  const categories = [...groups].map(([label, items]) => ({ label, items }));
  if (more) categories.push({ label: MORE_CATEGORY, items: more });
  return categories;
}
