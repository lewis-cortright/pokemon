<!-- AppPokemonStats.vue -->
<script setup lang="ts">
const props = defineProps<{
  stats: PokemonProfileStat[];
}>();
// pokemon stats are up to 255
const STAT_BAR_DENOMINATOR = 255;

</script>

<template>
  <section class="pokemon-stats" aria-label="Pokémon stats">
    <div
        v-for="stat in props.stats"
        :key="stat.name"
        class="stat-row"
    >
      <div class="stat-header">
        <span class="stat-label">{{ stat.name }}</span>
        <span class="stat-value">{{ stat.value }}</span>
      </div>

      <div class="stat-bar" aria-hidden="true">
        <div
            class="stat-bar-fill"
            :style="{ width: `${Math.floor((stat.value / STAT_BAR_DENOMINATOR) * 100)}%` }"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.pokemon-stats {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.stat-row {
  display: grid;
  gap: 0.35rem;
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.stat-label {
  color: var(--color-muted);
  font-size: 0.85rem;
  font-weight: 700;
}

.stat-value {
  color: var(--color-text);
  font-size: 0.85rem;
  font-weight: 800;
}

.stat-bar {
  height: 0.55rem;
  overflow: hidden;
  background: var(--color-border);
  border-radius: 4px;
}

.stat-bar-fill {
  height: 100%;
  background: var(--color-primary);
  border-radius: inherit;
}
</style>