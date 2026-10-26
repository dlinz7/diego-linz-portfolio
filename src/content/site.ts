/** Owner-controlled settings. Leave a link as null to hide its button. */
export const site = {
  url: import.meta.env.VITE_SITE_URL ?? 'https://diego-linz.vercel.app',
  availability: 'Open to senior frontend roles · Remote or Austin',
  resumePdfPath: '/Diego-Linz-Resume.pdf',
  linkedInUrl: null as string | null,
  githubUrl: null as string | null,
  repoUrl: null as string | null,
  storybookPath: '/storybook/',
  showPhone: false,
  /** Split so the full address never appears in the HTML; see buildMailto. */
  emailParts: ['Linzdiegoa', 'gmail.com'] as const,
};
