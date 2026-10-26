import { describe, expect, it } from 'vitest';
import { contrastRatio } from './contrast';
import { ERAS, semanticTokens } from './semantic';

const TEXT_MIN = 4.5;
const UI_MIN = 3;

describe('contrastRatio', () => {
  it('matches known WCAG values', () => {
    expect(contrastRatio('#000', '#fff')).toBeCloseTo(21, 1);
    expect(contrastRatio('#777777', '#ffffff')).toBeCloseTo(4.48, 1);
  });
});

describe.each(ERAS)('%s era tokens', (era) => {
  const t = semanticTokens[era];
  const backgrounds = Object.entries(t.surface);

  it.each(backgrounds)('text, links and status colors pass 4.5:1 on %s', (_name, bg) => {
    const foregrounds = {
      'text.primary': t.text.primary,
      'text.secondary': t.text.secondary,
      'text.link': t.text.link,
      'status.error': t.status.error,
      'status.success': t.status.success,
      'status.warning': t.status.warning,
      ...Object.fromEntries(
        Object.entries(t.division).map(([id, d]) => [`division.${id}.text`, d.text]),
      ),
    };
    for (const [name, fg] of Object.entries(foregrounds)) {
      expect
        .soft(contrastRatio(fg, bg), `${era} ${name} on ${bg}`)
        .toBeGreaterThanOrEqual(TEXT_MIN);
    }
  });

  it.each(backgrounds)('focus ring and division fills pass 3:1 on %s', (_name, bg) => {
    expect.soft(contrastRatio(t.focus, bg), `${era} focus`).toBeGreaterThanOrEqual(UI_MIN);
    for (const [id, d] of Object.entries(t.division)) {
      expect
        .soft(contrastRatio(d.main, bg), `${era} division.${id}.main`)
        .toBeGreaterThanOrEqual(UI_MIN);
    }
  });

  it('text placed on filled colors passes 4.5:1', () => {
    expect(contrastRatio(t.accent.primaryContrast, t.accent.primary)).toBeGreaterThanOrEqual(
      TEXT_MIN,
    );
    expect(contrastRatio(t.accent.secondaryContrast, t.accent.secondary)).toBeGreaterThanOrEqual(
      TEXT_MIN,
    );
    for (const [id, d] of Object.entries(t.division)) {
      expect
        .soft(contrastRatio(d.contrastText, d.main), `${era} ${id} contrastText`)
        .toBeGreaterThanOrEqual(TEXT_MIN);
    }
  });
});
