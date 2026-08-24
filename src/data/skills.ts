import type { Skill } from '../lib/skills';

/**
 * Skills claimed by more than one role or project. A shared skill is declared
 * once here and imported wherever it's used, so the hero can't disagree with
 * itself about whether "Angular" is a top skill or which category it sits in.
 *
 * A skill used in exactly one place stays inline on that role or project —
 * there's nothing to keep in sync. Promote it here the moment a second job or
 * project claims it, rather than copying the literal.
 *
 * `order` is unique across every skill on the site, inline ones included, and
 * runs in bands so there's room to slot new entries in without renumbering:
 *
 *   1–19   Languages
 *   20–39  Frameworks, testing libraries included
 *   40–49  Data
 *   50–59  Architecture
 *   60–69  Leadership
 *   70+    everything else, which the hero groups under "More"
 *
 * The hero gives every category its own row, ordered by its lowest-ordered
 * skill — so the bands are also what fixes the row order on the card, and why
 * a new skill needs a number from the right band rather than the next one free.
 *
 * Within a band the `top` skills come first, so expanding the card appends to
 * each row rather than reshuffling it: the shortlist stays put and the rest
 * fills in behind it. A new `top` skill goes at the head of its band.
 */

// Languages — 1–19
export const JAVASCRIPT: Skill = { text: 'JavaScript', order: 1, top: true, category: 'Languages' };
export const TYPESCRIPT: Skill = { text: 'TypeScript', order: 2, top: true, category: 'Languages' };
export const JAVA: Skill = { text: 'Java', order: 3, top: true, category: 'Languages' };
export const PHP: Skill = { text: 'PHP', order: 4, top: true, category: 'Languages' };
// Inline: Kotlin 5
export const AI_FEATURE_DEVELOPMENT: Skill = {
  text: 'AI Feature Development',
  order: 6,
  top: true,
  category: 'Languages',
};
// Inline: Python 7, Go 8

// Frameworks — 20–39
export const REACT: Skill = { text: 'React', order: 20, top: true, category: 'Frameworks' };
// Inline: Laravel 21
export const SPRING_BOOT: Skill = {
  text: 'Spring Boot',
  order: 22,
  top: false,
  category: 'Frameworks',
};
// Inline: Node.js 23
export const ANGULAR: Skill = { text: 'Angular', order: 24, top: false, category: 'Frameworks' };
// Testing libraries sit at the tail of the band, with the frameworks they test against.
// Inline: Redux 25, Playwright 26, Junit 27, Kotest 28
export const PHP_UNIT: Skill = { text: 'PHP Unit', order: 29, top: false, category: 'Frameworks' };

// Data — 40–49
export const MYSQL: Skill = { text: 'MySQL', order: 40, top: true, category: 'Data' };
export const POSTGRESQL: Skill = { text: 'PostgreSQL', order: 41, top: true, category: 'Data' };
// Inline: MongoDB 42, NoSQL 43, Hibernate 44, Gorm 45

// Architecture — 50–59
export const SYSTEM_DESIGN: Skill = {
  text: 'System Design',
  order: 50,
  top: true,
  category: 'Architecture',
};
export const MICROSERVICES: Skill = {
  text: 'Microservices',
  order: 51,
  top: true,
  category: 'Architecture',
};
export const MONOLITH: Skill = {
  text: 'Monolith',
  order: 52,
  top: false,
  category: 'Architecture',
};
// Inline: API Design 53
export const INTEGRATIONS: Skill = {
  text: 'Integrations',
  order: 54,
  top: false,
  category: 'Architecture',
};

// Leadership — 60–69
export const MENTORING: Skill = { text: 'Mentoring', order: 60, top: true, category: 'Leadership' };
export const PROJECT_LEAD: Skill = {
  text: 'Project Lead',
  order: 61,
  top: true,
  category: 'Leadership',
};
// Inline: Team Lead 62, Conducted Technical Interviews 63

// More — 70+
export const AWS: Skill = { text: 'AWS', order: 70, top: true };
export const CLAUDE_CODE: Skill = { text: 'Claude Code', order: 71, top: true };
export const TEST_FIRST_DEVELOPMENT: Skill = {
  text: 'Test First Development',
  order: 72,
  top: true,
};
// Inline: MCP 73
export const DIGITAL_OCEAN: Skill = { text: 'DigitalOcean', order: 74, top: false };
// Inline: Vercel 75, Datadog 76, Keycloak 77
