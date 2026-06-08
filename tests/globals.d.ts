/**
 * Ambient type declarations for globals mocked in tests/setup.ts.
 * Kept as a non-module (no import/export) so all declarations are global.
 */

// ── Nuxt / ofetch ─────────────────────────────────────────────────────────────
// eslint-disable-next-line no-var
declare var $fetch: (...args: unknown[]) => Promise<unknown>

// ── Nuxt server composables ───────────────────────────────────────────────────
// eslint-disable-next-line no-var
declare var useState: <T>(key: string, init?: () => T) => { value: T }

// ── Nitro runtime config ──────────────────────────────────────────────────────
// eslint-disable-next-line no-var
declare var useRuntimeConfig: (event?: unknown) => { pokeApiBaseURL: string }

// ── H3 / Nitro server handler globals ────────────────────────────────────────
declare function defineEventHandler<T>(handler: (event: unknown) => T): (event: unknown) => T
declare function getQuery(event: unknown): Record<string, string | undefined>
declare function getRouterParam(event: unknown, name: string): string | undefined
declare function createError(options: {
  statusCode: number
  statusMessage: string
}): Error & { statusCode: number }
