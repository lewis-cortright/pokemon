import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSearch from '../../app/components/ui/AppSearch.vue'

describe('AppSearch', () => {
  it('renders an input element', () => {
    const wrapper = mount(AppSearch, { props: { modelValue: '' } })
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('uses the default placeholder when none is provided', () => {
    const wrapper = mount(AppSearch, { props: { modelValue: '' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Search...')
  })

  it('applies a custom placeholder', () => {
    const wrapper = mount(AppSearch, {
      props: { modelValue: '', placeholder: 'Find a Pokémon…' },
    })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Find a Pokémon…')
  })

  it('uses a custom id on the input', () => {
    const wrapper = mount(AppSearch, {
      props: { modelValue: '', id: 'my-search' },
    })
    expect(wrapper.find('input').attributes('id')).toBe('my-search')
  })

  it('emits update:modelValue with the typed value on input', async () => {
    const wrapper = mount(AppSearch, { props: { modelValue: '' } })
    const input = wrapper.find('input')
    await input.setValue('Bulbasaur')
    const emitted = wrapper.emitted('update:modelValue') as string[][]
    expect(emitted).toBeTruthy()
    expect(emitted[0][0]).toBe('Bulbasaur')
  })

  it('hides the clear button when modelValue is empty', () => {
    const wrapper = mount(AppSearch, { props: { modelValue: '' } })
    expect(wrapper.find('button.app-search__clear').exists()).toBe(false)
  })

  it('shows the clear button when modelValue has content and clearable is true', () => {
    const wrapper = mount(AppSearch, { props: { modelValue: 'Pikachu', clearable: true } })
    expect(wrapper.find('button.app-search__clear').exists()).toBe(true)
  })

  it('hides the clear button when clearable is false even if modelValue is set', () => {
    const wrapper = mount(AppSearch, { props: { modelValue: 'Pikachu', clearable: false } })
    expect(wrapper.find('button.app-search__clear').exists()).toBe(false)
  })

  it('emits an empty string when the clear button is clicked', async () => {
    const wrapper = mount(AppSearch, { props: { modelValue: 'Pikachu', clearable: true } })
    await wrapper.find('button.app-search__clear').trigger('click')
    const emitted = wrapper.emitted('update:modelValue') as string[][]
    expect(emitted[0][0]).toBe('')
  })

  it('disables the input when disabled prop is true', () => {
    const wrapper = mount(AppSearch, { props: { modelValue: '', disabled: true } })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('disables the clear button when disabled prop is true', () => {
    const wrapper = mount(AppSearch, {
      props: { modelValue: 'Charmander', clearable: true, disabled: true },
    })
    const btn = wrapper.find('button.app-search__clear')
    expect(btn.attributes('disabled')).toBeDefined()
  })
})

