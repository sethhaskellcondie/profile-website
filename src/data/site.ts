/** Everything about the person the site is for. Edit here, not in components. */
export const site = {
  name: 'Seth Condie',
  title: 'Senior Software Engineer',
  eyebrow: 'Senior Software Engineer · 10+ years · Payson, UT',
  email: 'sethhaskellcondie@gmail.com',
  phone: '801-592-6499',
  github: 'https://github.com/sethhaskellcondie',
  linkedin: 'https://www.linkedin.com/in/sethcondie/',
  resume: '/resume.pdf',
  description:
    'Senior software engineer with 10+ years across startups and established products — ' +
    'Kotlin and Python microservices, API and database design, and AI features that moved revenue.',
  /** Words the hero headline cycles through: "I build ___ software systems". */
  heroWords: ['maintainable', 'reliable', 'scalable'],
  about: {
    lead:
      "I've worked across startups and established products — founding engineer on a brand-new " +
      'platform, senior engineer on systems with real customers and real revenue on the line. The ' +
      'through-line is that I like the messy middle: trade-off conversations, database design, the ' +
      'integration nobody wants to own, the onboarding doc that saves the next hire two weeks.',
    secondary:
      "Lately that's meant scaling Kotlin and Python microservices, shipping AI features that moved " +
      'ARR, and folding AI tooling into how I work day to day. Off the clock I collect retro games ' +
      'and consoles, which is how a game-cataloging API became my longest-running side project.',
    footnote: 'B.S. Software Engineering — Utah Valley University',
  },
  contact: {
    heading: "Let's talk shop.",
    sub: "I'm happy to walk through any of this — or just trade retro game recommendations.",
  },
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#work' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
} as const;
