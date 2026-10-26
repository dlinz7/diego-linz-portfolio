# 4. Self-host Google Fonts through Fontsource

**Status:** accepted

## Context

The spec allows free Google Fonts only: Inter for body text, Antonio for TNG headings, Oswald for
TOS headings. Loading them from `fonts.googleapis.com` adds a third-party connection before
text renders and sends visitor IPs to Google.

## Decision

Install the Fontsource packages and import only the Latin subsets and weights in use
(`src/theme/fonts.ts`). Vite fingerprints and serves the files with the app. Fonts use
`font-display: swap`, and every family has system fallbacks in the token stack.

## Consequences

- No third-party request on the critical path, and the files cache with the rest of the build.
- Adding a weight is an explicit import, which keeps the font payload visible in review.
