/// <reference path="../globals.d.ts" />
import { describe, it, expect, vi, beforeEach } from 'vitest'
// @ts-ignore – shared path resolved by Vite alias; standalone TS checker lacks the mapping
import type { PokemonApiResponse, PokemonPageData } from '../../../shared/types/pokemon'
// @ts-ignore – virtual alias defined in vitest.config.ts resolve.alias
import handler from 'pokemon-list-handler'

const BASE = 'https://pokeapi.co/api/v2'

const mockApiResponse = (id: number): PokemonApiResponse => ({
  id,
  name: `pokemon-${id}`,
  height: 10,
  weight: 100,
  base_experience: 50,
  abilities: [{ ability: { name: 'run-away' } }],
  sprites: {
    front_default: `https://example.com/${id}.png`,
    back_default: `https://example.com/${id}-back.png`,
    other: { showdown: { front_default: '' } },
  },
  types: [{ slot: 1, type: { name: 'normal', url: '' } }],
  stats: [{ base_stat: 50, effort: 0, stat: { name: 'hp' } }],
})

const listOf = (count: number): PokemonPageData => ({
  count,
  next: '',
  previous: '',
  results: Array.from({ length: count }, (_, i) => ({
    name: `pokemon-${i + 1}`,
    url: `https://pokeapi.co/api/v2/pokemon/${i + 1}`,
  })),
})

describe('GET /api/pokemon (index handler)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;($fetch as ReturnType<typeof vi.fn>).mockReset()
    ;(getQuery as ReturnType<typeof vi.fn>).mockReturnValue({})
  })

  it('returns a mapped PokemonDetails array', async () => {
    const fetchMock = $fetch as ReturnType<typeof vi.fn>
    fetchMock
      .mockResolvedValueOnce(listOf(1))           // getPokemonList
      .mockResolvedValueOnce(mockApiResponse(1))  // getPokemonByUrl

    const result = await (handler as Function)(null)

    expect(result).toEqual([
      expect.objectContaining({
        id: 1,
        name: 'pokemon-1',
        displayName: 'Pokemon-1',
        thumbnail: 'https://example.com/1.png',
        types: ['normal'],
      }),
    ])
  })

  it('passes limit and offset from the query string to the PokeAPI', async () => {
    ;(getQuery as ReturnType<typeof vi.fn>).mockReturnValue({ limit: '20', offset: '40' })
    ;($fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(listOf(0))

    await (handler as Function)(null)

    const [url, opts] = ($fetch as ReturnType<typeof vi.fn>).mock.calls[0]
    expect(url).toBe(`${BASE}/pokemon`)
    expect(opts.query).toEqual({ limit: 20, offset: 40 })
  })

  it('uses defaults (limit=60, offset=0) when query params are absent', async () => {
    ;($fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(listOf(0))

    await (handler as Function)(null)

    const [, opts] = ($fetch as ReturnType<typeof vi.fn>).mock.calls[0]
    expect(opts.query).toEqual({ limit: 60, offset: 0 })
  })

  it('fetches each pokemon detail by its URL', async () => {
    const fetchMock = $fetch as ReturnType<typeof vi.fn>
    fetchMock
      .mockResolvedValueOnce(listOf(2))
      .mockResolvedValueOnce(mockApiResponse(1))
      .mockResolvedValueOnce(mockApiResponse(2))

    await (handler as Function)(null)

    const urls = ($fetch as ReturnType<typeof vi.fn>).mock.calls
      .slice(1)
      .map(([url]: string[]) => url)
    expect(urls).toContain(`${BASE}/pokemon/1`)
    expect(urls).toContain(`${BASE}/pokemon/2`)
  })
})


