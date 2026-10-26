import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { resume } from '@/content/resume';
import { site } from '@/content/site';
import { RouterLink } from '../RouterLink';

export const DISCLAIMER =
  'A fan-made portfolio project. Not affiliated with or endorsed by Paramount or CBS Studios. Star Trek and related marks are property of their owners.';

export function Footer() {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        mt: { xs: 6, md: 10 },
        borderTop: `1px solid ${theme.palette.divider}`,
        pb: 'calc(env(safe-area-inset-bottom) + 24px)',
      }}
    >
      <Box aria-hidden data-print="hide" sx={{ display: 'flex', height: 6 }}>
        {theme.tokens.decor.map((c) => (
          <Box key={c} sx={{ flex: 1, bgcolor: c }} />
        ))}
      </Box>
      <Container sx={{ pt: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 1, sm: 3 }}
          data-print="hide"
          sx={{ mb: 2 }}
        >
          <Link component={RouterLink} to="/personnel-file">
            Resume
          </Link>
          <Link component={RouterLink} to="/ships-systems">
            How this site is built
          </Link>
          {site.githubUrl && <Link href={site.githubUrl}>GitHub</Link>}
          {site.linkedInUrl && <Link href={site.linkedInUrl}>LinkedIn</Link>}
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 760 }}>
          {DISCLAIMER}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          © {new Date().getFullYear()} {resume.name}. All application data on this site is
          fictional.
        </Typography>
      </Container>
    </Box>
  );
}
