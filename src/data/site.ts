// Everything about the person the site is for. Edit here, not in components.
const location = { locality: 'Payson', region: 'UT', country: 'US' } as const;

export const site = {
  name: 'Seth Condie',
  title: 'Senior Software Engineer',
  location,
  // Hero eyebrow, one entry per point. The delimiter is included by the component.
  eyebrow: ['Senior Software Engineer', '10+ years', `${location.locality}, ${location.region}`],
  // Kept in two halves, so the address never appears whole in the served HTML or
  // the JS bundle — scrapers harvest mailto: links and anything shaped like an
  // address. Contact joins the halves only when a visitor asks to see it.
  email: { user: 'sethhaskellcondie', domain: 'gmail.com' },
  github: 'https://github.com/sethhaskellcondie',
  linkedin: 'https://www.linkedin.com/in/sethcondie/',
  resume: { href: '/resume.pdf', filename: 'Seth-Condie-Resume.pdf' },
  description:
    'Senior software engineer in Utah, 10+ years of Java, Kotlin, PHP, and TypeScript services — ' +
    'API and database design, and AI features that grew revenue.',
  // Words the hero headline cycles through: "I build ___ software systems".
  heroWords: ['maintainable', 'reliable', 'scalable', 'value-driven'],
  about: {
    lead:
      "I didn't know any engineers or programmers growing up. I discovered programming in college " +
      "and loved it. I switched my major to Software Engineering, and I've been blazing my own trail ever since. " +
      "Because of this, I've often volunteered for the projects with unknowns, researching them to the " +
      'point where I could teach the team how to implement and maintain the solution. ' +
      'This eventually led to my project The Game Pensieve. I had to own every part of it: identifying ' +
      'and solving the problem, designing and implementing the solution, through to hosting and ' +
      'deploying the system. The project is currently live, and more details can be found in the ' +
      'projects section.',
    secondary:
      "I've led many different projects and many different teams. This site is based on the challenges " +
      'that come from getting everything and everyone to work together: services, integrations, ' +
      "AI, product, executives, sales, and other engineers. It's important to remember that we are all " +
      'different and bring something unique to the table. So this site has three styles: a professional ' +
      'light and dark pair that showcases gears working together, and a “fun” style that shows a bit ' +
      'more of my personality. ' +
      'I hope that this site communicates my experience creating software and how it can be valuable ' +
      'for your projects.',
    footnote: 'Seth Condie — Trailblazer',
  },
  projectsIntro:
    'The proof is in the projects. Software engineering has always been a discipline of problem ' +
    "solving to me. I've included two of my projects that illustrate my problem-solving skills and " +
    'my technical execution.',
  contact: {
    heading: 'Have questions?',
    sub:
      "I'm happy to discuss any of my projects and past experience. I would love to better " +
      'understand your projects and how I can best help.',
  },
  nav: [
    { label: 'My Story', href: '#about' },
    { label: 'Timeline', href: '#work' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
} as const;
