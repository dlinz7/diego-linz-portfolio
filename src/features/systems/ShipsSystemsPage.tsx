import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { PanelFrame } from '@/components/PanelFrame';
import { SectionHeading } from '@/components/SectionHeading';
import { pageMeta } from '@/content/pageMeta';
import { site } from '@/content/site';
import { usePageMeta } from '@/lib/usePageMeta';

const stack = [
  ['Build', 'Vite, React 19, TypeScript in strict mode'],
  ['UI', 'MUI with a token-driven theme for two eras (TOS and TNG)'],
  ['State', 'Redux Toolkit, with RTK Query for the API layer'],
  ['Forms', 'React Hook Form with Yup schemas'],
  ['Mock backend', 'Mock Service Worker (MSW), running in the production build too'],
  ['Testing', 'Vitest, React Testing Library, Playwright with axe'],
  ['Docs', 'Storybook with accessibility checks'],
] as const;

const builtSoFar = [
  'Design tokens in two layers (raw values, then meaning per era) that feed both the MUI theme and CSS variables.',
  'A unit test that checks color contrast for every text and background pair in both eras and fails below WCAG AA.',
  'The home page and resume are prerendered to static HTML at build time, so the resume is readable before any JavaScript runs.',
  'Experience sections stay searchable with Ctrl/Cmd+F while collapsed, using the browser’s hidden="until-found" feature.',
  'The resume text lives in one typed file that feeds the home page, the resume page, the structured data for search engines, and the print view.',
];

const comingNext = [
  'Redux store with RTK Query, saved drafts and an API call log',
  'Sign-in with token refresh and an accessible idle-timeout warning',
  'The schema-driven application form: six tracks, conditional fields, address standardization',
  'A generated PDF permit with a QR code, and an Admissions Officer dashboard',
  'The Ops Console: live API, Web Vitals and network-failure simulation',
  'English, Spanish and a pseudo-locale for layout testing',
];

export function ShipsSystemsPage() {
  usePageMeta(pageMeta.shipsSystems);
  return (
    <Container sx={{ pt: { xs: 3, md: 6 } }}>
      <Box sx={{ display: 'grid', gap: { xs: 4, md: 5 }, maxWidth: 900 }}>
        <Box>
          <Typography variant="overline" component="p" sx={{ color: 'text.secondary' }}>
            Ship’s Systems
          </Typography>
          <Typography variant="h1">How this site is built</Typography>
          <Typography sx={{ mt: 2, maxWidth: '65ch' }}>
            A case study for engineers. This page grows with the project; each section below is
            written from the actual code.
          </Typography>
        </Box>

        <Box component="section" aria-labelledby="stack-heading">
          <SectionHeading id="stack-heading">Stack</SectionHeading>
          <Box component="dl" sx={{ m: 0, display: 'grid', gap: 1 }}>
            {stack.map(([label, value]) => (
              <Box
                key={label}
                sx={{ display: 'grid', gridTemplateColumns: { sm: '160px 1fr' }, gap: { sm: 2 } }}
              >
                <Typography component="dt" sx={{ fontWeight: 650 }}>
                  {label}
                </Typography>
                <Typography component="dd" sx={{ m: 0 }}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box component="section" aria-labelledby="built-heading">
          <SectionHeading id="built-heading">Built so far</SectionHeading>
          <Box component="ul" sx={{ m: 0, pl: 2.5, display: 'grid', gap: 1 }}>
            {builtSoFar.map((item) => (
              <Typography component="li" key={item}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box component="section" aria-labelledby="next-heading">
          <PanelFrame label="Construction schedule">
            <Typography
              variant="h2"
              id="next-heading"
              sx={{ fontSize: 'clamp(1.3rem, 1.1rem + 0.8vw, 1.7rem)' }}
            >
              Coming next
            </Typography>
            <Box component="ol" sx={{ mt: 2, mb: 0, pl: 2.5, display: 'grid', gap: 0.75 }}>
              {comingNext.map((item) => (
                <Typography component="li" key={item}>
                  {item}
                </Typography>
              ))}
            </Box>
          </PanelFrame>
        </Box>

        <Typography>
          Browse the shared components in the{' '}
          <Link href={site.storybookPath}>Storybook component library</Link>
          {site.repoUrl ? (
            <>
              {' '}
              or read the <Link href={site.repoUrl}>source on GitHub</Link>
            </>
          ) : null}
          .
        </Typography>
      </Box>
    </Container>
  );
}
