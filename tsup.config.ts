/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-exports */
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/react-native/index.ts'],
  format: ['cjs'],
  dts: true, // Generate TypeScript declaration files
  sourcemap: true, // Include sourcemaps
  clean: true, // Clean the output folder before building
  minify: true,
  outDir: 'dist',
  splitting: true,
  target: 'es2020',
  tsconfig: 'tsconfig.json',
});
