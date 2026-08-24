// Everything about the person the site is for. Edit here, not in components.
export const site = {
  name: 'Seth Condie',
  title: 'Senior Software Engineer',
  // Hero eyebrow, one entry per point. The delimiter is included by the component.
  eyebrow: ['Senior Software Engineer', '10+ years', 'Payson, UT'],
  email: 'sethhaskellcondie@gmail.com',
  github: 'https://github.com/sethhaskellcondie',
  linkedin: 'https://www.linkedin.com/in/sethcondie/',
  resume: '/resume.pdf',
  // description only used for SEO, not visible on the site.
  description:
    'Senior software engineer with 10+ years across startups and established products — ' +
    'Kotlin and Python microservices, API and database design, and AI features that moved revenue.',
  // Words the hero headline cycles through: "I build ___ software systems".
  heroWords: ['maintainable', 'reliable', 'scalable', 'value-driven'],
  about: {
    lead:
      "I didn't know any engineers or programmers growing up. I discovered programming in college and loved it. I switched to a computer science major, and I've been blazing my own trail ever since. " +
        "Because of this I've often volunteered for the projects with unknowns, researching them to the point where I could teach the team how to implement and maintain the solution. " +
        "This eventually lead to my project The Game Pensieve. I had to own every part of it, identifying and solving the problem. implementing an designing the solution, through to hosting and deploying the system. " +
        "The project is currently live, more details can be found in the projects section. ",
    secondary:
      "I've lead many different projects and different teams, this site is based on the challenges " +
        "that come from getting everything and everyone to work together. Services, integrations, " +
        "AI, product, executives, sales, and other engineers. Its important to remember that we are all different, and bring something " +
        "unique to the table. So this site has three styles, a professional light and dark style that showcases gears working together. " +
        "Also a 'fun' style that shows a bit more of my unique personality. " +
        "I hope that this site communicates my experience creating software and how it can be valuable for your projects.",
    footnote: 'Seth Condie - Trailblazer',
  },
  // Short lead-in above the Projects grid.
  projectsIntro:
    "The proof is in the projects. Software engineering has always been a discipline in problem solving to me. " +
    "I've included two of my projects that illustrate my problem solving skills and my technical implementation.",
  contact: {
    heading: "Let's talk shop.",
    sub: "I'm happy to walk through any of this — or just trade retro game recommendations.",
  },
  nav: [
    { label: 'My Story', href: '#about' },
    { label: 'Timeline', href: '#work' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
} as const;
