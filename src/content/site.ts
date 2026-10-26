/** Owner-controlled settings. Leave a link as null to hide its button. */
export const site = {
  url: import.meta.env.VITE_SITE_URL ?? 'https://diego-linz.vercel.app',
  availability: 'Open to senior frontend roles · Remote or Austin',
  resumePdfPath: '/Diego-Linz-Resume.pdf',
  linkedInUrl: 'https://www.linkedin.com/in/diego-linz-55520778/' as string | null,
  githubUrl: 'https://github.com/dlinz7' as string | null,
  repoUrl: 'https://github.com/dlinz7/diego-linz-portfolio' as string | null,
  storybookPath: '/storybook/',
  showPhone: false,
  /** Split so the full address never appears in the HTML; see buildMailto. */
  emailParts: ['Linzdiegoa', 'gmail.com'] as const,
};
