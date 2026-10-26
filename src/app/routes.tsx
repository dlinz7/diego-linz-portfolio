import type { RouteObject } from 'react-router';
import { AppShell } from '@/components/layout/AppShell';
import { RouteErrorPage } from '@/features/errors/RouteErrorPage';
import { HomePage } from '@/features/home/HomePage';
import { PersonnelFilePage } from '@/features/personnel/PersonnelFilePage';

/**
 * Home and the resume are imported directly because they are prerendered and must
 * hydrate without waiting. Everything else is split into its own chunk.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppShell />,
    errorElement: <RouteErrorPage />,
    hydrateFallbackElement: null,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'personnel-file', element: <PersonnelFilePage /> },
      {
        path: 'ships-systems',
        lazy: async () => {
          const { ShipsSystemsPage } = await import('@/features/systems/ShipsSystemsPage');
          return { Component: ShipsSystemsPage };
        },
      },
      {
        path: 'apply/*',
        lazy: async () => {
          const { ApplyPlaceholderPage } =
            await import('@/features/application/ApplyPlaceholderPage');
          return { Component: ApplyPlaceholderPage };
        },
      },
      {
        path: '*',
        lazy: async () => {
          const { NotFoundPage } = await import('@/features/errors/NotFoundPage');
          return { Component: NotFoundPage };
        },
      },
    ],
  },
];
