# Poké Dispatch

Poké Dispatch is a Nuxt application for browsing Pokémon, searching the Pokédex, viewing type badges, and opening a profile page with animated sprites and base stats.

The project was built as a front-end focused technical challenge using Nuxt, Vue, TypeScript, and the public PokeAPI.

## Live Demo

https://pokedispatch.com/

## Features

- Pokémon list view
- Search by Pokémon name
- Type badges with type-specific styling
- Pokémon profile/detail page
- Animated Pokémon sprites
- Base stat display with visual bars
- Dark/light theme toggle
- Responsive layout for desktop and mobile
- Nuxt server API routes used as a thin backend-for-frontend layer over PokeAPI

## Tech Stack

- Nuxt
- Vue 3
- TypeScript
- CSS variables
- PokeAPI

## Project Structure

```txt
components/
  icons/
    AppIcon.vue
  ui/
    AppCard.vue
    AppPokemonStat.vue
    AppSearch.vue
    AppTypeBadge.vue
    ThemeToggle.vue

pages/
  index.vue
  pokemon/[id].vue

server/
  api/
    pokemon/
      index.get.ts
      [id].get.ts

shared/
  types/
    pokemon.ts
