import type { H3Event } from 'h3';
import {
  PokemonPageData,
  PokemonApiResponse
} from '#shared/types/pokemon';

export async function getPokemonList(
  event: H3Event,
  limit = 60,
  offset = 0
): Promise<PokemonPageData> {
  const config = useRuntimeConfig(event);
  return await $fetch<PokemonPageData>(`${config.pokeApiBaseURL}/pokemon`, {
    query: {
      limit,
      offset
    }
  });
}

export async function getPokemonByUrl(
  url: string
): Promise<PokemonApiResponse> {
  return await $fetch<PokemonApiResponse>(url);
}

export async function getPokemonById(
  event: H3Event,
  id: string
): Promise<PokemonApiResponse> {
  const config = useRuntimeConfig(event);
  return await $fetch<PokemonApiResponse>(
    `${config.pokeApiBaseURL}/pokemon/${id}`
  );
}