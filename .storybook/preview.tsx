import '../src/theme/fonts';
import type { Decorator, Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { AppProviders } from '../src/app/providers';
import { makeStore } from '../src/app/store';
import { createEmotionCache } from '../src/theme/emotionCache';
import type { Era } from '../src/theme/semantic';

const withApp: Decorator = (Story, context) => {
  const era = (context.globals.era ?? 'tng') as Era;
  return (
    <AppProviders store={makeStore({ ui: { era } })} emotionCache={createEmotionCache()} key={era}>
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    </AppProviders>
  );
};

const preview: Preview = {
  decorators: [withApp],
  globalTypes: {
    era: {
      description: 'Interface era',
      toolbar: {
        title: 'Era',
        icon: 'paintbrush',
        items: [
          { value: 'tng', title: 'TNG' },
          { value: 'tos', title: 'TOS' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { era: 'tng' },
  parameters: {
    layout: 'padded',
    a11y: { test: 'error' },
    viewport: {
      options: {
        iphone13: { name: 'iPhone 13', styles: { width: '390px', height: '844px' } },
        pixel7: { name: 'Pixel 7', styles: { width: '412px', height: '915px' } },
        ipad: { name: 'iPad', styles: { width: '810px', height: '1080px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } },
      },
    },
  },
};

export default preview;
