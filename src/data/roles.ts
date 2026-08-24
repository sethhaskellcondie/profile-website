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
 * Work history, newest first. The Experience timeline renders this as one
 * unbroken run of roles and steps through it a role at a time. Adding a job is
 * one object at the top of this array; the timeline, the position readout, the
 * spine's nav rail, and the skill chips all follow automatically.
 */
export const roles: Role[] = [
  {
    period: 'May 2026 — Present',
    place: 'Provo, UT',
    title: 'Senior Software Engineer',
    company: 'Quilt',
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
    period: 'Apr 2025 — Mar 2026',
    place: 'Remote, UT',
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
    place: 'Remote, UT',
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
      'Chosen to help spearhead a new team creating a sales gamification platform. ' +
      'Incorporated the Jest testing library into our process and implemented test driven development.',
    skills: [
      { text: 'React', order: 11, top: true, category: 'Frameworks' },
      { text: 'Redux', order: 13, top: false, category: 'Frameworks' },
      { text: 'JavaScript', order: 13, top: false, category: 'Frameworks' },
      { text: 'Integrations', order: 36, top: false },
      { text: 'TDD', order: 36, top: false },
      { text: 'Go', order: 5, top: true, category: 'Languages' },
      { text: 'Gorm', order: 10, top: false},
      { text: 'NoSQL', order: 10, top: true},
      { text: 'MongoDB', order: 10, top: true},
    ],
  },
  {
    period: 'Apr 2016 — May 2017',
    place: 'Orem, UT',
    title: 'Software Engineer',
    company: 'Fishbowl',
    blurb:
      'Cut my teeth Maintaining and adding functionality to the Fishbowl Commerce system in Java Spring and Angular. ' +
      'I worked with a great team and they supported me as I built integrations with Shopify, eBay, and more.',
    skills: [
      { text: 'Angular', order: 12, top: true, category: 'Frameworks' },
      { text: 'JavaScript', order: 1, top: true, category: 'Languages' },
      { text: 'Spring Boot', order: 10, top: true, category: 'Frameworks' },
      { text: 'Integrations', order: 10, top: false},
      { text: 'Java', order: 1, top: true, category: 'Languages' },
      { text: 'Hibernate', order: 10, top: false},
      { text: 'MySQL', order: 10, top: true},
    ],
  },
  {
    period: 'Nov 2012 — May 2017',
    place: 'Orem, UT',
    title: 'Software Engineering Student',
    company: 'Utah Valley University',
    blurb:
      'Fell in love with programming and studied hard. ' +
        'My capstone project was creating a real waste management system for a lodge in Southern Utah. ' +
        'I graduated with a Bachelor of Science in Software Engineering. ',
    skills: [
      { text: 'JavaScript', order: 1, top: true, category: 'Languages' },
      { text: 'Mithril', order: 10, top: true, category: 'Frameworks' },
      { text: 'Node.js', order: 10, top: true, category: 'Frameworks' },
      { text: 'MySQL', order: 10, top: true},
    ],
  },
];

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * The timeline's position readout — "03 / 06 · 2019 to 2023". Derived from the
 * role list, so it never drifts out of date as jobs are added or edited.
 */
export function positionLabel(index: number): string {
  const years = (roles[index].period.match(/\d{4}/g) ?? []).map(Number);
  const from = Math.min(...years);
  const to = Math.max(...years);
  const span = from === to ? `${from}` : `${from} to ${to}`;
  return `${pad(index + 1)} / ${pad(roles.length)} · ${span}`;
}
