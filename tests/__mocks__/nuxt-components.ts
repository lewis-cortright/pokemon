import { defineComponent } from 'vue'

/**
 * Minimal stub for Nuxt's <NuxtLink> used in tests.
 * Renders a plain <a> so we can inspect href/slot content.
 */
export const NuxtLink = defineComponent({
  name: 'NuxtLink',
  props: {
    to: { type: String, default: '' },
    'aria-label': { type: String, default: '' },
  },
  template: '<a :href="to"><slot /></a>',
})

