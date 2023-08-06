/* eslint-disable @typescript-eslint/naming-convention */
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import env from 'vite-plugin-env-compatible';
// Import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    // Devtools(),
    solidPlugin(),
    env({ prefix: 'VITE', mountedPath: 'process.env' }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
