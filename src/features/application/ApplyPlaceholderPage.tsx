import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { PanelFrame } from '@/components/PanelFrame';
import { RouterLink } from '@/components/RouterLink';
import { pageMeta } from '@/content/pageMeta';
import { usePageMeta } from '@/lib/usePageMeta';

/** Stands in for the application wizard until it is built. */
export function ApplyPlaceholderPage() {
  usePageMeta(pageMeta.apply);
  return (
    <Container sx={{ pt: { xs: 3, md: 6 } }}>
      <Box sx={{ maxWidth: 760 }}>
        <PanelFrame label="Academy Admissions" tone="bold">
          <Typography variant="h1" sx={{ fontSize: 'clamp(2rem, 1.5rem + 2vw, 3rem)' }}>
            Starfleet Academy application
          </Typography>
          <Typography sx={{ mt: 2 }}>
            The admissions office is still in drydock. When it opens, this will be a five-step
            application with six career tracks, fields that switch on and off as you answer, address
            standardization, and a printable access permit with a QR code.
          </Typography>
          <Typography sx={{ mt: 1.5 }}>
            In the meantime, the resume is fully operational.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 }}>
            <Button component={RouterLink} to="/personnel-file" variant="contained">
              Read the resume
            </Button>
            <Button component={RouterLink} to="/ships-systems" variant="outlined">
              How it’s built
            </Button>
          </Box>
        </PanelFrame>
      </Box>
    </Container>
  );
}
