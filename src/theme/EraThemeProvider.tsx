import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useMemo, type ReactNode } from 'react';
import { createEraTheme } from './createEraTheme';
import type { Era } from './semantic';

interface Props {
  era: Era;
  children: ReactNode;
}

export function EraThemeProvider({ era, children }: Props) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const theme = useMemo(() => createEraTheme(era, { reducedMotion }), [era, reducedMotion]);

  useEffect(() => {
    document.documentElement.dataset.era = era;
  }, [era]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
