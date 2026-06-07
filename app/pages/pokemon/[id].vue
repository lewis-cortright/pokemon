<script setup lang="ts">
import type { PokemonProfile } from "#shared/types/pokemon";
import ThemeToggle from "~/components/ui/ThemeToggle.vue";
import AppIcon from "~/components/icons/AppIcon.vue";
import AppTypeBadge from "~/components/ui/AppTypeBadge.vue";
import AppPokemonStats from "~/components/ui/AppPokemonStats.vue";

const route = useRoute();

const {
  data: pokemon,
} = await useFetch<PokemonProfile>(`/api/pokemon/${route.params.id}`, {
  default: () => ({} as PokemonProfile),
});
</script>

<template>
  <NuxtLink
      class="nuxt-link"
      to="/">
    <AppIcon :name="'back_arrow'"/>
    <span class="back-text">Back to List</span>
  </NuxtLink>
  <ThemeToggle class="toggle"/>
  <main class="profile-page" v-if="pokemon">
    <div class="profile-header">
      <div class="poke-name">{{ capFirst(pokemon.name) }}</div>
      <AppTypeBadge
          class="pokemon-type"
          v-for="type of pokemon.types"
          :type="type"
          :font-size="'font-size: var(--font-size-lg)'"
      />    <div>
      <span class="abilities-label">Abilities: </span>
      {{ capFirst(pokemon.abilities.map(a => a.ability.name).join(", ")) }}
    </div>
    </div>
    <div class="profile-base">
      <img
          :src="pokemon.sprites.other.showdown.front_default"
          :alt="pokemon.name">

      <AppPokemonStats
          :stats="pokemon.stats"/>
    </div>
  </main>
</template>

<style scoped>
.nuxt-link {
  text-decoration: none;
  color: var(--color-text);
  display: flex;
  gap: 0.25rem;
}

.toggle {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.profile-page {
  width: min(90%, 960px);
  margin: 3rem auto;
  box-shadow: var(--shadow);
  padding: 2rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 18px;

  .profile-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;

    .poke-name {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bolder);
    }
    .abilities-label {
      font-size: var(--font-size-l);
      font-weight: var(--font-weight-bold);
    }
  }

  .profile-base {
    display: flex;
    align-items: center;
    gap: 2rem;

    img {
      width: 12rem;
      flex: 0 0 auto;
    }
  }

}

@media (max-width: 768px) {
  .profile-page {
    width: min(92%, 520px);
    padding: 1.25rem;
  }

  .profile-page {
    .profile-header {
      flex-wrap: wrap;
    }

    .profile-base {
      flex-direction: column;
      align-items: stretch;
    }

    .profile-base img {
      width: 10rem;
      align-self: center;
    }
  }
}
</style>