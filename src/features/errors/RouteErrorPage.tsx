import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { isRouteErrorResponse, useRouteError } from 'react-router';

/** Shown when a page throws while loading or rendering. Uses plain links so it works even if the router is broken. */
export function RouteErrorPage() {
  const error = useRouteError();
  const detail = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : null;

  return (
    <Container component="main" id="main" sx={{ py: 6 }}>
      <Typography variant="h1" sx={{ fontSize: 'clamp(2rem, 1.5rem + 2vw, 3rem)' }}>
        Systems malfunction
      </Typography>
      <Typography sx={{ mt: 2 }}>Something went wrong loading this page. {detail}</Typography>
      <Button href="/" variant="contained" sx={{ mt: 3 }}>
        Return to home
      </Button>
    </Container>
  );
}
