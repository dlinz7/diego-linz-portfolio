import createCache from '@emotion/cache';

/** Same key on server and client so the browser reuses the prerendered style tags. */
export function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
