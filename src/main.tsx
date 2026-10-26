import './theme/fonts';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { AppProviders } from './app/providers';
import { routes } from './app/routes';
import { makeStore } from './app/store';
import { loadPersistedUi } from './features/ui/uiSlice';
import { startMockApi } from './mocks/start';
import { createEmotionCache } from './theme/emotionCache';
import { DEFAULT_ERA } from './theme/semantic';

const store = makeStore({ ui: loadPersistedUi() });
const router = createBrowserRouter(routes);
const container = document.getElementById('root');
if (!container) throw new Error('Missing #root element');

const app = (
  <StrictMode>
    <AppProviders store={store} emotionCache={createEmotionCache()}>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>
);

const normalize = (path: string) => path.replace(/\/+$/, '') || '/';
const prerenderedPath = container.dataset.prerenderedPath;

// Prerendered HTML is always the default era. Hydrate only when it matches what this
// visitor will see; otherwise render fresh rather than patch a mismatched page.
const canHydrate =
  prerenderedPath !== undefined &&
  normalize(prerenderedPath) === normalize(window.location.pathname) &&
  store.getState().ui.era === DEFAULT_ERA;

if (canHydrate) {
  hydrateRoot(container, app);
} else {
  container.replaceChildren();
  createRoot(container).render(app);
}

void startMockApi();
