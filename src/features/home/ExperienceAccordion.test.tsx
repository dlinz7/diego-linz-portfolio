import { fireEvent, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { resume } from '@/content/resume';
import { renderApp } from '@/test/render';

const [comptroller, utAustin, facebook] = resume.experience;

function roleButton(employer: string) {
  const escaped = employer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return screen.getByRole('button', { name: new RegExp(escaped, 'i') });
}

describe('Experience accordion', () => {
  it('renders each role as an h3 under the Experience h2, with summary details visible', () => {
    renderApp();
    const section = screen.getByRole('region', { name: 'Experience' });
    expect(
      within(section).getByRole('heading', { level: 2, name: 'Experience' }),
    ).toBeInTheDocument();
    const roleHeadings = within(section).getAllByRole('heading', { level: 3 });
    expect(roleHeadings).toHaveLength(resume.experience.length);

    for (const role of resume.experience) {
      const button = roleButton(role.employer);
      expect(button).toHaveTextContent(role.title);
      expect(button).toHaveTextContent(role.headline);
    }
    expect(roleButton(comptroller!.employer)).toHaveTextContent('Jun 2022 – Present');
  });

  it('expands the most recent role by default and collapses the rest', () => {
    renderApp();
    expect(roleButton(comptroller!.employer)).toHaveAttribute('aria-expanded', 'true');
    expect(roleButton(utAustin!.employer)).toHaveAttribute('aria-expanded', 'false');
    expect(roleButton(facebook!.employer)).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps collapsed bullet text in the DOM so find-in-page and crawlers see it', () => {
    renderApp();
    const bullet = screen.getByText(facebook!.bullets[0]!);
    expect(bullet).toBeInTheDocument();
    expect(bullet).not.toBeVisible();
    const collapse = bullet.closest('[data-findable-collapse]');
    expect(collapse).toHaveAttribute('hidden', 'until-found');
  });

  it('expands a role when the browser finds text inside it', () => {
    renderApp();
    const bullet = screen.getByText(facebook!.bullets[0]!);
    fireEvent(bullet.closest('[data-findable-collapse]')!, new Event('beforematch'));
    expect(roleButton(facebook!.employer)).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles a role with the keyboard', async () => {
    const { user } = renderApp();
    roleButton(utAustin!.employer).focus();
    await user.keyboard('{Enter}');
    expect(roleButton(utAustin!.employer)).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard(' ');
    expect(roleButton(utAustin!.employer)).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands and collapses all roles', async () => {
    const { user } = renderApp();
    await user.click(screen.getByRole('button', { name: 'Expand all' }));
    for (const role of resume.experience) {
      expect(roleButton(role.employer)).toHaveAttribute('aria-expanded', 'true');
    }
    await user.click(screen.getByRole('button', { name: 'Collapse all' }));
    for (const role of resume.experience) {
      expect(roleButton(role.employer)).toHaveAttribute('aria-expanded', 'false');
    }
  });
});
