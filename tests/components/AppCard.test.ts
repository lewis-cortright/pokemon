import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppCard from '../../app/components/ui/AppCard.vue'

describe('AppCard', () => {
  describe('when rendered without a "to" prop', () => {
    it('renders as an <article> element', () => {
      const wrapper = mount(AppCard, { props: { title: 'Bulbasaur' } })
      expect(wrapper.element.tagName.toLowerCase()).toBe('article')
    })
  })

  describe('when rendered with a "to" prop', () => {
    it('renders as a NuxtLink (anchor element from our mock)', () => {
      const wrapper = mount(AppCard, { props: { title: 'Bulbasaur', to: '/pokemon/1' } })
      // NuxtLink mock renders as <a>
      expect(wrapper.element.tagName.toLowerCase()).toBe('a')
    })

    it('sets the href to the "to" value', () => {
      const wrapper = mount(AppCard, { props: { title: 'Bulbasaur', to: '/pokemon/1' } })
      expect(wrapper.attributes('href')).toBe('/pokemon/1')
    })

    it('uses a custom aria-label when linkLabel is provided', () => {
      const wrapper = mount(AppCard, {
        props: { title: 'Bulbasaur', to: '/pokemon/1', linkLabel: 'Open Bulbasaur page' },
      })
      // linkProps computed passes aria-label to the component
      // The NuxtLink mock doesn't bind aria-label to the <a>, so check the bound prop via attributes on the component
      const vm = wrapper.vm as unknown as { linkProps: { 'aria-label': string } }
      expect(vm.linkProps['aria-label']).toBe('Open Bulbasaur page')
    })

    it('defaults the aria-label to "View {title}" when no linkLabel is provided', () => {
      const wrapper = mount(AppCard, { props: { title: 'Bulbasaur', to: '/pokemon/1' } })
      const vm = wrapper.vm as unknown as { linkProps: { 'aria-label': string } }
      expect(vm.linkProps['aria-label']).toBe('View Bulbasaur')
    })
  })

  describe('image', () => {
    it('renders an img element when imageSrc is provided', () => {
      const wrapper = mount(AppCard, {
        props: { title: 'Bulbasaur', imageSrc: 'https://example.com/bulbasaur.png' },
      })
      expect(wrapper.find('img').exists()).toBe(true)
      expect(wrapper.find('img').attributes('src')).toBe('https://example.com/bulbasaur.png')
    })

    it('omits the img element when imageSrc is not provided', () => {
      const wrapper = mount(AppCard, { props: { title: 'Bulbasaur' } })
      expect(wrapper.find('img').exists()).toBe(false)
    })

    it('uses imageAlt as the alt attribute when provided', () => {
      const wrapper = mount(AppCard, {
        props: { title: 'Bulbasaur', imageSrc: 'img.png', imageAlt: 'Grass starter' },
      })
      expect(wrapper.find('img').attributes('alt')).toBe('Grass starter')
    })

    it('falls back to title as the alt attribute when imageAlt is omitted', () => {
      const wrapper = mount(AppCard, {
        props: { title: 'Bulbasaur', imageSrc: 'img.png' },
      })
      expect(wrapper.find('img').attributes('alt')).toBe('Bulbasaur')
    })
  })

  describe('title and description', () => {
    it('renders the title in an h2', () => {
      const wrapper = mount(AppCard, { props: { title: 'Bulbasaur' } })
      expect(wrapper.find('h2').text()).toBe('Bulbasaur')
    })

    it('renders the description paragraph when provided', () => {
      const wrapper = mount(AppCard, {
        props: { title: 'Bulbasaur', description: 'Seed Pokémon' },
      })
      expect(wrapper.find('p.app-card__description').text()).toBe('Seed Pokémon')
    })

    it('omits the description paragraph when not provided', () => {
      const wrapper = mount(AppCard, { props: { title: 'Bulbasaur' } })
      expect(wrapper.find('p.app-card__description').exists()).toBe(false)
    })
  })

  describe('slot', () => {
    it('renders default slot content', () => {
      const wrapper = mount(AppCard, {
        props: { title: 'Bulbasaur' },
        slots: { default: '<span class="slot-content">Types here</span>' },
      })
      expect(wrapper.find('.slot-content').exists()).toBe(true)
      expect(wrapper.find('.slot-content').text()).toBe('Types here')
    })
  })
})

