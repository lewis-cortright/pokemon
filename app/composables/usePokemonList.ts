export function usePokemonList() {
  const pokemon = useState<PokemonDetails[]>('pokemon-list', () => []);
  const offset = useState<number>('pokemon-offset', () => 0);
  const limit = 60;

  const pending = useState<boolean>('pokemon-list-pending', () => false);
  const hasMore = useState<boolean>('pokemon-has-more', () => true);
  const error = useState<unknown>('pokemon-list-error', () => null);

  async function fetchPokemon() {
    if (pending.value || !hasMore.value) {
      return;
    }

    pending.value = true;
    error.value = null;

    try {
      const nextPokemon = await $fetch<PokemonDetails[]>('/api/pokemon', {
        query: {
          limit,
          offset: offset.value,
        },
      });

      pokemon.value = [
        ...pokemon.value,
        ...nextPokemon,
      ];

      offset.value += limit;
      hasMore.value = nextPokemon.length === limit;
    } catch (err) {
      error.value = err;
    } finally {
      pending.value = false;
    }
  }

  return {
    pokemon,
    pending,
    error,
    hasMore,
    fetchPokemon,
  };
}