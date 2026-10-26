import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { resume } from '@/content/resume';
import { renderApp } from '@/test/render';

describe('Home page', () => {
  it('shows name, title, contact actions and availability without any interaction', () => {
    renderApp();
    expect(screen.getByRole('heading', { level: 1, name: resume.name })).toBeInTheDocument();
    expect(screen.getByText(resume.title, { selector: 'p' })).toBeInTheDocument();
    expect(screen.getByText(resume.location.display)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /download resume \(pdf\)/i })).toHaveAttribute(
      'href',
      '/Diego-Linz-Resume.pdf',
    );
    expect(screen.getByRole('link', { name: /email me/i })).toHaveAttribute(
      'href',
      expect.stringMatching(/^mailto:/),
    );
    expect(screen.getByText(/open to senior frontend roles/i)).toBeInTheDocument();
  });

  it('renders every impact metric as text', () => {
    renderApp();
    const impact = screen.getByRole('region', { name: 'Impact' });
    for (const metric of resume.metrics) {
      expect(within(impact).getByText(metric.value)).toBeInTheDocument();
      expect(within(impact).getByText(metric.label)).toBeInTheDocument();
    }
  });

  it('lists React, TypeScript, Redux and MUI first under Frontend skills', () => {
    renderApp();
    const skills = screen.getByRole('region', { name: 'Skills' });
    const frontend = within(skills).getAllByRole('list')[0]!;
    const names = within(frontend)
      .getAllByRole('listitem')
      .map((item) => item.textContent);
    expect(names.slice(0, 4)).toEqual(['React', 'TypeScript', 'Redux', 'MUI']);
  });

  it('shows the education line', () => {
    renderApp();
    const education = screen.getByRole('region', { name: 'Education' });
    expect(education).toHaveTextContent(
      'B.A. Economics, The University of Texas at Austin · Dec 2013',
    );
  });

  it('includes the fan disclaimer', () => {
    renderApp();
    expect(
      screen.getByText(/not affiliated with or endorsed by paramount or cbs studios/i),
    ).toBeInTheDocument();
  });
});
