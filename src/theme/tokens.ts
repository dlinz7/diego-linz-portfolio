/**
 * Primitive tokens: raw values with no meaning attached. Components never read
 * these directly; they go through the semantic layer in semantic.ts.
 */

export const color = {
  black: '#000000',
  ink: '#16130E',
  inkSoft: '#4A4234',
  bone: '#F4EFE6',
  boneSoft: '#C9C2B6',
  cream: '#F6EFDC',
  creamLight: '#FFFBF0',
  creamDark: '#EFE4C8',
  night: '#0E1016',
  nightRaised: '#181C25',
  white: '#FFFFFF',

  peach: { 300: '#FFB585', 400: '#FF9C5B' },
  lavender: { 300: '#C9BCF5', 400: '#B7A6F0' },
  tan: { 400: '#E6B88A' },
  periwinkle: { 400: '#8FA7E8' },
  sky: { 300: '#9DC9FF' },
  sun: { 300: '#FFD166' },

  red: { 300: '#FF8A8A', 400: '#F05A5F', 600: '#C8102E', 700: '#B3261E' },
  gold: { 400: '#F7B32B', 600: '#A87700', 800: '#6E4E00' },
  teal: { 400: '#5EB8DC' },
  blue: { 600: '#1F5CB8', 700: '#1A4FA0', 800: '#1D4E9E' },
  green: { 300: '#7BD88F', 800: '#1A6B2D' },
  amber: { 300: '#FFC857', 800: '#7A5000' },
} as const;

/** MUI default breakpoints, listed here so they are documented with the rest of the tokens. */
export const breakpoints = { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } as const;

export const spacingUnit = 8;

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  pill: 999,
  /** The large outer curve on TNG-style panel frames. */
  elbow: 40,
} as const;

export const fontFamily = {
  body: '"Inter Variable", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  tngDisplay: '"Antonio", "Arial Narrow", "Roboto Condensed", sans-serif',
  tosDisplay: '"Oswald", "Arial Narrow", "Roboto Condensed", sans-serif',
} as const;

/** Fluid heading sizes: they scale with the viewport between a minimum and maximum. */
export const typeScale = {
  h1: 'clamp(2.25rem, 1.6rem + 2.8vw, 3.75rem)',
  h2: 'clamp(1.6rem, 1.3rem + 1.4vw, 2.25rem)',
  h3: 'clamp(1.15rem, 1.05rem + 0.5vw, 1.35rem)',
  body: '1rem',
  small: '0.875rem',
} as const;

export const motion = {
  fast: 150,
  base: 250,
  slow: 400,
  /** Cap for the decorative boot sequence on the home page. */
  bootTotal: 1500,
} as const;

export const contentMaxWidth = 1200;
