import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { resume } from '@/content/resume';
import { renderApp } from '@/test/render';

describe('Personnel File page', () => {
  it('shows every bullet of every role, with each role as a heading', () => {
    renderApp({ route: '/personnel-file' });
    for (const role of resume.experience) {
      expect(screen.getByRole('heading', { level: 3, name: role.title })).toBeInTheDocument();
      for (const bullet of role.bullets) {
        expect(screen.getByText(bullet)).toBeVisible();
      }
    }
  });

  it('hides the email address until asked, then shows a mailto link', async () => {
    const { user } = renderApp({ route: '/personnel-file' });
    expect(screen.queryByText(/gmail\.com/)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show email address' }));
    expect(screen.getByRole('link', { name: /gmail\.com/ })).toHaveAttribute(
      'href',
      expect.stringMatching(/^mailto:/),
    );
  });

  it('includes the "How this site maps to my experience" callout', () => {
    renderApp({ route: '/personnel-file' });
    expect(
      screen.getByRole('heading', { name: 'How this site maps to my experience' }),
    ).toBeInTheDocument();
  });
});
