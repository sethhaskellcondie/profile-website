import type { Skill } from '../lib/skills';
import { ANGULAR, DIGITAL_OCEAN, JAVA, POSTGRESQL, REACT, SPRING_BOOT, TYPESCRIPT } from './skills';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  name: string;
  kind: string;
  blurb: string;
  tags: Skill[];
  links: ProjectLink[];
  /** The one project the card leads with — it gets the sheen and the idle gear. */
  featured?: boolean;
}

/** Side projects. Add one object here and a card appears in the Projects grid. */
export const projects: Project[] = [
  {
    name: 'The Game Pensieve',
    kind: 'Long-running side project',
    featured: true,
    blurb:
      'A pensieve for a video game collection — a Spring Boot API for cataloging games, ' +
      'consoles, and the custom details a collector actually cares about. Java 25 and ' +
      'PostgreSQL, Keycloak as an OAuth 2.1 resource server, Flyway migrations, Docker + Caddy ' +
      'in production, an MCP sidecar so AI tools can query the collection, and a Next.js front end.',
    tags: [
      JAVA,
      TYPESCRIPT,
      SPRING_BOOT,
      REACT,
      DIGITAL_OCEAN,
      { text: 'MCP', order: 73, top: true },
      POSTGRESQL,
    ],
    links: [
      { label: 'Source', href: 'https://github.com/sethhaskellcondie/the-game-pensieve-api' },
      { label: 'Walkthrough video', href: 'https://youtu.be/7wByiXr5nDI' },
    ],
  },
  {
    name: 'Clocktower Town Square',
    kind: 'Small tool, real table',
    blurb:
      'A digital town square for playing Blood on the Clocktower on a PC — the board game aid I ' +
      'wanted at my own table. Angular 19, deployed on Vercel.',
    tags: [TYPESCRIPT, ANGULAR, { text: 'Vercel', order: 75, top: false }],
    links: [
      { label: 'Source', href: 'https://github.com/sethhaskellcondie/clocktower-town-square' },
      { label: 'Live app', href: 'https://clocktower-town-square.vercel.app' },
    ],
  },
];
