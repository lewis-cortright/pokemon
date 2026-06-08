import { describe, it, expect, beforeEach, vi } from 'vitest'

/**
 * useTheme uses module-level refs (theme, isThemeReady).
 * Reset the module between tests so each test starts from a clean state.
 */
async function freshUseTheme() {
  vi.resetModules()
  const mod = await import('../../app/composables/useTheme')
  return mod.useTheme
}

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
    // Default matchMedia: does NOT prefer dark
    ;(window.matchMedia as ReturnType<typeof vi.fn>).mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })
  })

  // ── initializeTheme ──────────────────────────────────────────────────────────

  describe('initializeTheme', () => {
    it('applies a saved "light" theme from localStorage', async () => {
      localStorage.setItem('theme', 'light')
      const useTheme = await freshUseTheme()
      const { theme, isThemeReady, initializeTheme } = useTheme()
      initializeTheme()
      expect(theme.value).toBe('light')
      expect(isThemeReady.value).toBe(true)
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })

    it('applies a saved "dark" theme from localStorage', async () => {
      localStorage.setItem('theme', 'dark')
      const useTheme = await freshUseTheme()
      const { theme, isThemeReady, initializeTheme } = useTheme()
      initializeTheme()
      expect(theme.value).toBe('dark')
      expect(isThemeReady.value).toBe(true)
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('falls back to dark when no saved theme and OS prefers dark', async () => {
      ;(window.matchMedia as ReturnType<typeof vi.fn>).mockReturnValue({
        matches: true,
        media: '',
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })
      const useTheme = await freshUseTheme()
      const { theme, initializeTheme } = useTheme()
      initializeTheme()
      expect(theme.value).toBe('dark')
    })

    it('falls back to light when no saved theme and OS does not prefer dark', async () => {
      const useTheme = await freshUseTheme()
      const { theme, initializeTheme } = useTheme()
      initializeTheme()
      expect(theme.value).toBe('light')
    })
  })

  // ── applyTheme (via initializeTheme / toggleTheme) ───────────────────────────

  describe('applyTheme', () => {
    it('persists the theme value to localStorage', async () => {
      const useTheme = await freshUseTheme()
      const { initializeTheme } = useTheme()
      initializeTheme() // applies 'light'
      expect(localStorage.getItem('theme')).toBe('light')
    })

    it('adds the dark class to the html element when theme is dark', async () => {
      localStorage.setItem('theme', 'dark')
      const useTheme = await freshUseTheme()
      const { initializeTheme } = useTheme()
      initializeTheme()
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('removes the dark class from the html element when theme is light', async () => {
      document.documentElement.classList.add('dark')
      const useTheme = await freshUseTheme()
      const { initializeTheme } = useTheme()
      initializeTheme() // no saved theme, no dark preference → 'light'
      expect(document.documentElement.classList.contains('dark')).toBe(false)
    })
  })

  // ── toggleTheme ──────────────────────────────────────────────────────────────

  describe('toggleTheme', () => {
    it('initializes the theme if not ready before toggling', async () => {
      const useTheme = await freshUseTheme()
      const { theme, isThemeReady, toggleTheme } = useTheme()
      expect(isThemeReady.value).toBe(false)
      toggleTheme()
      expect(isThemeReady.value).toBe(true)
      // Default (no saved, no dark pref) → light, then toggles to dark
      expect(theme.value).toBe('dark')
    })

    it('switches from light to dark', async () => {
      const useTheme = await freshUseTheme()
      const { theme, initializeTheme, toggleTheme } = useTheme()
      initializeTheme() // → light
      toggleTheme()
      expect(theme.value).toBe('dark')
    })

    it('switches from dark to light', async () => {
      localStorage.setItem('theme', 'dark')
      const useTheme = await freshUseTheme()
      const { theme, initializeTheme, toggleTheme } = useTheme()
      initializeTheme() // → dark
      toggleTheme()
      expect(theme.value).toBe('light')
    })
  })
})

