import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTypeBadge from '../../app/components/ui/AppTypeBadge.vue'

describe('AppTypeBadge', () => {
  it('renders the type name as visible text', () => {
    const wrapper = mount(AppTypeBadge, { props: { type: 'fire' } })
    expect(wrapper.text()).toBe('fire')
  })

  it('applies the correct bg-{type} CSS class', () => {
    const wrapper = mount(AppTypeBadge, { props: { type: 'water' } })
    expect(wrapper.classes()).toContain('bg-water')
  })

  it('always applies the base badge class', () => {
    const wrapper = mount(AppTypeBadge, { props: { type: 'grass' } })
    expect(wrapper.classes()).toContain('badge')
  })

  it('sets a custom fontSize style when the fontSize prop is provided', () => {
    const wrapper = mount(AppTypeBadge, { props: { type: 'poison', fontSize: '1.2rem' } })
    expect(wrapper.element.style.fontSize).toBe('1.2rem')
  })

  it('leaves the fontSize style empty when the prop is omitted', () => {
    const wrapper = mount(AppTypeBadge, { props: { type: 'electric' } })
    expect(wrapper.element.style.fontSize).toBe('')
  })

  it('updates the class reactively when the type prop changes', async () => {
    const wrapper = mount(AppTypeBadge, { props: { type: 'fire' } })
    await wrapper.setProps({ type: 'ice' })
    expect(wrapper.classes()).toContain('bg-ice')
    expect(wrapper.classes()).not.toContain('bg-fire')
  })
})

