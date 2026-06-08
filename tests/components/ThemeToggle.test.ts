import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import ThemeToggle from '../../app/components/ui/ThemeToggle.vue'

// ── helpers ────────────────────────────────────────────────────────────────────

function makeThemeMock(overrides: {
  theme?: string
  isThemeReady?: boolean
} = {}) {
  const toggleTheme = vi.fn()
  const initializeTheme = vi.fn()
  return {
    theme: ref(overrides.theme ?? 'light'),
    isThemeReady: ref(overrides.isThemeReady ?? true),
    toggleTheme,
    initializeTheme,
  }
}

// Provide AppIcon as a minimal stub to avoid SVG-asset resolution issues.
// Use <i> so that wrapper.find('span') selects only the text span.
const AppIconStub = { template: '<i data-testid="app-icon" />' }

function mountToggle(themeOverrides: Parameters<typeof makeThemeMock>[0] = {}) {
  const mock = makeThemeMock(themeOverrides)
  // Inject useTheme as a global so the component's auto-import resolves correctly
  ;(globalThis as Record<string, unknown>).useTheme = vi.fn(() => mock)
  const wrapper = mount(ThemeToggle, {
    global: { stubs: { AppIcon: AppIconStub } },
  })
  return { wrapper, mock }
}

// ── tests ──────────────────────────────────────────────────────────────────────

describe('ThemeToggle', () => {
  beforeEach(() => {
    delete (globalThis as Record<string, unknown>).useTheme
  })

  // ── buttonText computed ──────────────────────────────────────────────────────

  describe('buttonText', () => {
    it('shows "Dark" in light mode (ready)', () => {
      const { wrapper } = mountToggle({ theme: 'light', isThemeReady: true })
      expect(wrapper.find('span').text()).toBe('Dark')
    })

    it('shows "Light" in dark mode (ready)', () => {
      const { wrapper } = mountToggle({ theme: 'dark', isThemeReady: true })
      expect(wrapper.find('span').text()).toBe('Light')
    })

    it('shows "Theme" when not ready', () => {
      const { wrapper } = mountToggle({ isThemeReady: false })
      expect(wrapper.find('span').text()).toBe('Theme')
    })
  })

  // ── buttonLabel (aria-label) computed ────────────────────────────────────────

  describe('buttonLabel', () => {
    it('is "Switch to dark mode" in light mode (ready)', () => {
      const { wrapper } = mountToggle({ theme: 'light', isThemeReady: true })
      expect(wrapper.find('button').attributes('aria-label')).toBe('Switch to dark mode')
    })

    it('is "Switch to light mode" in dark mode (ready)', () => {
      const { wrapper } = mountToggle({ theme: 'dark', isThemeReady: true })
      expect(wrapper.find('button').attributes('aria-label')).toBe('Switch to light mode')
    })

    it('is "Toggle color theme" when not ready', () => {
      const { wrapper } = mountToggle({ isThemeReady: false })
      expect(wrapper.find('button').attributes('aria-label')).toBe('Toggle color theme')
    })
  })

  describe('iconName', () => {
    it('passes "moon" icon in light mode (ready)', () => {
      const { wrapper } = mountToggle({ theme: 'light', isThemeReady: true })
      expect(wrapper.find('[data-testid="app-icon"]').attributes('name')).toBe('moon')
    })

    it('passes "sun" icon in dark mode (ready)', () => {
      const { wrapper } = mountToggle({ theme: 'dark', isThemeReady: true })
      expect(wrapper.find('[data-testid="app-icon"]').attributes('name')).toBe('sun')
    })

    it('passes "moon" icon when not ready', () => {
      const { wrapper } = mountToggle({ isThemeReady: false })
      expect(wrapper.find('[data-testid="app-icon"]').attributes('name')).toBe('moon')
    })
  })

  // ── interactions ─────────────────────────────────────────────────────────────

  it('calls toggleTheme when the button is clicked', async () => {
    const { wrapper, mock } = mountToggle()
    await wrapper.find('button').trigger('click')
    expect(mock.toggleTheme).toHaveBeenCalledOnce()
  })

  it('calls initializeTheme on mount', () => {
    const { mock } = mountToggle()
    expect(mock.initializeTheme).toHaveBeenCalledOnce()
  })
})

