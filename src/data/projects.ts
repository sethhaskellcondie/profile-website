import type { Skill } from '../lib/skills';
import {
  ANGULAR,
  DIGITAL_OCEAN,
  JAVA,
  POSTGRESQL,
  PROJECT_LEAD,
  REACT,
  SPRING_BOOT,
  TYPESCRIPT,
} from './skills';

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
  featured?: boolean;
}

export const projects: Project[] = [
  {
    name: 'The Game Pensieve',
    kind: 'Full stack SaaS solution',
    featured: true,
    blurb:
      'Tracking a game collection has some unique problems: games can be compilations of other ' +
      'games, and collectors want custom data points so they can find the right game fast. ' +
      'This project started as a proof of concept at work. ' +
      'Most of our development effort was put into manually implementing custom data points and ' +
      'filters for our clients. This gave us an automation design. Afterward I kept this as my ' +
      'experimental sandbox to try new designs and AI agents, and to release my own MCP.',
    tags: [
      { text: 'Next.js', order: 21, top: true, category: 'Frameworks' },
      JAVA,
      TYPESCRIPT,
      SPRING_BOOT,
      REACT,
      PROJECT_LEAD,
      DIGITAL_OCEAN,
      { text: 'MCP', order: 74, top: true },
      POSTGRESQL,
    ],
    links: [
      { label: 'Source', href: 'https://github.com/sethhaskellcondie/the-game-pensieve-api' },
      { label: 'Walkthrough video', href: 'https://youtu.be/7wByiXr5nDI' }, //TODO come back and update this after the new version of the video is complete, also update this on LinkedIn
    ],
  },
  {
    name: 'Clocktower Town Square',
    kind: 'Small problem, real solution',
    blurb:
      "Blood on the Clocktower is a social deduction game usually played with 10 to 20 players. " +
        "Because of this high player count, there are common questions that I get asked every game. " +
        "What is that player's name? How many votes do we need? Where is the bathroom? This tool answers " +
        "all these questions and more.",
    tags: [TYPESCRIPT, ANGULAR, { text: 'Vercel', order: 76, top: false }],
    links: [
      { label: 'Source', href: 'https://github.com/sethhaskellcondie/clocktower-town-square' }, //TODO come back and update this after the new version of the video is complete, also update this on LinkedIn
      { label: 'Live app', href: 'https://clocktower-town-square.vercel.app' },
    ],
  },
];
