import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { readJson } from '@/lib/storage';
import { DEFAULT_ERA, ERAS, type Era } from '@/theme/semantic';

export interface UiState {
  era: Era;
}

export const UI_STORAGE_KEY = 'dl.ui';
export const UI_STORAGE_VERSION = 1;

export interface PersistedUi {
  version: number;
  era: Era;
}

export const initialUiState: UiState = { era: DEFAULT_ERA };

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiState,
  reducers: {
    eraChanged(state, action: PayloadAction<Era>) {
      state.era = action.payload;
    },
    eraToggled(state) {
      state.era = state.era === 'tng' ? 'tos' : 'tng';
    },
  },
});

export const { eraChanged, eraToggled } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;

/** Reads saved UI settings, ignoring anything from an unknown version or with bad values. */
export function loadPersistedUi(): UiState {
  const saved = readJson<Partial<PersistedUi>>('local', UI_STORAGE_KEY);
  if (!saved || saved.version !== UI_STORAGE_VERSION) return initialUiState;
  const era = ERAS.includes(saved.era as Era) ? (saved.era as Era) : DEFAULT_ERA;
  return { ...initialUiState, era };
}

export function toPersistedUi(state: UiState): PersistedUi {
  return { version: UI_STORAGE_VERSION, era: state.era };
}
