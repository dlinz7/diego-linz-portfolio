import { createTheme, type Theme } from '@mui/material/styles';
import { semanticTokens, toCssVariables, type Era, type SemanticTokens } from './semantic';
import { breakpoints, contentMaxWidth, motion, radius, spacingUnit, typeScale } from './tokens';

declare module '@mui/material/styles' {
  interface Theme {
    era: Era;
    tokens: SemanticTokens;
  }
  interface ThemeOptions {
    era?: Era;
    tokens?: SemanticTokens;
  }
}

export interface EraThemeOptions {
  reducedMotion?: boolean;
}

const coarsePointer = '@media (pointer: coarse)';

export function createEraTheme(era: Era, { reducedMotion = false }: EraThemeOptions = {}): Theme {
  const t = semanticTokens[era];
  const isTng = era === 'tng';
  const displayHeading = {
    fontFamily: t.font.display,
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: isTng ? '0.04em' : '0.02em',
    lineHeight: 1.1,
  };

  const theme = createTheme({
    era,
    tokens: t,
    breakpoints: { values: breakpoints },
    spacing: spacingUnit,
    shape: { borderRadius: isTng ? radius.lg : radius.sm },
    palette: {
      mode: t.mode,
      contrastThreshold: 4.5,
      primary: { main: t.accent.primary, contrastText: t.accent.primaryContrast },
      secondary: { main: t.accent.secondary, contrastText: t.accent.secondaryContrast },
      error: { main: t.status.error },
      success: { main: t.status.success },
      warning: { main: t.status.warning },
      background: { default: t.surface.page, paper: t.surface.panel },
      text: { primary: t.text.primary, secondary: t.text.secondary },
      divider: t.border,
    },
    typography: {
      fontFamily: t.font.body,
      // rem-based sizes so browser font settings and zoom work.
      htmlFontSize: 16,
      fontSize: 16,
      body1: { fontSize: typeScale.body, lineHeight: 1.6 },
      body2: { fontSize: typeScale.small, lineHeight: 1.55 },
      h1: { ...displayHeading, fontSize: typeScale.h1, fontWeight: 700 },
      h2: { ...displayHeading, fontSize: typeScale.h2 },
      h3: { fontFamily: t.font.body, fontSize: typeScale.h3, fontWeight: 650, lineHeight: 1.3 },
      h4: { fontFamily: t.font.body, fontSize: '1.1rem', fontWeight: 650 },
      overline: {
        fontFamily: t.font.display,
        fontSize: '0.95rem',
        fontWeight: 600,
        letterSpacing: '0.12em',
        lineHeight: 1.4,
      },
      button: {
        fontFamily: t.font.display,
        fontWeight: 600,
        fontSize: '1rem',
        letterSpacing: '0.06em',
      },
    },
    transitions: reducedMotion
      ? { create: () => 'none' }
      : { duration: { shortest: motion.fast, shorter: motion.fast, short: motion.base } },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': { ...toCssVariables(t), colorScheme: t.mode },
          html: { scrollPaddingTop: '5rem' },
          body: {
            backgroundColor: t.surface.page,
            color: t.text.primary,
            minWidth: 320,
            overflowX: 'hidden',
          },
          ':focus-visible': {
            outline: `3px solid ${t.focus}`,
            outlineOffset: 2,
          },
          '@media (prefers-reduced-motion: reduce)': {
            '*, *::before, *::after': {
              animationDuration: '0.01ms !important',
              animationIterationCount: '1 !important',
              transitionDuration: '0.01ms !important',
              scrollBehavior: 'auto !important',
            },
          },
          '@media print': {
            ':root': { colorScheme: 'light' },
            'html, body': { background: '#fff !important', color: '#000 !important' },
            '[data-print="hide"]': { display: 'none !important' },
            // Chrome hides hidden="until-found" with content-visibility, not display.
            '[data-print="expand"], [data-findable-collapse]': {
              display: 'block !important',
              height: 'auto !important',
              visibility: 'visible !important',
              contentVisibility: 'visible !important',
            },
            '.MuiAccordionSummary-expandIconWrapper': { display: 'none !important' },
            '.MuiChip-root': {
              background: 'transparent !important',
              border: '1px solid #000 !important',
            },
            '.MuiPaper-root, .MuiCard-root, .MuiAccordion-root': {
              background: '#fff !important',
              color: '#000 !important',
              boxShadow: 'none !important',
              border: 'none !important',
            },
            '*': { color: '#000 !important' },
            a: { textDecoration: 'underline' },
          },
        },
      },
      MuiButtonBase: {
        defaultProps: { disableRipple: reducedMotion },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            minHeight: 44,
            paddingInline: 20,
            borderRadius: isTng ? radius.pill : radius.sm,
            textTransform: 'uppercase',
            '&:focus-visible': { outline: `3px solid ${t.focus}`, outlineOffset: 2 },
          },
          outlined: { borderWidth: 2, '&:hover': { borderWidth: 2 } },
        },
        variants: isTng
          ? []
          : [
              {
                // TOS "button bank": square, chunky, with a hard bottom edge.
                props: { variant: 'contained' },
                style: { boxShadow: `inset 0 -4px 0 rgba(0,0,0,0.25)` },
              },
            ],
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            minWidth: 24,
            minHeight: 24,
            [coarsePointer]: { minWidth: 44, minHeight: 44 },
            '&:focus-visible': { outline: `3px solid ${t.focus}`, outlineOffset: 2 },
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: { backgroundImage: 'none', backgroundColor: t.surface.panel },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${t.border}`,
            borderRadius: isTng ? radius.lg : radius.none,
          },
        },
      },
      MuiAccordion: {
        defaultProps: { disableGutters: true },
        styleOverrides: {
          root: {
            border: `1px solid ${t.border}`,
            borderRadius: isTng ? radius.md : radius.none,
            '&::before': { display: 'none' },
            '& + &': { marginTop: spacingUnit * 1.5 },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            minHeight: 56,
            paddingBlock: spacingUnit,
            '&.Mui-focusVisible': {
              outline: `3px solid ${t.focus}`,
              outlineOffset: -3,
              backgroundColor: 'transparent',
            },
          },
          content: { margin: 0 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontSize: '0.95rem',
            borderRadius: isTng ? radius.pill : radius.sm,
            height: 'auto',
            minHeight: 32,
            paddingBlock: 2,
          },
          outlined: { borderColor: t.border },
        },
      },
      MuiLink: {
        defaultProps: { underline: 'always' },
        styleOverrides: {
          root: {
            color: t.text.link,
            textUnderlineOffset: '0.2em',
            textDecorationColor: 'currentColor',
            '&:focus-visible': {
              outline: `3px solid ${t.focus}`,
              outlineOffset: 2,
              borderRadius: 2,
            },
          },
        },
      },
      MuiAppBar: {
        defaultProps: { elevation: 0, color: 'transparent' },
        styleOverrides: {
          root: {
            backgroundColor: t.surface.page,
            borderBottom: `1px solid ${t.border}`,
            paddingTop: 'env(safe-area-inset-top)',
          },
        },
      },
      MuiContainer: {
        defaultProps: { maxWidth: false },
        styleOverrides: {
          root: {
            maxWidth: contentMaxWidth,
            paddingLeft: `max(16px, env(safe-area-inset-left))`,
            paddingRight: `max(16px, env(safe-area-inset-right))`,
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            '&.Mui-focusVisible + .MuiSwitch-track': {
              outline: `3px solid ${t.focus}`,
              outlineOffset: 2,
            },
          },
        },
      },
    },
  });

  return theme;
}
