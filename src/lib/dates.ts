const monthYear = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "2022-06" → "Jun 2022". */
export function formatMonthYear(yearMonth: string): string {
  const [year, month] = yearMonth.split('-').map(Number);
  if (!year || !month) return yearMonth;
  return monthYear.format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatDateRange(start: string, end: string | null): string {
  return `${formatMonthYear(start)} – ${end ? formatMonthYear(end) : 'Present'}`;
}
