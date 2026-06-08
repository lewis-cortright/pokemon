/// <reference types="vitest/globals" />
import { ref } from 'vue'
import { vi, beforeEach } from 'vitest'

// ── Vue / Nuxt state ──────────────────────────────────────────────────────────

// Lightweight stand-in for Nuxt's useState (key-keyed shared ref)
const _stateStore = new Map<string, ReturnType<typeof ref>>()

globalThis.useState = <T>(key: string, init?: () => T) => {
  if (!_stateStore.has(key)) {
    _stateStore.set(key, ref(init?.()))
  }
  return _stateStore.get(key)! as { value: T }
}

// Reset shared state before every test so tests stay independent
beforeEach(() => {
  _stateStore.clear()
})

globalThis.$fetch = vi.fn()

// ── H3 / Nitro server globals ─────────────────────────────────────────────────

globalThis.useRuntimeConfig = vi.fn(() => ({ pokeApiBaseURL: 'https://pokeapi.co/api/v2' }))

globalThis.defineEventHandler = <T>(fn: (event: unknown) => T): ((event: unknown) => T) => fn as (event: unknown) => T

globalThis.getQuery = vi.fn(() => ({}))

globalThis.getRouterParam = vi.fn()

globalThis.createError = vi.fn(
  ({ statusCode, statusMessage }: { statusCode: number; statusMessage: string }) =>
    Object.assign(new Error(statusMessage), { statusCode }),
)

// ── Browser APIs not provided by happy-dom ────────────────────────────────────

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
