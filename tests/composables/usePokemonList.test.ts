import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { PokemonDetails } from '../../shared/types/pokemon'

async function freshComposable() {
  vi.resetModules()
  const mod = await import('../../app/composables/usePokemonList')
  return mod.usePokemonList
}

const makePokemon = (id: number): PokemonDetails => ({
  id,
  name: `pokemon-${id}`,
  displayName: `Pokemon ${id}`,
  thumbnail: `https://example.com/${id}.png`,
  types: ['normal'],
})

describe('usePokemonList', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('exposes initial empty state', async () => {
    const usePokemonList = await freshComposable()
    const { pokemon, pending, error, hasMore } = usePokemonList()
    expect(pokemon.value).toEqual([])
    expect(pending.value).toBe(false)
    expect(error.value).toBeNull()
    expect(hasMore.value).toBe(true)
  })

  it('fetches pokemon and updates the list', async () => {
    const batch = [makePokemon(1), makePokemon(2)]
    ;(globalThis.$fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(batch)

    const usePokemonList = await freshComposable()
    const { pokemon, fetchPokemon } = usePokemonList()
    await fetchPokemon()

    expect(pokemon.value).toEqual(batch)
  })

  it('increments the offset by the limit (60) after a successful fetch', async () => {
    const batch = Array.from({ length: 60 }, (_, i) => makePokemon(i + 1))
    ;(globalThis.$fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(batch)

    const usePokemonList = await freshComposable()
    const { fetchPokemon } = usePokemonList()

    // Peek at offset via a second fetch call's query arg
    await fetchPokemon()
    await (globalThis.$fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce([])
    await fetchPokemon()

    const calls = (globalThis.$fetch as ReturnType<typeof vi.fn>).mock.calls
    expect(calls[0][1].query.offset).toBe(0)
    expect(calls[1][1].query.offset).toBe(60)
  })

  it('sets hasMore to false when fewer results than the limit are returned', async () => {
    const batch = [makePokemon(1)] // fewer than 60
    ;(globalThis.$fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(batch)

    const usePokemonList = await freshComposable()
    const { hasMore, fetchPokemon } = usePokemonList()
    await fetchPokemon()

    expect(hasMore.value).toBe(false)
  })

  it('sets hasMore to true when a full page (60) is returned', async () => {
    const batch = Array.from({ length: 60 }, (_, i) => makePokemon(i + 1))
    ;(globalThis.$fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(batch)

    const usePokemonList = await freshComposable()
    const { hasMore, fetchPokemon } = usePokemonList()
    await fetchPokemon()

    expect(hasMore.value).toBe(true)
  })

  it('appends results across multiple fetches', async () => {
    // First batch must be a full page (60 items) so hasMore stays true
    const first = Array.from({ length: 60 }, (_, i) => makePokemon(i + 1))
    const second = [makePokemon(61)]
    const fetchMock = globalThis.$fetch as ReturnType<typeof vi.fn>
    fetchMock.mockResolvedValueOnce(first).mockResolvedValueOnce(second)

    const usePokemonList = await freshComposable()
    const { pokemon, fetchPokemon } = usePokemonList()
    await fetchPokemon()
    await fetchPokemon()

    expect(pokemon.value).toEqual([...first, ...second])
  })

  it('does not fetch again while a request is already pending', async () => {
    // Never resolves during the test
    ;(globalThis.$fetch as ReturnType<typeof vi.fn>).mockImplementationOnce(
      () => new Promise(() => {}),
    )

    const usePokemonList = await freshComposable()
    const { fetchPokemon } = usePokemonList()

    fetchPokemon() // starts, never resolves
    await fetchPokemon() // should be a no-op

    expect((globalThis.$fetch as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(1)
  })

  it('does not fetch when hasMore is false', async () => {
    const batch = [makePokemon(1)] // partial page → hasMore becomes false
    ;(globalThis.$fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(batch)

    const usePokemonList = await freshComposable()
    const { fetchPokemon } = usePokemonList()
    await fetchPokemon()
    await fetchPokemon() // should be skipped

    expect((globalThis.$fetch as ReturnType<typeof vi.fn>).mock.calls).toHaveLength(1)
  })

  it('stores errors and clears them on a subsequent successful fetch', async () => {
    const fetchMock = globalThis.$fetch as ReturnType<typeof vi.fn>
    const boom = new Error('Network error')
    fetchMock.mockRejectedValueOnce(boom)

    const usePokemonList = await freshComposable()
    const { error, fetchPokemon } = usePokemonList()
    await fetchPokemon()

    expect(error.value).toBe(boom)

    // Second attempt succeeds → error should clear
    fetchMock.mockResolvedValueOnce([makePokemon(1)])
    await fetchPokemon()
    expect(error.value).toBeNull()
  })

  it('resets pending to false after an error', async () => {
    ;(globalThis.$fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('fail'))

    const usePokemonList = await freshComposable()
    const { pending, fetchPokemon } = usePokemonList()
    await fetchPokemon()

    expect(pending.value).toBe(false)
  })
})

