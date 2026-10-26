import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderApp } from '@/test/render';

describe('App shell', () => {
  it('has a skip link to the main landmark', () => {
    renderApp();
    expect(screen.getByRole('link', { name: 'Skip to main content' })).toHaveAttribute(
      'href',
      '#main',
    );
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
  });

  it('always shows a resume link in the top bar', () => {
    renderApp();
    const banner = screen.getByRole('banner');
    expect(banner).toContainElement(screen.getAllByRole('link', { name: /resume/i })[0]!);
  });

  it('switches eras with an accessibly named switch', async () => {
    const { user, store } = renderApp();
    const toggle = screen.getAllByRole('switch', { name: 'Interface era: TNG' })[0]!;
    expect(toggle).toBeChecked();
    await user.click(toggle);
    expect(store.getState().ui.era).toBe('tos');
    expect(document.documentElement.dataset.era).toBe('tos');
  });

  it('moves focus to the new page heading after navigation', async () => {
    const { user } = renderApp();
    await user.click(screen.getAllByRole('link', { name: 'Personnel File (Resume)' })[0]!);
    const heading = await screen.findByRole('heading', { level: 1, name: 'Diego Linz' });
    expect(heading).toHaveFocus();
    expect(document.title).toMatch(/^Resume/);
  });

  it('shows a friendly 404 for unknown routes', async () => {
    renderApp({ route: '/warp-core-breach' });
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Sector not charted' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Return to home' })).toHaveAttribute('href', '/');
  });
});
