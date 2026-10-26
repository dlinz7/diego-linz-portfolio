import { resume } from './resume';

export interface PageMeta {
  title: string;
  description: string;
}

const defaultTitle = `${resume.name} · ${resume.title}`;

export const pageMeta = {
  home: { title: defaultTitle, description: resume.shortSummary },
  personnelFile: {
    title: `Resume · ${resume.name}, ${resume.title}`,
    description: `Resume of ${resume.name}. ${resume.shortSummary}`,
  },
  shipsSystems: {
    title: `How this site is built · ${resume.name}`,
    description:
      'Engineering case study: architecture, design tokens, performance budgets and tests behind this React + TypeScript portfolio.',
  },
  apply: {
    title: `Starfleet Academy application demo · ${resume.name}`,
    description:
      'A working demo of complex forms built with React Hook Form, Yup, Redux Toolkit and MUI, themed as a fan-made Starfleet Academy application.',
  },
  notFound: { title: `Page not found · ${resume.name}`, description: resume.shortSummary },
} as const satisfies Record<string, PageMeta>;

/** Pages prerendered to static HTML at build time. */
export const prerenderedRoutes = [
  { path: '/', meta: pageMeta.home },
  { path: '/personnel-file', meta: pageMeta.personnelFile },
] as const;
