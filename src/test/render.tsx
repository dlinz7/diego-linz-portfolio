import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { AppProviders } from '@/app/providers';
import { routes } from '@/app/routes';
import { makeStore, type RootState } from '@/app/store';
import { createEmotionCache } from '@/theme/emotionCache';

interface Options {
  route?: string;
  preloadedState?: Partial<RootState>;
}

/** Renders the real app routes at a given URL with a fresh store. */
export function renderApp({ route = '/', preloadedState }: Options = {}) {
  const store = makeStore(preloadedState);
  const router = createMemoryRouter(routes, { initialEntries: [route] });
  const user = userEvent.setup();
  const result = render(
    <AppProviders store={store} emotionCache={createEmotionCache()}>
      <RouterProvider router={router} />
    </AppProviders>,
  );
  return { ...result, store, router, user };
}
