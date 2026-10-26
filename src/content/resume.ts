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
  /** Under ~160 characters, for search results and link previews. */
  shortSummary: string;
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
    'Frontend-focused software engineer with 8 years of experience modernizing legacy applications, building secure self-service web products, and delivering production systems serving up to 17M users within an agency responsible for more than $160B in annual state revenue. Strong background in React.js development, cross-functional collaboration, and translating complex business workflows into intuitive, reliable user experiences.',
  shortSummary:
    'Senior frontend engineer (React, TypeScript, Redux, MUI) with 8 years modernizing legacy apps, including public systems serving up to 17M users.',
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
      skills: ['React', 'TypeScript', 'Redux', 'MUI', 'React Hook Form', 'Vite'],
    },
    {
      id: 'languages',
      label: 'Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML5', 'CSS3'],
    },
    {
      id: 'backend',
      label: 'Backend & Data',
      skills: [
        'REST APIs',
        'Django',
        'Django ORM',
        'Oracle Database',
        'MuleSoft',
        'Natural (mainframe)',
      ],
    },
    {
      id: 'practices',
      label: 'Tools & Practices',
      skills: ['Git', 'npm', 'Jira', 'Agile', 'Code reviews', 'Unit testing'],
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
        'Reconstructed and modernized legacy Java applications using React.js, Redux, Material UI (MUI), Vite, and React Hook Form.',
        'Built secure self-service web interfaces that replaced paper- and phone-based processes, reducing manual handling and improving user completion speed.',
        'Delivered production features for public-facing applications serving up to 17 million users within an agency responsible for more than $160 billion in annual state revenue.',
        'Improved system reliability from 95% to 100% uptime, preventing outages during peak usage periods.',
        'Collaborated with backend developers and business stakeholders to define requirements, clarify API contracts, and translate policy-driven rules into intuitive user experiences.',
        'Established and enforced front-end styling best practices, ensuring a consistent, clean user experience across applications.',
        'Integrated AI into daily engineering workflows, led discussions on high-value use cases, and guided team members in adopting AI tools effectively and responsibly.',
      ],
    },
    {
      id: 'ut-austin',
      title: 'Software Developer Analyst (Full-Stack / Django)',
      employer: 'The University of Texas at Austin',
      location: 'Austin, TX',
      start: '2018-07',
      end: '2022-06',
      headline: 'Helped deliver the CARES Act aid application system under tight deadlines',
      bullets: [
        'Developed and maintained Django-based web applications supporting medical student administration and internal operational workflows for athletics and financial aid, building full-stack features across frontend, backend, and database layers.',
        'Helped deliver the CARES Act application system under tight deadlines that supported distribution of millions of dollars in student aid.',
        'Mentored new hires with limited coding experience through UT’s training-to-hire program, while contributing through code reviews and pair programming.',
      ],
    },
    {
      id: 'facebook',
      title: 'Ads Risk Analyst',
      employer: 'Facebook (via Core Techs)',
      location: 'Austin, TX',
      start: '2015-09',
      end: '2017-09',
      headline: 'Helped improve team accuracy from 87% to 95%',
      bullets: [
        'Served as a quality auditor and helped improve team accuracy from 87% to 95%.',
        'Acted as a subject matter expert in malicious ads and content moderation policy.',
        'Created answer keys for quality testing and helped establish improved review standards.',
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
