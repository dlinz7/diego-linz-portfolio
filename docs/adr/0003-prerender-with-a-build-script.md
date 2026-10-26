# 3. Prerender the resume pages with a small build script

**Status:** accepted

## Context

The spec asks for `/` and `/personnel-file` in the initial HTML. Plugins such as
`vite-plugin-ssg` lag behind new React Router and Vite majors, and this project runs React
Router 8 and Vite 8.

## Decision

1. `vite build` builds the browser bundle.
2. `vite build --ssr src/entry-server.tsx` builds a Node version of the app.
3. `scripts/prerender.mjs` renders each route in `prerenderedRoutes` with React Router's static
   handler and Emotion's server helpers, then writes `dist/index.html` and
   `dist/personnel-file/index.html` with the HTML, critical CSS, page title, description,
   canonical URL and JSON-LD.
4. `dist/spa.html` is an empty shell the host serves for every other route.

In the browser, `main.tsx` hydrates only when the prerendered path matches the current URL and the
visitor is on the default era. Otherwise it renders from scratch, which avoids hydrating a page
whose theme doesn't match.

## Consequences

- No extra dependency, and the script fails the build if a prerendered route redirects.
- Home and resume routes are imported directly (not lazy) so hydration never waits on a chunk.
- Visitors who chose TOS get a fresh render instead of hydration. That is a small cost on
  their first paint, accepted for correctness.
