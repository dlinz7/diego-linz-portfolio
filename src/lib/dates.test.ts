import { describe, expect, it } from 'vitest';
import { formatDateRange, formatMonthYear } from './dates';

describe('dates', () => {
  it('formats year-month strings', () => {
    expect(formatMonthYear('2022-06')).toBe('Jun 2022');
    expect(formatMonthYear('2013-12')).toBe('Dec 2013');
  });

  it('returns unparseable input unchanged', () => {
    expect(formatMonthYear('soon')).toBe('soon');
  });

  it('formats ranges, using "Present" for current roles', () => {
    expect(formatDateRange('2018-07', '2022-06')).toBe('Jul 2018 – Jun 2022');
    expect(formatDateRange('2022-06', null)).toBe('Jun 2022 – Present');
  });
});
