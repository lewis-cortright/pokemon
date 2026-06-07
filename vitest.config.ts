import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
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
