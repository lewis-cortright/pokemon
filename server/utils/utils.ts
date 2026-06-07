import {
  PokemonDetails,
  PokemonApiResponse, type PokemonProfile, type PokemonProfileStat,
} from "#shared/types/pokemon";
import { capFirst } from "#shared/utils/formatters";

export function mapApiTypes(pokemon: PokemonApiResponse): string[] {
  return pokemon.types.map((typeInfo) => typeInfo.type.name);
}

export function mapApiStats(pokemon: PokemonApiResponse): PokemonProfileStat[] {
  return pokemon.stats.map(s => ({
    name: s.stat.name,
    value: s.base_stat,
  }));
}

export function mapPokemonToDetails(response: PokemonApiResponse): PokemonDetails {
  return {
    id: response.id,
    name: response.name,
    displayName: capFirst(response.name),
    thumbnail: response.sprites.front_default,
    types: mapApiTypes(response)
  };
}

export function mapResponseToProfile(response: PokemonApiResponse): Partial<PokemonProfile> {
  return {
    name: response.name,
    id: response.id,
    displayName: capFirst(response.name),
    sprites: response.sprites,
    types: mapApiTypes(response),
    abilities: response.abilities,
    base_experience: response.base_experience,
    stats: mapApiStats(response),
  }
}