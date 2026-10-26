import { CacheProvider, type EmotionCache } from '@emotion/react';
import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { EraThemeProvider } from '@/theme/EraThemeProvider';
import { useAppSelector } from './hooks';
import type { AppStore } from './store';

function ThemedFromStore({ children }: { children: ReactNode }) {
  const era = useAppSelector((state) => state.ui.era);
  return <EraThemeProvider era={era}>{children}</EraThemeProvider>;
}

interface Props {
  store: AppStore;
  emotionCache: EmotionCache;
  children: ReactNode;
}

export function AppProviders({ store, emotionCache, children }: Props) {
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ThemedFromStore>{children}</ThemedFromStore>
      </Provider>
    </CacheProvider>
  );
}
