/// <reference path="../globals.d.ts" />
import { describe, it, expect, vi, beforeEach } from 'vitest'
// @ts-ignore – shared path resolved by Vite alias; standalone TS checker lacks the mapping
import type { PokemonApiResponse } from '../../../shared/types/pokemon'
// @ts-ignore – virtual alias defined in vitest.config.ts resolve.alias
import handler from 'pokemon-id-handler'

const BASE = 'https://pokeapi.co/api/v2'

const mockApiResponse: PokemonApiResponse = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  base_experience: 112,
  abilities: [{ ability: { name: 'static' } }],
  sprites: {
    front_default: 'https://example.com/pikachu.png',
    back_default: 'https://example.com/pikachu-back.png',
    other: { showdown: { front_default: '' } },
  },
  types: [{ slot: 1, type: { name: 'electric', url: '' } }],
  stats: [
    { base_stat: 35, effort: 0, stat: { name: 'hp' } },
    { base_stat: 55, effort: 0, stat: { name: 'attack' } },
  ],
}

describe('GET /api/pokemon/[id] (id handler)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns a mapped PokemonProfile when a valid id is provided', async () => {
    ;(getRouterParam as ReturnType<typeof vi.fn>).mockReturnValue('25')
    ;($fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockApiResponse)

    const result = await (handler as Function)(null)

    expect(result).toMatchObject({
      id: 25,
      name: 'pikachu',
      displayName: 'Pikachu',
      types: ['electric'],
      abilities: [{ ability: { name: 'static' } }],
      base_experience: 112,
      stats: [
        { name: 'hp', value: 35 },
        { name: 'attack', value: 55 },
      ],
    })
  })

  it('calls the PokeAPI with the correct pokemon URL', async () => {
    ;(getRouterParam as ReturnType<typeof vi.fn>).mockReturnValue('25')
    ;($fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce(mockApiResponse)

    await (handler as Function)(null)

    expect($fetch).toHaveBeenCalledWith(`${BASE}/pokemon/25`)
  })

  it('throws a 400 error when the id param is missing', async () => {
    ;(getRouterParam as ReturnType<typeof vi.fn>).mockReturnValue(undefined)
    ;(createError as ReturnType<typeof vi.fn>).mockImplementation(
      ({ statusCode, statusMessage }: { statusCode: number; statusMessage: string }) =>
        Object.assign(new Error(statusMessage), { statusCode }),
    )

    await expect((handler as Function)(null)).rejects.toMatchObject({
      statusCode: 400,
      message: 'Missing Pokémon id',
    })
  })
})


