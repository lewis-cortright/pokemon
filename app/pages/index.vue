<script setup lang="ts">
import AppCard from "~/components/ui/AppCard.vue";
import AppSearch from "~/components/ui/AppSearch.vue";
import ThemeToggle from "~/components/ui/ThemeToggle.vue";
import AppTypeBadge from "~/components/ui/AppTypeBadge.vue";

// reactive primitive
const searchText = ref('');

const {
  data: pokemon
} = await useFetch<PokemonDetails[]>('/api/pokemon', {
  default: () => []
});

const filteredPokemon = computed(() => {
  const search = searchText.value.trim().toLowerCase();
  if (!search) {
    return pokemon.value;
  }
  return pokemon.value.filter((item) =>
      item.displayName.toLowerCase().includes(search) ||
      item.name.toLowerCase().includes(search)
  );
});
</script>
<template>
  <main class="landing-page">
    <header class="landing-header">
      <div>
        <h1>Poké Dispatch</h1>
        <p class="landing-blurb">Find Your Pokemon Dispatcher</p>
      </div>
      <ThemeToggle/>
    </header>
    <AppSearch
        v-model="searchText"
        placeholder="Search Pokémon..."
    />
    <section class="landing-grid">
      <AppCard
          v-for="pokemon in filteredPokemon"
          :key="pokemon.name"
          :title="pokemon.displayName"
          :to="`/pokemon/${pokemon.id}`"
          :image-src="pokemon.thumbnail"
      >
        <span :class="pokemon.types.length > 1 ? 'multi-types' : 'single-type'">
        <AppTypeBadge
            v-for="type of pokemon.types"
            :type="type"
        />
        </span>
      </AppCard>
    </section>
  </main>

</template>
<style scoped>
.landing-page {
  width: 80%;
  margin: 0 auto;
  padding: 3rem 0;

  .landing-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 2rem;

    h1 {
      margin: 0;
      font-size: clamp(2rem, 6vw, 4rem);
      line-height: 1;
    }
  }

  .landing-blurb {
    margin: 0 0 0.5rem;
    color: var(--color-primary);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .landing-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: .5rem;
  }

  .single-type {
    display: block;
  }

  .multi-types {
    display: flex;
    gap: 0.1rem;
  }
}


@media (max-width: 768px) {
 .landing-page .landing-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>