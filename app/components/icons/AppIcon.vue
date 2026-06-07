<script setup lang="ts">
import type { StyleValue } from 'vue';

import moonIcon from '@/assets/icons/moon_icon.svg';
import sunIcon from '@/assets/icons/sun_icon.svg';
import backArrowIcon from '@/assets/icons/back_arrow_icon.svg';

const icons = {
  moon: moonIcon,
  sun: sunIcon,
  back_arrow: backArrowIcon,
} as const;

type IconName = keyof typeof icons;

const props = defineProps<{
  name: IconName;
  alt?: string;
}>();

const iconSrc = computed(() => icons[props.name]);

const iconStyle = computed<StyleValue>(() => ({
  '--icon-url': `url("${iconSrc.value}")`,
}));
</script>

<template>
  <span
      class="icon"
      role="img"
      :aria-label="alt ?? name"
      :style="iconStyle"
  />
</template>

<style scoped>
.icon {
  display: inline-block;
  width: 24px;
  height: 24px;
  color: inherit;
  background-color: currentColor;

  mask-image: var(--icon-url);
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;

  -webkit-mask-image: var(--icon-url);
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
}
</style>