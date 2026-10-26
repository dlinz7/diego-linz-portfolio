# 1. Vite single-page app instead of Next.js

**Status:** accepted

## Context

The site needs fast static hosting, a mock backend that runs in the browser (MSW), and a resume
that is readable in the first HTML response for crawlers and link previews. Only two pages need
that: `/` and `/personnel-file`. Everything else is an interactive app behind those pages.

## Decision

Use Vite + React with React Router's data router, and prerender the two resume pages at build time
(see ADR 0003). No server runtime.

## Consequences

- Deploys as plain static files; preview deploys are cheap.
- The "backend" is MSW in every environment, which a server framework would fight with.
- We own a small prerender script instead of getting SSR for free. That is about 60 lines and is
  covered by the build.
