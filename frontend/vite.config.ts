/* eslint-disable @typescript-eslint/naming-convention */
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import env from 'vite-plugin-env-compatible';
import checker from 'vite-plugin-checker'; import tsconfigPaths from 'vite-tsconfig-paths'
// Import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    // Devtools(),
    checker({typescript:true}),
    solidPlugin(),
    env({ prefix: 'VITE', mountedPath: 'process.env' }),tsconfigPaths()
  ],
  server: {
    host: true,
    port: 3000,
  },
  build: {
    target: 'es2020',
  },
});
