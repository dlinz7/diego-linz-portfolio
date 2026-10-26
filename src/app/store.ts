import { combineReducers, configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import {
  UI_STORAGE_KEY,
  eraChanged,
  eraToggled,
  toPersistedUi,
  uiReducer,
} from '@/features/ui/uiSlice';
import { writeJson } from '@/lib/storage';

const rootReducer = combineReducers({
  ui: uiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function makeStore(preloadedState?: Partial<RootState>) {
  const persistence = createListenerMiddleware();

  persistence.startListening({
    predicate: (action) => eraChanged.match(action) || eraToggled.match(action),
    effect: async (_action, api) => {
      // Debounce: if another change arrives within 250 ms, only the last one is saved.
      api.cancelActiveListeners();
      await api.delay(250);
      const { ui } = api.getState() as RootState;
      writeJson('local', UI_STORAGE_KEY, toPersistedUi(ui));
    },
  });

  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefault) => getDefault().prepend(persistence.middleware),
    devTools: import.meta.env.DEV,
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
