import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
  },
  ssr: {
    // MUI and Emotion ship CommonJS + ESM; bundling them avoids Node resolution quirks in the prerender step.
    noExternal: [/^@mui\//, /^@emotion\//],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    coverage: {
      provider: 'v8',
      include: ['src/features/**', 'src/lib/**', 'src/theme/**', 'src/content/**'],
      exclude: ['**/*.stories.tsx', '**/*.test.{ts,tsx}'],
    },
  },
});
