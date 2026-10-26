import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { PanelFrame } from '@/components/PanelFrame';
import { RouterLink } from '@/components/RouterLink';
import { pageMeta } from '@/content/pageMeta';
import { usePageMeta } from '@/lib/usePageMeta';

export function NotFoundPage() {
  usePageMeta(pageMeta.notFound);
  return (
    <Container sx={{ pt: { xs: 3, md: 6 } }}>
      <PanelFrame label="Navigation error" sx={{ maxWidth: 640 }}>
        <Typography variant="h1" sx={{ fontSize: 'clamp(2rem, 1.5rem + 2vw, 3rem)' }}>
          Sector not charted
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Page not found (404). Our star charts don’t cover this address.
        </Typography>
        <Button component={RouterLink} to="/" variant="contained" sx={{ mt: 3 }}>
          Return to home
        </Button>
      </PanelFrame>
    </Container>
  );
}
