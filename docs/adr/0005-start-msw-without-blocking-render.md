# 5. Start the mock backend without blocking the first render

**Status:** accepted (the full "MSW as the backend" ADR comes with the API layer)

## Context

MSW runs in production as the site's backend. The usual setup awaits `worker.start()` before
rendering, which would delay the resume on the home page, where the LCP target is 1.5 s on mobile.
The home page makes no API calls.

## Decision

`main.tsx` renders first, then calls `startMockApi()`, which loads the worker code in its own
chunk. API code awaits `mockApiReady()` before its first request.

## Consequences

- The home page never waits on the service worker, and the MSW code is not in the initial bundle.
- Any new API client must await `mockApiReady()`; the RTK Query base query will do this in one
  place.
