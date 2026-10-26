import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PanelFrame } from '@/components/PanelFrame';
import { RouterLink } from '@/components/RouterLink';
import { site } from '@/content/site';

export function SeeHowIBuild() {
  return (
    <Box component="section" aria-labelledby="build-heading" data-print="hide">
      <PanelFrame label="Academy Admissions" tone="bold">
        <Typography variant="h2" id="build-heading">
          See how I build
        </Typography>
        <Typography sx={{ mt: 1.5, maxWidth: '65ch' }}>
          Try the Starfleet Academy application: a working demo of complex forms (React Hook Form +
          Yup), Redux Toolkit, sign-in with idle timeout, and live performance monitoring. Every
          field rule, mock API call and render is something I’d ship at work.
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mt: 3, alignItems: { sm: 'center' } }}
        >
          <Button
            component={RouterLink}
            to="/apply"
            variant="contained"
            color="secondary"
            endIcon={<ArrowForwardIcon />}
          >
            Start the application
          </Button>
          <Link component={RouterLink} to="/ships-systems">
            How this site is built
          </Link>
          <Link href={site.storybookPath}>Component library (Storybook)</Link>
          {site.repoUrl && <Link href={site.repoUrl}>Source on GitHub</Link>}
        </Stack>
      </PanelFrame>
    </Box>
  );
}
