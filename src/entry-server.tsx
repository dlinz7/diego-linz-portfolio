import createEmotionServer from '@emotion/server/create-instance';
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router';
import { AppProviders } from './app/providers';
import { routes } from './app/routes';
import { makeStore } from './app/store';
import { createEmotionCache } from './theme/emotionCache';

export { buildPersonJsonLd, serializeJsonLd } from './content/jsonLd';
export { prerenderedRoutes } from './content/pageMeta';
export { site } from './content/site';

/** Renders one route to HTML plus the Emotion style tags it needs. Used only by scripts/prerender.mjs. */
export async function render(path: string) {
  const handler = createStaticHandler(routes);
  const context = await handler.query(new Request(new URL(path, 'http://prerender.local')));
  if (context instanceof Response) {
    throw new Error(`Route ${path} returned a redirect or response; it can't be prerendered.`);
  }
  const router = createStaticRouter(handler.dataRoutes, context);
  const cache = createEmotionCache();
  const emotionServer = createEmotionServer(cache);

  const html = renderToString(
    <StrictMode>
      <AppProviders store={makeStore()} emotionCache={cache}>
        <StaticRouterProvider router={router} context={context} />
      </AppProviders>
    </StrictMode>,
  );

  const styleTags = emotionServer.constructStyleTagsFromChunks(
    emotionServer.extractCriticalToChunks(html),
  );
  return { html, styleTags };
}
