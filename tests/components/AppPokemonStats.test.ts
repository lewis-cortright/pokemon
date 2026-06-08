import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppPokemonStats from '../../app/components/ui/AppPokemonStats.vue'
import type { PokemonProfileStat } from '../../shared/types/pokemon'

const DENOMINATOR = 255

describe('AppPokemonStats', () => {
  const stats: PokemonProfileStat[] = [
    { name: 'hp', value: 45 },
    { name: 'attack', value: 49 },
    { name: 'speed', value: 255 },
  ]

  it('renders a stat row for every entry in the stats prop', () => {
    const wrapper = mount(AppPokemonStats, { props: { stats } })
    expect(wrapper.findAll('.stat-row')).toHaveLength(3)
  })

  it('displays each stat label', () => {
    const wrapper = mount(AppPokemonStats, { props: { stats } })
    const labels = wrapper.findAll('.stat-label').map(el => el.text())
    expect(labels).toEqual(['hp', 'attack', 'speed'])
  })

  it('displays each stat value', () => {
    const wrapper = mount(AppPokemonStats, { props: { stats } })
    const values = wrapper.findAll('.stat-value').map(el => el.text())
    expect(values).toEqual(['45', '49', '255'])
  })

  it('calculates the bar fill width correctly (floor of percentage)', () => {
    const wrapper = mount(AppPokemonStats, { props: { stats: [{ name: 'hp', value: 45 }] } })
    const fill = wrapper.find('.stat-bar-fill')
    const expected = `${Math.floor((45 / DENOMINATOR) * 100)}%`
    expect(fill.attributes('style')).toContain(expected)
  })

  it('renders 100% bar fill for the max stat value of 255', () => {
    const wrapper = mount(AppPokemonStats, { props: { stats: [{ name: 'atk', value: 255 }] } })
    expect(wrapper.find('.stat-bar-fill').attributes('style')).toContain('100%')
  })

  it('renders 0% bar fill for a zero stat value', () => {
    const wrapper = mount(AppPokemonStats, { props: { stats: [{ name: 'hp', value: 0 }] } })
    expect(wrapper.find('.stat-bar-fill').attributes('style')).toContain('0%')
  })

  it('renders nothing when an empty stats array is provided', () => {
    const wrapper = mount(AppPokemonStats, { props: { stats: [] } })
    expect(wrapper.findAll('.stat-row')).toHaveLength(0)
  })

  it('has the correct aria-label on the section', () => {
    const wrapper = mount(AppPokemonStats, { props: { stats } })
    expect(wrapper.find('section').attributes('aria-label')).toBe('Pokémon stats')
  })
})

