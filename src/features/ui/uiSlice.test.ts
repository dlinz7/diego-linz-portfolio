import { afterEach, describe, expect, it, vi } from 'vitest';
import { makeStore } from '@/app/store';
import { UI_STORAGE_KEY, eraChanged, eraToggled, loadPersistedUi } from './uiSlice';

describe('ui slice', () => {
  afterEach(() => vi.useRealTimers());

  it('defaults to the TNG era', () => {
    expect(makeStore().getState().ui.era).toBe('tng');
  });

  it('toggles between eras', () => {
    const store = makeStore();
    store.dispatch(eraToggled());
    expect(store.getState().ui.era).toBe('tos');
    store.dispatch(eraToggled());
    expect(store.getState().ui.era).toBe('tng');
  });

  it('saves the era to localStorage after a short debounce', async () => {
    vi.useFakeTimers();
    const store = makeStore();
    store.dispatch(eraChanged('tos'));
    store.dispatch(eraChanged('tng'));
    store.dispatch(eraChanged('tos'));
    expect(window.localStorage.getItem(UI_STORAGE_KEY)).toBeNull();
    await vi.advanceTimersByTimeAsync(300);
    expect(JSON.parse(window.localStorage.getItem(UI_STORAGE_KEY)!)).toEqual({
      version: 1,
      era: 'tos',
    });
  });

  it('loads a saved era', () => {
    window.localStorage.setItem(UI_STORAGE_KEY, JSON.stringify({ version: 1, era: 'tos' }));
    expect(loadPersistedUi().era).toBe('tos');
  });

  it.each([
    ['an unknown version', JSON.stringify({ version: 99, era: 'tos' })],
    ['an invalid era', JSON.stringify({ version: 1, era: 'mirror-universe' })],
    ['corrupt JSON', '{not json'],
  ])('falls back to defaults for %s', (_label, raw) => {
    window.localStorage.setItem(UI_STORAGE_KEY, raw);
    expect(loadPersistedUi().era).toBe('tng');
  });
});
