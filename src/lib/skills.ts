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
