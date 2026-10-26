/**
 * Every piece of resume text on the site comes from this file: the home page,
 * /personnel-file, the JSON-LD block, and the print view.
 */

export interface Role {
  id: string;
  title: string;
  employer: string;
  location?: string;
  start: string;
  end: string | null;
  /** One line that stays visible when the role is collapsed. */
  headline: string;
  bullets: string[];
}

export interface Metric {
  id: string;
  value: string;
  label: string;
}

export interface SkillGroup {
  id: string;
  label: string;
  skills: string[];
}

export interface Education {
  degree: string;
  school: string;
  graduated: string;
}

export interface Resume {
  name: string;
  title: string;
  tagline: string;
  location: { city: string; region: string; display: string };
  summary: string;
  valueStatement: string;
  metrics: Metric[];
  skillGroups: SkillGroup[];
  experience: Role[];
  education: Education;
}

export const resume = {
  name: 'Diego Linz',
  title: 'Senior Frontend Engineer',
  tagline: 'React.js, TypeScript, Redux, MUI',
  location: { city: 'Austin', region: 'TX', display: 'Austin, TX' },
  summary:
    'Senior frontend engineer with 8 years of experience modernizing legacy applications and building secure self-service web products, including production systems serving up to 17M users at an agency responsible for $160B+ in annual state revenue.',
  valueStatement:
    'I turn legacy, paper-and-phone government processes into fast, accessible React apps that millions of people use without needing help.',
  metrics: [
    { id: 'years', value: '8 years', label: 'building production web apps' },
    { id: 'users', value: '17M users', label: 'served by public-facing apps' },
    { id: 'uptime', value: '95% → 100%', label: 'uptime improvement' },
    { id: 'revenue', value: '$160B+', label: 'annual revenue at the agency I build for' },
  ],
  skillGroups: [
    {
      id: 'frontend',
      label: 'Frontend',
      skills: ['React', 'TypeScript', 'Redux', 'MUI', 'React Hook Form', 'Vite', 'HTML5', 'CSS3'],
    },
    {
      id: 'languages',
      label: 'Languages',
      skills: ['TypeScript', 'JavaScript', 'Python', 'SQL'],
    },
    {
      id: 'backend',
      label: 'Backend & Data',
      skills: ['REST APIs', 'Django', 'Oracle', 'MuleSoft', 'Natural'],
    },
    {
      id: 'practices',
      label: 'Practices',
      skills: ['Accessibility', 'Unit testing', 'Code review', 'Agile', 'Git', 'npm', 'Jira'],
    },
  ],
  experience: [
    {
      id: 'comptroller',
      title: 'Senior Software Developer (Front-End / React.js)',
      employer: 'Texas Comptroller of Public Accounts',
      location: 'Austin, TX',
      start: '2022-06',
      end: null,
      headline: 'React modernization of public apps serving up to 17M users',
      bullets: [
        'Modernized legacy Java applications with React, Redux, MUI, Vite and React Hook Form.',
        'Built self-service interfaces that replaced paper and phone-based processes for taxpayers and businesses.',
        'Shipped public-facing applications serving up to 17M users.',
        'Improved application reliability from 95% to 100% uptime.',
        'Worked across teams to define API contracts and turn policy into clear requirements.',
        'Set front-end styling standards adopted across projects.',
        'Led the team’s adoption of AI-assisted development tools.',
      ],
    },
    {
      id: 'ut-austin',
      title: 'Software Developer Analyst (Full-Stack / Django)',
      employer: 'The University of Texas at Austin',
      location: 'Austin, TX',
      start: '2018-07',
      end: '2022-06',
      headline: 'Built the CARES Act aid application system under tight federal deadlines',
      bullets: [
        'Built Django applications for medical student administration, athletics and financial aid.',
        'Delivered the CARES Act aid application system under tight deadlines.',
        'Mentored developers in a training-to-hire program.',
      ],
    },
    {
      id: 'facebook',
      title: 'Ads Risk Analyst',
      employer: 'Facebook (via Core Techs)',
      start: '2015-09',
      end: '2017-09',
      headline: 'Raised team review accuracy from 87% to 95%',
      bullets: [
        'Raised team accuracy from 87% to 95%.',
        'Served as subject-matter expert on the malicious ads policy.',
        'Built QA answer keys and review standards.',
      ],
    },
  ],
  education: {
    degree: 'B.A. Economics',
    school: 'The University of Texas at Austin',
    graduated: '2013-12',
  },
} as const satisfies Resume;

/** Ties features of this site to real work, shown on /personnel-file. */
export const experienceMap = [
  {
    feature: 'Schema-driven form rules',
    experience: 'Translating policy-driven rules into forms at the Comptroller',
  },
  {
    feature: 'Address standardization and Texas counties',
    experience: 'State-government self-service forms',
  },
  {
    feature: 'Ops Console with live API and performance data',
    experience: 'Reliability work that took public apps from 95% to 100% uptime',
  },
  {
    feature: 'Session handling and idle timeout',
    experience: 'Secure self-service apps used by the public',
  },
] as const;
