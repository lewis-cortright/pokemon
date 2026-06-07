<script setup lang="ts">
withDefaults(
    defineProps<{
      modelValue: string;
      id?: string;
      placeholder?: string;
      disabled?: boolean;
      clearable?: boolean;
    }>(),
    {
      id: 'app-search',
      label: 'Search',
      placeholder: 'Search...',
      disabled: false,
      clearable: true
    }
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

function updateValue(event: Event): void {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.value);
}

function clearSearch(): void {
  emit('update:modelValue', '');
}
</script>

<template>
  <div class="app-search">
    <div class="app-search__control">
      <input
          :id="id"
          class="app-search__input"
          type="search"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          autocomplete="off"
          @input="updateValue"
      >

      <button
          v-if="clearable && modelValue"
          class="app-search__clear"
          type="button"
          aria-label="Clear search"
          :disabled="disabled"
          @click="clearSearch"
      >
      </button>
    </div>
  </div>
</template>

<style scoped>
.app-search {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.app-search__control {
  position: relative;
}

.app-search__input {
  width: 50%;
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 0.85rem 2.5rem 0.85rem 1rem;
  margin: 1rem 0 1rem 22%;
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow);
  font: inherit;
}

.app-search__input::placeholder {
  color: var(--color-muted);
}

.app-search__input:focus {
  border-color: var(--color-primary);
  outline: 3px solid var(--color-primary-light);
  outline-offset: 2px;
}


.app-search__clear {
  position: absolute;
  top: 50%;
  right: 0.75rem;
  width: 1.75rem;
  height: 1.75rem;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: var(--color-muted);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  transform: translateY(-50%);
}

.app-search__clear:hover,
.app-search__clear:focus-visible {
  color: var(--color-primary);
  outline: none;
}

.app-search__clear:disabled {
  cursor: not-allowed;
}

@media (max-width: 768px) {
    .app-search__input {
      width: 100%;
      margin: 0 0 1rem 0;
    }
  }
</style>