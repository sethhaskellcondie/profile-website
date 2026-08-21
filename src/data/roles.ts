import type { Skill } from '../lib/skills';

export interface Role {
  period: string;
  place: string;
  title: string;
  company: string;
  blurb: string;
  skills: Skill[];
}

/**
 * Work history, newest first. The Experience timeline splits this list into two
 * tracks at RECENT_COUNT — the first N are "Recent", the rest are "Earlier".
 * Adding a job is one object at the top of this array; the timeline, the track
 * labels, and the skill chips all follow automatically.
 */
export const roles: Role[] = [
  {
    period: 'Apr 2025 — Mar 2026',
    place: 'Remote · UT',
    title: 'Senior Software Engineer',
    company: 'Canopy',
    blurb:
      'Owned development and scaling of our API microservice systems in Kotlin and Python. ' +
      'Co-implemented AI features — generated questionnaires, auto-filled client forms — that ' +
      'added $150k ARR in the first 30 days after release. Also brought AI tooling (Claude, ' +
      'Copilot) into my daily workflow.',
    skills: [
      { text: 'Kotlin', order: 2, top: true, category: 'Languages' },
      { text: 'Python', order: 3, top: true, category: 'Languages' },
      { text: 'Microservices', order: 30, top: false },
      { text: 'AI', order: 31, top: false },
    ],
  },
  {
    period: 'Sept 2023 — Mar 2025',
    place: 'Remote · UT',
    title: 'Founding Engineer',
    company: 'Build Hub',
    blurb:
      'Weighed the language and technology trade-offs from a blank page, then built the initial ' +
      'models, system, and database design and engineered the first implementation of the API.',
    skills: [
      { text: 'API Design', order: 32, top: false },
      { text: 'Database Design', order: 33, top: false },
    ],
  },
  {
    period: 'May 2023 — Jul 2024',
    place: 'Pleasant Grove, UT',
    title: 'Senior Software Engineer',
    company: 'Loveland Innovations',
    blurb:
      'Implemented and launched IMGING Inspect in Java, Angular, and PostgreSQL — it reduced ' +
      'customer churn and opened new insurance sales revenue. Rewrote onboarding and developer ' +
      'docs, mentored junior engineers, and led the move from waterfall to agile, doubling ' +
      'release cadence.',
    skills: [
      { text: 'Java', order: 1, top: true, category: 'Languages' },
      { text: 'Angular', order: 12, top: true, category: 'Frameworks' },
      { text: 'PostgreSQL', order: 20, top: true },
      { text: 'Mentoring', order: 34, top: false },
    ],
  },
  {
    period: 'Jan 2019 — Mar 2023',
    place: 'Provo, UT',
    title: 'Software Engineer',
    company: 'Alarm.com',
    blurb:
      'Took REST API work from idea to deployment in PHP and MySQL. Built an extendable ' +
      'integration between SecurityTrax and any number of consumer financing systems, opening ' +
      'new revenue streams. Ran technical interviews and rebuilt the engineer onboarding ' +
      'program — 50% more productivity for new hires in their first six months.',
    skills: [
      { text: 'PHP', order: 6, top: true, category: 'Languages' },
      { text: 'MySQL', order: 21, top: false },
      { text: 'API Design', order: 32, top: false },
      { text: 'Onboarding', order: 35, top: false },
    ],
  },
  {
    period: 'May 2017 — Nov 2018',
    place: 'Provo, UT',
    title: 'Software Engineer',
    company: 'InsideSales.com',
    blurb:
      'Chosen to help spearhead a new team remaking the Powerstandings product in Go, React, and ' +
      'Redux, with integrations into Salesforce and Playbooks.',
    skills: [
      { text: 'Go', order: 5, top: true, category: 'Languages' },
      { text: 'React', order: 11, top: true, category: 'Frameworks' },
      { text: 'Redux', order: 13, top: false },
      { text: 'Salesforce', order: 36, top: false },
    ],
  },
  {
    period: 'Apr 2016 — May 2017',
    place: 'Orem, UT',
    title: 'Software Engineer',
    company: 'Fishbowl',
    blurb:
      'Maintained and extended the Fishbowl Commerce system in Java Spring and Angular, ' +
      'including integrations with Shopify, eBay, and others.',
    skills: [
      { text: 'Java', order: 1, top: true, category: 'Languages' },
      { text: 'Spring Boot', order: 10, top: true, category: 'Frameworks' },
      { text: 'Angular', order: 12, top: true, category: 'Frameworks' },
    ],
  },
];

/** How many of the roles above appear in the "Recent" track. */
export const RECENT_COUNT = 3;

/** Track labels, derived from the role list so they never drift out of date. */
export function trackLabel(track: 0 | 1): string {
  const group = track === 0 ? roles.slice(0, RECENT_COUNT) : roles.slice(RECENT_COUNT);
  const years = group.flatMap((r) => r.period.match(/\d{4}/g) ?? []);
  const from = Math.min(...years.map(Number));
  const to = Math.max(...years.map(Number));
  return `${track === 0 ? '01' : '02'} — ${from} to ${to}`;
}
