import { describe, it, expect } from 'vitest'
import {
  mapApiTypes,
  mapApiStats,
  mapPokemonToDetails,
  mapResponseToProfile,
} from '../../server/utils/utils'
import type { PokemonApiResponse } from '../../shared/types/pokemon'

const mockPokemon: PokemonApiResponse = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  abilities: [{ ability: { name: 'overgrow' } }, { ability: { name: 'chlorophyll' } }],
  sprites: {
    front_default: 'https://example.com/front.png',
    back_default: 'https://example.com/back.png',
    other: {
      showdown: { front_default: 'https://example.com/showdown.png' },
    },
  },
  types: [
    { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
    { slot: 2, type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } },
  ],
  stats: [
    { base_stat: 45, effort: 0, stat: { name: 'hp' } },
    { base_stat: 49, effort: 0, stat: { name: 'attack' } },
    { base_stat: 49, effort: 0, stat: { name: 'defense' } },
  ],
}

describe('mapApiTypes', () => {
  it('returns an array of type name strings', () => {
    expect(mapApiTypes(mockPokemon)).toEqual(['grass', 'poison'])
  })

  it('returns an empty array when the pokemon has no types', () => {
    expect(mapApiTypes({ ...mockPokemon, types: [] })).toEqual([])
  })

  it('returns a single-element array for a mono-type pokemon', () => {
    const mono = { ...mockPokemon, types: [{ slot: 1, type: { name: 'fire', url: '' } }] }
    expect(mapApiTypes(mono)).toEqual(['fire'])
  })
})

describe('mapApiStats', () => {
  it('maps each stat to { name, value }', () => {
    expect(mapApiStats(mockPokemon)).toEqual([
      { name: 'hp', value: 45 },
      { name: 'attack', value: 49 },
      { name: 'defense', value: 49 },
    ])
  })

  it('returns an empty array when the pokemon has no stats', () => {
    expect(mapApiStats({ ...mockPokemon, stats: [] })).toEqual([])
  })
})

describe('mapPokemonToDetails', () => {
  it('maps API response to a valid PokemonDetails object', () => {
    expect(mapPokemonToDetails(mockPokemon)).toEqual({
      id: 1,
      name: 'bulbasaur',
      displayName: 'Bulbasaur',
      thumbnail: 'https://example.com/front.png',
      types: ['grass', 'poison'],
    })
  })

  it('applies capFirst to a multi-word name', () => {
    const result = mapPokemonToDetails({ ...mockPokemon, name: 'mr mime' })
    expect(result.displayName).toBe('Mr Mime')
  })

  it('uses the front_default sprite as the thumbnail', () => {
    const customSprites = { ...mockPokemon.sprites, front_default: 'https://example.com/other.png' }
    const result = mapPokemonToDetails({ ...mockPokemon, sprites: customSprites })
    expect(result.thumbnail).toBe('https://example.com/other.png')
  })
})

describe('mapResponseToProfile', () => {
  it('maps API response to a valid PokemonProfile shape', () => {
    const result = mapResponseToProfile(mockPokemon)
    expect(result).toEqual({
      id: 1,
      name: 'bulbasaur',
      displayName: 'Bulbasaur',
      types: ['grass', 'poison'],
      abilities: [{ ability: { name: 'overgrow' } }, { ability: { name: 'chlorophyll' } }],
      base_experience: 64,
      sprites: mockPokemon.sprites,
      stats: [
        { name: 'hp', value: 45 },
        { name: 'attack', value: 49 },
        { name: 'defense', value: 49 },
      ],
    })
  })

  it('preserves the sprites object as-is', () => {
    const result = mapResponseToProfile(mockPokemon)
    expect(result.sprites).toBe(mockPokemon.sprites)
  })

  it('preserves the abilities array as-is', () => {
    const result = mapResponseToProfile(mockPokemon)
    expect(result.abilities).toBe(mockPokemon.abilities)
  })

  it('applies capFirst to the displayName', () => {
    const result = mapResponseToProfile({ ...mockPokemon, name: 'great tusk' })
    expect(result.displayName).toBe('Great Tusk')
  })
})

