import { defineConfig } from 'vitest/config'
import { resolve } from 'path'
// @ts-ignore – @vitejs/plugin-vue ships .mts types; resolved fine by Vite/Vitest at runtime
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    // Cast to any: @vitejs/plugin-vue@6 is typed against Vite 7 while vitest 0.33
    // ships Vite 4 types — compatible at runtime, incompatible at the type level.
    vue() as any,
    AutoImport({ imports: ['vue'], dts: false }) as any,
  ],
  define: {
    'import.meta.client': 'true',
    'import.meta.server': 'false',
  },
  resolve: {
    alias: [
      { find: '#shared', replacement: resolve(__dirname, 'shared') },
      { find: '#server', replacement: resolve(__dirname, 'server') },
      { find: '#components', replacement: resolve(__dirname, 'tests/__mocks__/nuxt-components.ts') },
      { find: '@', replacement: resolve(__dirname, 'app') },
      { find: '~', replacement: resolve(__dirname, 'app') },
      // Aliases for Nuxt server-route files with brackets in their names
      // (Vite cannot resolve [ ] characters in dynamic-import URLs)
      { find: 'pokemon-list-handler', replacement: resolve(__dirname, 'server/api/pokemon/index.get.ts') },
      { find: 'pokemon-id-handler', replacement: resolve(__dirname, 'server/api/pokemon/[id].get.ts') },
    ],
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
      exclude: [
        '.nuxt/**',
        '.output/**',
        'node_modules/**',
        'coverage/**',
        'nuxt.config.ts',
        'vitest.config.ts',
      ],
    },
  },
})
