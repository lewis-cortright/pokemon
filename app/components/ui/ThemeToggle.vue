<script setup lang="ts">
import AppIcon from "~/components/icons/AppIcon.vue";

const {
  theme,
  isThemeReady,
  initializeTheme,
  toggleTheme,
} = useTheme();

onMounted(() => {
  initializeTheme();
});

const buttonLabel = computed(() => {
  if (!isThemeReady.value) {
    return 'Toggle color theme';
  }

  return theme.value === 'dark'
      ? 'Switch to light mode'
      : 'Switch to dark mode';
});

const iconName = computed(() => {
  if (!isThemeReady.value) {
    return 'moon';
  }

  return theme.value === 'dark' ? 'sun' : 'moon';
});

const buttonText = computed(() => {
  if (!isThemeReady.value) {
    return 'Theme';
  }

  return theme.value === 'dark' ? 'Light' : 'Dark';
});
</script>

<template>
  <button
      type="button"
      class="theme-toggle"
      :aria-label="buttonLabel"
      @click="toggleTheme"
  >
    <AppIcon :name="iconName" />

    <span>
      {{ buttonText }}
    </span>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 0.55rem 0.9rem;
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.theme-toggle:hover,
.theme-toggle:focus-visible {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-1px);
}

.theme-toggle:focus-visible {
  outline: 3px solid var(--color-primary-light);
  outline-offset: 3px;
}
</style>