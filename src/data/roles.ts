import type { Skill } from '../lib/skills';

export interface Role {
  period: string;
  place: string;
  title: string;
  company: string;
  /** One string per bullet. The timeline renders them as a list, in order. */
  blurb: string[];
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
    blurb: [
      'Owned development and scaling of our API microservice systems in Kotlin and Python.',
      'Co-implemented AI features — generated questionnaires, auto-filled client forms — that ' +
        'added $150k ARR in the first 30 days after release.',
      'Brought AI tooling (Claude, Copilot) into my daily workflow.',
    ],
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
    blurb: [
      'Owned development and scaling of our API microservice systems in Kotlin and Python.',
      'Co-implemented AI features — generated questionnaires, auto-filled client forms — that ' +
        'added $150k ARR in the first 30 days after release.',
      'Brought AI tooling (Claude, Copilot) into my daily workflow.',
    ],
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
    blurb: [
      'Blazed the trail by designing the initial objects, models, and database tables.',
      'Reported milestone progress, and closely communicated with clients and stakeholders.',
      'Decreased feature lead time by implementing test first development on the system from the start.',
    ],
    skills: [
      { text: 'TypeScript', order: 1, top: true, category: 'Languages' },
      { text: 'Angular', order: 12, top: true, category: 'Frameworks' },
      { text: 'PHP', order: 32, top: false, category: 'Languages' },
      { text: 'Laravel', order: 32, top: false, category: 'Frameworks' },
      { text: 'Test First Development', order: 35, top: false },
      { text: 'System Design', order: 32, top: false },
      { text: 'AWS', order: 32, top: false },
      { text: 'MySQL', order: 33, top: false },
    ],
  },
  {
    period: 'May 2023 — Jul 2024',
    place: 'Pleasant Grove, UT',
    title: 'Senior Software Engineer',
    company: 'Loveland Innovations',
    blurb: [
      'Reduced customer churn, and increased revenue by launching IMGING Inspect as a new product.',
      'Doubled the release cadence and improved communication between technical and non-technical stakeholders by leading a change from waterfall to an agile development process.',
    ],
    skills: [
      { text: 'TypeScript', order: 1, top: true, category: 'Languages' },
      { text: 'Angular', order: 12, top: true, category: 'Frameworks' },
      { text: 'Java', order: 1, top: true, category: 'Languages' },
      { text: 'Spring Boot', order: 1, top: true, category: 'Frameworks' },
      { text: 'Mentoring', order: 34, top: false },
      { text: 'Onboarding', order: 34, top: false },
      { text: 'Project Lead', order: 34, top: false },
      { text: 'System Design', order: 32, top: false },
      { text: 'PostgreSQL', order: 20, top: true },
    ],
  },
  {
    period: 'Jan 2019 — Mar 2023',
    place: 'Provo, UT',
    title: 'Software Engineer',
    company: 'Alarm.com',
    blurb: [
      'Took REST API work from idea to deployment in PHP and MySQL.',
      'Opened new revenue streams, by designing and implementing an extendable integration between SecurityTrax and any ' +
      'number of consumer financing systems.',
      'Boosted new engineers productivity by 50% by restructuring our onboarding process.',
    ],
    skills: [
      { text: 'PHP', order: 6, top: true, category: 'Languages' },
      { text: 'PHP Unit', order: 6, top: false, category: 'Languages' },
      { text: 'API Design', order: 32, top: false },
      { text: 'Project Lead', order: 32, top: false },
      { text: 'Team Lead', order: 32, top: false },
      { text: 'Test First Development', order: 35, top: false },
      { text: 'Conducted Technical Interviews', order: 35, top: false },
      { text: 'Mentoring', order: 35, top: false },
      { text: 'Onboarding', order: 35, top: false },
      { text: 'MySQL', order: 21, top: false },
    ],
  },
  {
    period: 'May 2017 — Nov 2018',
    place: 'Provo, UT',
    title: 'Software Engineer',
    company: 'InsideSales.com',
    blurb: [
      'Chosen to help spearhead a new team creating a sales gamification platform.',
      'Incorporated the Jest testing library into our process and implemented test first development.',
    ],
    skills: [
      { text: 'React', order: 11, top: true, category: 'Frameworks' },
      { text: 'Redux', order: 13, top: false, category: 'Frameworks' },
      { text: 'JavaScript', order: 13, top: false, category: 'Frameworks' },
      { text: 'Integrations', order: 36, top: false },
      { text: 'Test First Development', order: 36, top: false },
      { text: 'Go', order: 5, top: false, category: 'Languages' },
      { text: 'Gorm', order: 10, top: false},
      { text: 'NoSQL', order: 10, top: false},
      { text: 'MongoDB', order: 10, top: false},
    ],
  },
  {
    period: 'Apr 2016 — May 2017',
    place: 'Orem, UT',
    title: 'Software Engineer',
    company: 'Fishbowl',
    blurb: [
      'Cut my teeth maintaining and adding features to Fishbowl Commerce using Java Spring and Angular.',
      'Learned and worked with a great team as I built integrations with Shopify, eBay, and more.',
    ],
    skills: [
      { text: 'Angular', order: 12, top: true, category: 'Frameworks' },
      { text: 'JavaScript', order: 1, top: true, category: 'Languages' },
      { text: 'Java', order: 1, top: true, category: 'Languages' },
      { text: 'Spring Boot', order: 10, top: true, category: 'Frameworks' },
      { text: 'Integrations', order: 10, top: false },
      { text: 'Hibernate', order: 10, top: false },
      { text: 'MySQL', order: 10, top: true },
    ],
  },
  {
    period: 'Nov 2012 — May 2017',
    place: 'Orem, UT',
    title: 'Software Engineering Student',
    company: 'Utah Valley University',
    blurb: [
      'Discovered programming and started blazing my own trail.',
      'Built my capstone project, a real waste management system for a lodge in Southern Utah.',
      'Graduated with a Bachelor of Science in Software Engineering.',
    ],
    skills: [
      { text: 'JavaScript', order: 1, top: false, category: 'Languages' },
      { text: 'Node.js', order: 10, top: false, category: 'Frameworks' },
      { text: 'MySQL', order: 10, top: false },
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
