export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {enabled: true},

  css: ['~/assets/css/main.scss'],
  runtimeConfig: {
    pokeApiBaseURL: process.env.POKE_API_BASE_URL || 'https://pokeapi.co/api/v2'
  }
})
