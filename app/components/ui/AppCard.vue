<script setup lang="ts">
import { NuxtLink } from '#components';

const props = defineProps<{
  title: string;
  imageSrc?: string;
  imageAlt?: string;
  description?: string;
  to?: string;
  linkLabel?: string;
}>();

const linkProps = computed(() => {
  if (!props.to) {
    return {};
  }

  return {
    to: props.to,
    'aria-label': props.linkLabel || `View ${props.title}`
  };
});
</script>
<template>
  <component
      :is="to ? NuxtLink : 'article'"
      class="app-card"
      v-bind="linkProps"
  >

    <div class="app-card__body">
      <img
          v-if="imageSrc"
          :src="imageSrc"
          :alt="imageAlt || title"
      />
      <h2 class="app-card__title">
        {{ title }}
      </h2>

      <p
          v-if="description"
          class="app-card__description"
      >
        {{ description }}
      </p>

      <slot />
    </div>
  </component>
</template>


<style scoped>
.app-card {
  min-height: 165px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  background: var(--color-surface);
  color: var(--color-text);
  text-align: center;
  text-decoration: none;
  box-shadow: var(--shadow);
  transition:
      transform 160ms ease,
      border-color 160ms ease,
      box-shadow 160ms ease,
      background-color 160ms ease;
}

a.app-card {
  cursor: pointer;
}

a.app-card:hover,
a.app-card:focus-visible {
  border-color: var(--color-primary);
  transform: translateY(-3px);
  box-shadow: var(--shadow-card-hover);
}

a.app-card:focus-visible {
  outline: 3px solid var(--color-primary-light);
  outline-offset: 3px;
}

.app-card__image {
  width: 96px;
  height: 96px;
  object-fit: contain;
}

.app-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.app-card__title {
  margin: 0;
  font-size: 1rem;
}

.app-card__description {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.9rem;
}
</style>