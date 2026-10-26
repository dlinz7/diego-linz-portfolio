# 2. Two-layer design tokens, shared as CSS variables

**Status:** accepted

## Context

The site has two looks (TOS and TNG) that must swap at runtime, pass WCAG AA contrast, and be
usable by plain CSS, SVG and Storybook as well as MUI components.

## Decision

- `src/theme/tokens.ts` holds raw values (color ramps, spacing, radii, type scale, motion).
- `src/theme/semantic.ts` maps them to meanings per era (`surface.panel`, `accent.primary`,
  `division.command`, `focus`). Components read only these.
- `createEraTheme(era)` builds the MUI theme from the semantic tokens and writes the same values
  as CSS custom properties on `:root` through `MuiCssBaseline`.
- `src/theme/contrast.test.ts` checks every text/background pair in both eras (4.5:1 for text,
  3:1 for focus rings and color fills). It already caught a TOS gold that was 1.9:1 on cream.

## Consequences

- One component can render "command gold" in TOS and "command red" in TNG with no branching.
- The SVG emblem colors itself from CSS variables, so it follows the era for free.
- Adding a color means adding a semantic token, which the contrast test then covers.
