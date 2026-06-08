import { describe, it, expect } from 'vitest'
import { capFirst } from '../../shared/utils/formatters'

describe('capFirst', () => {
  it('capitalizes the first letter of a single word', () => {
    expect(capFirst('bulbasaur')).toBe('Bulbasaur')
  })

  it('capitalizes the first letter of each word in a multi-word string', () => {
    expect(capFirst('mr mime')).toBe('Mr Mime')
  })

  it('leaves already-capitalized strings unchanged', () => {
    expect(capFirst('Pikachu')).toBe('Pikachu')
  })

  it('handles an empty string', () => {
    expect(capFirst('')).toBe('')
  })

  it('handles a single character', () => {
    expect(capFirst('a')).toBe('A')
  })

  it('capitalizes the first letter of each hyphenated segment', () => {
    // \b matches on both sides of a hyphen, so each segment is capitalized
    expect(capFirst('ho-oh')).toBe('Ho-Oh')
  })

  it('handles a fully upper-case string', () => {
    expect(capFirst('PIKACHU')).toBe('PIKACHU')
  })

  it('handles numbers mixed with words', () => {
    expect(capFirst('pokemon 25')).toBe('Pokemon 25')
  })
})

