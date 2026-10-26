let ready: Promise<void> | null = null;

/**
 * Starts the simulated backend (in dev and in production) without blocking the first
 * render. API code awaits `mockApiReady()` before its first request.
 */
export function startMockApi(): Promise<void> {
  ready ??= import('./browser')
    .then(({ worker }) =>
      worker.start({
        serviceWorker: { url: '/mockServiceWorker.js' },
        onUnhandledFrame: 'bypass',
        quiet: true,
      }),
    )
    .then(() => undefined)
    .catch((error: unknown) => {
      console.error('Simulated backend failed to start', error);
    });
  return ready;
}

export function mockApiReady(): Promise<void> {
  return ready ?? startMockApi();
}
