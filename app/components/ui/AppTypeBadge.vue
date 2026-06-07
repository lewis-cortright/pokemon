<script setup lang="ts">

const props = defineProps<{
  type: string;
  fontSize?: string;
}>();
const typeClass = computed(() => `bg-${props.type}`);
</script>

<template>
  <span
      class="badge"
      :class="typeClass"
      :style="{ fontSize: props.fontSize }"
  >
    {{ type }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: white;
  border-radius: 3px;
}

.bg-normal {
  background: #1081e3;
}

.bg-fire {
  background: #ee8130;
}

.bg-water {
  background: #0237ad;
}

.bg-electric {
  background: #f7d02c;
  color: #222;
}

.bg-grass {
  background: #4d8e2b;
}

.bg-poison {
  background: #a33ea1;
}

.bg-flying {
  background: #0193d0;
}

.bg-ground {
  background: #744102;
}

.bg-fairy {
  background: #da58f8;
}

.bg-bug {
  background: #506940;
}

.bg-fighting {
  background: #ff0011;
}
</style>