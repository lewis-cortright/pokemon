type Theme = 'light' | 'dark';

const theme = ref<Theme>('light');
const isThemeReady = ref(false);

function applyTheme(value: Theme): void {
  theme.value = value;

  if (!import.meta.client) {
    return;
  }

  document.documentElement.classList.toggle('dark', value === 'dark');
  localStorage.setItem('theme', value);
}

export function useTheme() {
  function initializeTheme(): void {
    if (!import.meta.client) {
      return;
    }

    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    applyTheme(savedTheme ?? (prefersDark ? 'dark' : 'light'));
    isThemeReady.value = true;
  }

  function toggleTheme(): void {
    if (!isThemeReady.value) {
      initializeTheme();
    }

    applyTheme(theme.value === 'dark' ? 'light' : 'dark');
  }

  return {
    theme,
    isThemeReady,
    initializeTheme,
    toggleTheme,
  };
}