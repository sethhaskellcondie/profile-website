import type { Skill } from '../lib/skills';
import {
  AI_FEATURE_DEVELOPMENT,
  ANGULAR,
  AWS,
  CLAUDE_CODE,
  DIGITAL_OCEAN,
  INTEGRATIONS,
  JAVA,
  JAVASCRIPT,
  MENTORING,
  MICROSERVICES,
  MONOLITH,
  MYSQL,
  PHP,
  PHP_UNIT,
  POSTGRESQL,
  PROJECT_LEAD,
  REACT,
  SPRING_BOOT,
  SYSTEM_DESIGN,
  TEST_FIRST_DEVELOPMENT,
  TYPESCRIPT,
} from './skills';

export interface Role {
  period: string;
  place: string;
  title: string;
  company: string;
  // One string per bullet. The timeline renders them as a list, in order.
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
    company: 'Quilt Software',
    blurb: [
      'Reduced customer churn by implementing a new UI for the entire project.',
      'Improved confidence in future releases by introducing Playwright end-to-end tests.',
      'Increased revenue by implementing AI-driven features like custom report generation.',
    ],
    skills: [
      JAVASCRIPT,
      PHP,
      { text: 'Playwright', order: 27, top: false, category: 'Frameworks' },
      MONOLITH,
      DIGITAL_OCEAN,
      AWS,
      MENTORING,
      AI_FEATURE_DEVELOPMENT,
      TEST_FIRST_DEVELOPMENT,
      SYSTEM_DESIGN,
      CLAUDE_CODE,
      MYSQL,
    ],
  },
  {
    period: 'Apr 2025 — Mar 2026',
    place: 'Remote, UT',
    title: 'Senior Software Engineer',
    company: 'Canopy',
    blurb: [
      'Increased revenue by co-implementing AI-driven features like auto-filling forms and questionnaire generation. (Increased ARR by 150k in the first 30 days of release)',
      'Reduced costs by building microservices that could scale traffic up and down depending on our busy season.',
      'Reduced feature lead time by incorporating AI tooling into my daily workflow.',
    ],
    skills: [
      { text: 'Kotlin', order: 5, top: true, category: 'Languages' },
      { text: 'Python', order: 7, top: false, category: 'Languages' },
      { text: 'Kotest', order: 29, top: false, category: 'Frameworks' },
      AI_FEATURE_DEVELOPMENT,
      MICROSERVICES,
      AWS,
      { text: 'Datadog', order: 77, top: false },
      CLAUDE_CODE,
      POSTGRESQL,
    ],
  },
  {
    period: 'Sept 2023 — Mar 2025',
    place: 'Remote, UT',
    title: 'Founding Engineer',
    company: 'Build Hub',
    blurb: [
      'Blazed the trail by designing the initial objects, models, and database tables.',
      'Reported milestone progress, and communicated closely with clients and stakeholders.',
      'Decreased feature lead time by implementing test-first development on the system from the start.',
    ],
    skills: [
      TYPESCRIPT,
      ANGULAR,
      PHP,
      PHP_UNIT,
      { text: 'Laravel', order: 22, top: true, category: 'Frameworks' },
      TEST_FIRST_DEVELOPMENT,
      SYSTEM_DESIGN,
      MONOLITH,
      AWS,
      MYSQL,
    ],
  },
  {
    period: 'May 2023 — Jul 2024',
    place: 'Pleasant Grove, UT',
    title: 'Senior Software Engineer',
    company: 'Loveland Innovations',
    blurb: [
      'Reduced customer churn and increased revenue by launching IMGING Inspect as a new product.',
      'Doubled the release cadence and improved communication between technical and non-technical stakeholders by leading a change in process from waterfall to agile.',
    ],
    skills: [
      TYPESCRIPT,
      ANGULAR,
      JAVA,
      { text: 'Junit', order: 28, top: false, category: 'Frameworks' },
      SPRING_BOOT,
      MICROSERVICES,
      MENTORING,
      PROJECT_LEAD,
      SYSTEM_DESIGN,
      POSTGRESQL,
    ],
  },
  {
    period: 'Jan 2019 — Mar 2023',
    place: 'Provo, UT',
    title: 'Software Engineer',
    company: 'Alarm.com',
    blurb: [
      'Improved revenue by maintaining and enhancing a robust REST API that was used in house but also sold to third-party partners.',
      'Opened new revenue streams by designing and implementing an extendable integration between SecurityTrax and any number of consumer financing systems.',
      'Boosted new engineers’ productivity by 50% by restructuring our onboarding process.',
    ],
    skills: [
      PHP,
      PHP_UNIT,
      { text: 'API Design', order: 53, top: false, category: 'Architecture' },
      MONOLITH,
      PROJECT_LEAD,
      { text: 'Team Lead', order: 62, top: false, category: 'Leadership' },
      TEST_FIRST_DEVELOPMENT,
      { text: 'Conducting Technical Interviews', order: 63, top: false, category: 'Leadership' },
      MENTORING,
      MYSQL,
    ],
  },
  {
    period: 'May 2017 — Nov 2018',
    place: 'Provo, UT',
    title: 'Software Engineer',
    company: 'InsideSales.com',
    blurb: [
      'Chosen to help spearhead a new team creating a sales gamification platform.',
      'Incorporated the Jest testing library into our process and implemented test-first development.',
    ],
    skills: [
      REACT,
      { text: 'Redux', order: 26, top: false, category: 'Frameworks' },
      JAVASCRIPT,
      MICROSERVICES,
      INTEGRATIONS,
      TEST_FIRST_DEVELOPMENT,
      { text: 'Go', order: 8, top: false, category: 'Languages' },
      { text: 'Gorm', order: 45, top: false, category: 'Data' },
      { text: 'NoSQL', order: 43, top: false, category: 'Data' },
      { text: 'MongoDB', order: 42, top: false, category: 'Data' },
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
      ANGULAR,
      JAVASCRIPT,
      JAVA,
      SPRING_BOOT,
      MONOLITH,
      INTEGRATIONS,
      { text: 'Hibernate', order: 44, top: false, category: 'Data' },
      MYSQL,
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
    skills: [JAVASCRIPT, { text: 'Node.js', order: 24, top: false, category: 'Frameworks' }, MYSQL],
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
