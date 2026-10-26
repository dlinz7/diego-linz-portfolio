import Box from '@mui/material/Box';
import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { Footer } from './Footer';
import { NavBar } from './NavBar';
import { SkipLink } from './SkipLink';

/** Moves focus to the new page's heading after client-side navigation, so screen readers announce it. */
function useFocusOnNavigate() {
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const main = document.getElementById('main');
    const target = main?.querySelector<HTMLElement>('h1') ?? main;
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }, [pathname]);
}

export function AppShell() {
  useFocusOnNavigate();
  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <SkipLink />
      <NavBar />
      <Box
        component="main"
        id="main"
        tabIndex={-1}
        sx={{ flex: 1, outline: 'none', '& h1:focus': { outline: 'none' } }}
      >
        <Outlet />
      </Box>
      <Footer />
      <ScrollRestoration />
    </Box>
  );
}
